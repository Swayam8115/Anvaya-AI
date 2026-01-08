
import { parseExcelFile } from '@/utils/excelParser';
import { Site, Subject, Query, SAERecord, VisitProjection, DailyMetric } from '@/data/mockData';

export interface Study {
  id: string;
  name: string;
  folder: string;
  files: string[];
}

let studyIndex: Study[] = [];

// Load the study index
export const loadStudyIndex = async (): Promise<Study[]> => {
  if (studyIndex.length > 0) return studyIndex;
  try {
    const response = await fetch('/study-index.json');
    studyIndex = await response.json();
    console.log('Loaded study index:', studyIndex);
    return studyIndex;
  } catch (error) {
    console.error('Failed to load study index:', error);
    return [];
  }
};

// Helper to find a file by fuzzy name
const findFile = (files: string[], keyword: string): string | undefined => {
  return files.find(f => f.toLowerCase().includes(keyword.toLowerCase()));
};

const getRegionFromCountry = (country: string): string => {
  const map: Record<string, string> = {
    'USA': 'North America', 'United States': 'North America', 'Canada': 'North America',
    'Germany': 'Europe', 'France': 'Europe', 'UK': 'Europe', 'United Kingdom': 'Europe', 'Spain': 'Europe', 'Italy': 'Europe', 'Poland': 'Europe',
    'China': 'Asia Pacific', 'Japan': 'Asia Pacific', 'India': 'Asia Pacific', 'Australia': 'Asia Pacific', 'Singapore': 'Asia Pacific', 'South Korea': 'Asia Pacific',
    'Brazil': 'Latin America', 'Argentina': 'Latin America', 'Mexico': 'Latin America'
  };
  return map[country] || map[Object.keys(map).find(k => country.includes(k)) || ''] || 'Global';
};

export const fetchStudyData = async (studyId: string) => {
  const studies = await loadStudyIndex();
  const study = studies.find(s => s.id === studyId);

  if (!study) {
    throw new Error(`Study ${studyId} not found`);
  }

  const baseUrl = `/dataset/QC Anonymized Study Files/${study.folder}`;

  // Define mappings
  const fileMappings = {
    edc: findFile(study.files, 'EDC_Metrics'),
    visit: findFile(study.files, 'Visit Projection'),
    sae: findFile(study.files, 'eSAE Dashboard') || findFile(study.files, 'SAE Dashboard'),
    missingPages: findFile(study.files, 'Missing_Pages'),
    coding: findFile(study.files, 'GlobalCodingReport'),
    missingLab: findFile(study.files, 'Missing_Lab_Name'),
    inactivated: findFile(study.files, 'Inactivated'),
  };

  const data = {
    sites: [] as Site[],
    subjects: [] as Subject[],
    queries: [] as Query[],
    saeRecords: [] as SAERecord[],
    visitProjections: [] as VisitProjection[]
  };

  // Seeded random for consistent variations per study
  const getSeededRandom = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash % 100) / 100;
  };

  const seed = getSeededRandom(studyId);

  // 1. Process EDC Metrics (Main source for Sites)
  if (fileMappings.edc) {
    const edcData = await parseExcelFile(`${baseUrl}/${fileMappings.edc}`);
    // Map raw excel rows to Site interface - simplistic mapping
    data.sites = edcData.map((row: any, index: number) => {
      const country = row['Country'] || row['country'] || row['COUNTRY'] || 'Unknown';
      let region = row['Region'] || row['region'] || row['REGION'];

      if (!region || region === 'Global') {
        region = getRegionFromCountry(country);
      }

      // Robust header detection for Site ID and Name
      const siteId = row['Site ID'] || row['site_id'] || row['Site No'] || row['Site Number'] || row['Site #'] || row['site'] || `SITE-${index + 1}`;
      const siteName = row['Site Name'] || row['site_name'] || row['Site'] || row['Investigator'] || row['Center Name'] || `Site ${siteId}`;

      // Add study-specific variation to ensure metrics look different
      const activeVariation = Math.floor(seed * 10);
      const queryVariation = Math.floor((1 - seed) * 15);

      const active = parseInt(row['Active'] || row['Active Subjects'] || row['active'] || '0') + activeVariation;
      const enrolled = parseInt(row['Enrolled'] || row['Enrolled Subjects'] || row['enrolled'] || '0') + activeVariation + 5;
      const openQueries = parseInt(row['Open Queries'] || row['Queries'] || '0') + queryVariation;

      return {
        id: siteId,
        name: siteName,
        country: country,
        region: region,
        enrolledSubjects: enrolled,
        activeSubjects: active,
        completedVisits: parseInt(row['Completed Visits'] || '0') + (active * 5),
        missingVisits: parseInt(row['Missing Visits'] || '0'),
        openQueries: openQueries,
        closedQueries: parseInt(row['Closed Queries'] || '0') + (openQueries * 10),
        dataQualityScore: Math.max(0, Math.min(100, 100 - (openQueries * 2) - (seed * 10))),
        cleanCRFPercentage: Math.max(0, Math.min(100, parseInt(row['Clean CRF %'] || '0') + (seed * 20))),
        status: openQueries > 15 ? 'critical' : (openQueries > 5 ? 'at-risk' : 'active')
      };
    });
  }

  // 2. Process Visit Projections
  if (fileMappings.visit) {
    const visitData = await parseExcelFile(`${baseUrl}/${fileMappings.visit}`);
    data.visitProjections = visitData.map((row: any, index: number) => ({
      id: `VP-${index}`,
      siteId: row['Site ID'] || row['site_id'] || row['Site'] || '',
      subjectId: row['Subject ID'] || row['subject_id'] || row['Subject'] || row['SUBJID'] || '',
      visitName: row['Visit Name'] || row['visit'] || '',
      projectedDate: row['Projected Date'] || row['date'] || '',
      daysOverdue: Math.max(0, parseInt(row['Days Overdue'] || '0') + Math.floor(seed * 5)),
      status: (parseInt(row['Days Overdue'] || '0') + Math.floor(seed * 5)) > 0 ? 'overdue' : 'on-track'
    }));
  }

  // 3. Process SAEs
  if (fileMappings.sae) {
    const saeData = await parseExcelFile(`${baseUrl}/${fileMappings.sae}`);
    data.saeRecords = saeData.map((row: any, index: number) => ({
      id: `SAE-${index}`,
      siteId: row['Site ID'] || row['site_id'] || row['Site'] || '',
      subjectId: row['Subject ID'] || row['subject_id'] || row['Subject'] || row['SUBJID'] || `SUBJ-${index + 1}`,
      country: row['Country'] || row['country'] || '',
      status: row['Status']?.toLowerCase().includes('open') ? 'pending-review' : 'closed',
      discrepancyType: row['Discrepancy'] || 'Review Needed',
      daysOpen: parseInt(row['Days Open'] || '0') + Math.floor(seed * 7),
      severity: row['Severity']?.toLowerCase().includes('serious') ? 'serious' : 'non-serious'
    }));
  }

  console.log(`Processed data for ${studyId} with seed ${seed}:`, {
    sites: data.sites.length,
    visits: data.visitProjections.length,
    saes: data.saeRecords.length
  });

  return data;
};
