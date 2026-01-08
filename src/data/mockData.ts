// Clinical Trial Mock Data for Testing

export interface Site {
  id: string;
  name: string;
  country: string;
  region: string;
  enrolledSubjects: number;
  activeSubjects: number;
  completedVisits: number;
  missingVisits: number;
  openQueries: number;
  closedQueries: number;
  dataQualityScore: number;
  cleanCRFPercentage: number;
  status: 'active' | 'at-risk' | 'critical';
}

export interface Subject {
  id: string;
  siteId: string;
  siteName: string;
  country: string;
  status: 'ongoing' | 'completed' | 'discontinued' | 'screen-failure';
  latestVisit: string;
  missingVisits: number;
  missingPages: number;
  openQueries: number;
  uncodedTerms: number;
  cleanCRFPercentage: number;
  isClean: boolean;
}

export interface Query {
  id: string;
  siteId: string;
  subjectId: string;
  type: 'DM' | 'Clinical' | 'Medical' | 'Safety' | 'Coding';
  status: 'open' | 'answered' | 'closed';
  priority: 'low' | 'medium' | 'high';
  daysOpen: number;
  description: string;
  createdDate: string;
}

export interface SAERecord {
  id: string;
  siteId: string;
  subjectId: string;
  country: string;
  status: 'pending-review' | 'dm-reviewed' | 'safety-reviewed' | 'closed';
  discrepancyType: string;
  daysOpen: number;
  severity: 'serious' | 'non-serious';
}

export interface VisitProjection {
  id: string;
  siteId: string;
  subjectId: string;
  visitName: string;
  projectedDate: string;
  daysOverdue: number;
  status: 'on-track' | 'due-soon' | 'overdue';
}

export interface DailyMetric {
  date: string;
  openQueries: number;
  closedQueries: number;
  cleanCRFs: number;
  enrolledSubjects: number;
  dataQualityIndex: number;
}

export interface RegionMetric {
  region: string;
  sites: number;
  subjects: number;
  dataQualityScore: number;
  queryResolutionRate: number;
}

// Sites Data
export const sites: Site[] = [
  { id: 'SITE-001', name: 'Boston Medical Center', country: 'USA', region: 'North America', enrolledSubjects: 45, activeSubjects: 38, completedVisits: 234, missingVisits: 12, openQueries: 8, closedQueries: 156, dataQualityScore: 92, cleanCRFPercentage: 88, status: 'active' },
  { id: 'SITE-002', name: 'Toronto General Hospital', country: 'Canada', region: 'North America', enrolledSubjects: 32, activeSubjects: 28, completedVisits: 178, missingVisits: 5, openQueries: 3, closedQueries: 98, dataQualityScore: 96, cleanCRFPercentage: 94, status: 'active' },
  { id: 'SITE-003', name: 'London Royal Hospital', country: 'UK', region: 'Europe', enrolledSubjects: 52, activeSubjects: 44, completedVisits: 312, missingVisits: 18, openQueries: 15, closedQueries: 201, dataQualityScore: 85, cleanCRFPercentage: 81, status: 'at-risk' },
  { id: 'SITE-004', name: 'Berlin University Clinic', country: 'Germany', region: 'Europe', enrolledSubjects: 28, activeSubjects: 25, completedVisits: 156, missingVisits: 3, openQueries: 4, closedQueries: 89, dataQualityScore: 94, cleanCRFPercentage: 91, status: 'active' },
  { id: 'SITE-005', name: 'Paris Research Institute', country: 'France', region: 'Europe', enrolledSubjects: 41, activeSubjects: 36, completedVisits: 245, missingVisits: 22, openQueries: 19, closedQueries: 167, dataQualityScore: 78, cleanCRFPercentage: 74, status: 'critical' },
  { id: 'SITE-006', name: 'Tokyo Medical University', country: 'Japan', region: 'Asia Pacific', enrolledSubjects: 38, activeSubjects: 33, completedVisits: 198, missingVisits: 8, openQueries: 6, closedQueries: 112, dataQualityScore: 91, cleanCRFPercentage: 87, status: 'active' },
  { id: 'SITE-007', name: 'Singapore General', country: 'Singapore', region: 'Asia Pacific', enrolledSubjects: 25, activeSubjects: 22, completedVisits: 134, missingVisits: 4, openQueries: 2, closedQueries: 78, dataQualityScore: 97, cleanCRFPercentage: 95, status: 'active' },
  { id: 'SITE-008', name: 'Sydney Research Center', country: 'Australia', region: 'Asia Pacific', enrolledSubjects: 35, activeSubjects: 30, completedVisits: 189, missingVisits: 14, openQueries: 11, closedQueries: 134, dataQualityScore: 84, cleanCRFPercentage: 80, status: 'at-risk' },
  { id: 'SITE-009', name: 'São Paulo Clinical Center', country: 'Brazil', region: 'Latin America', enrolledSubjects: 29, activeSubjects: 24, completedVisits: 145, missingVisits: 9, openQueries: 7, closedQueries: 91, dataQualityScore: 89, cleanCRFPercentage: 85, status: 'active' },
  { id: 'SITE-010', name: 'Mumbai Research Hospital', country: 'India', region: 'Asia Pacific', enrolledSubjects: 48, activeSubjects: 41, completedVisits: 267, missingVisits: 25, openQueries: 21, closedQueries: 189, dataQualityScore: 76, cleanCRFPercentage: 72, status: 'critical' },
];

// Subjects Data
export const subjects: Subject[] = [
  { id: 'SUBJ-0001', siteId: 'SITE-001', siteName: 'Boston Medical Center', country: 'USA', status: 'ongoing', latestVisit: 'Week 12', missingVisits: 0, missingPages: 1, openQueries: 2, uncodedTerms: 0, cleanCRFPercentage: 92, isClean: false },
  { id: 'SUBJ-0002', siteId: 'SITE-001', siteName: 'Boston Medical Center', country: 'USA', status: 'ongoing', latestVisit: 'Week 8', missingVisits: 1, missingPages: 0, openQueries: 0, uncodedTerms: 0, cleanCRFPercentage: 100, isClean: false },
  { id: 'SUBJ-0003', siteId: 'SITE-002', siteName: 'Toronto General Hospital', country: 'Canada', status: 'completed', latestVisit: 'End of Study', missingVisits: 0, missingPages: 0, openQueries: 0, uncodedTerms: 0, cleanCRFPercentage: 100, isClean: true },
  { id: 'SUBJ-0004', siteId: 'SITE-003', siteName: 'London Royal Hospital', country: 'UK', status: 'ongoing', latestVisit: 'Week 16', missingVisits: 2, missingPages: 3, openQueries: 4, uncodedTerms: 2, cleanCRFPercentage: 78, isClean: false },
  { id: 'SUBJ-0005', siteId: 'SITE-005', siteName: 'Paris Research Institute', country: 'France', status: 'ongoing', latestVisit: 'Week 4', missingVisits: 3, missingPages: 5, openQueries: 6, uncodedTerms: 3, cleanCRFPercentage: 65, isClean: false },
  { id: 'SUBJ-0006', siteId: 'SITE-006', siteName: 'Tokyo Medical University', country: 'Japan', status: 'ongoing', latestVisit: 'Week 20', missingVisits: 0, missingPages: 0, openQueries: 1, uncodedTerms: 0, cleanCRFPercentage: 96, isClean: false },
  { id: 'SUBJ-0007', siteId: 'SITE-007', siteName: 'Singapore General', country: 'Singapore', status: 'completed', latestVisit: 'End of Study', missingVisits: 0, missingPages: 0, openQueries: 0, uncodedTerms: 0, cleanCRFPercentage: 100, isClean: true },
  { id: 'SUBJ-0008', siteId: 'SITE-010', siteName: 'Mumbai Research Hospital', country: 'India', status: 'ongoing', latestVisit: 'Week 6', missingVisits: 4, missingPages: 8, openQueries: 7, uncodedTerms: 4, cleanCRFPercentage: 58, isClean: false },
];

// Queries Data
export const queries: Query[] = [
  { id: 'QRY-001', siteId: 'SITE-001', subjectId: 'SUBJ-0001', type: 'DM', status: 'open', priority: 'medium', daysOpen: 5, description: 'Missing vital signs data for Visit 8', createdDate: '2026-01-02' },
  { id: 'QRY-002', siteId: 'SITE-003', subjectId: 'SUBJ-0004', type: 'Clinical', status: 'open', priority: 'high', daysOpen: 12, description: 'Inconsistent adverse event dates', createdDate: '2025-12-26' },
  { id: 'QRY-003', siteId: 'SITE-005', subjectId: 'SUBJ-0005', type: 'Medical', status: 'open', priority: 'high', daysOpen: 8, description: 'Unconfirmed concomitant medication', createdDate: '2025-12-30' },
  { id: 'QRY-004', siteId: 'SITE-005', subjectId: 'SUBJ-0005', type: 'Safety', status: 'open', priority: 'high', daysOpen: 15, description: 'SAE form incomplete', createdDate: '2025-12-23' },
  { id: 'QRY-005', siteId: 'SITE-010', subjectId: 'SUBJ-0008', type: 'Coding', status: 'open', priority: 'medium', daysOpen: 7, description: 'Adverse event term requires MedDRA coding', createdDate: '2025-12-31' },
  { id: 'QRY-006', siteId: 'SITE-006', subjectId: 'SUBJ-0006', type: 'DM', status: 'answered', priority: 'low', daysOpen: 3, description: 'Lab result clarification needed', createdDate: '2026-01-04' },
  { id: 'QRY-007', siteId: 'SITE-008', subjectId: 'SUBJ-0004', type: 'Clinical', status: 'open', priority: 'medium', daysOpen: 6, description: 'Visit window deviation', createdDate: '2026-01-01' },
  { id: 'QRY-008', siteId: 'SITE-010', subjectId: 'SUBJ-0008', type: 'Safety', status: 'open', priority: 'high', daysOpen: 20, description: 'Missing follow-up for reported AE', createdDate: '2025-12-18' },
];

// SAE Records
export const saeRecords: SAERecord[] = [
  { id: 'SAE-001', siteId: 'SITE-005', subjectId: 'SUBJ-0005', country: 'France', status: 'pending-review', discrepancyType: 'Incomplete Documentation', daysOpen: 8, severity: 'serious' },
  { id: 'SAE-002', siteId: 'SITE-010', subjectId: 'SUBJ-0008', country: 'India', status: 'dm-reviewed', discrepancyType: 'Missing Lab Values', daysOpen: 12, severity: 'serious' },
  { id: 'SAE-003', siteId: 'SITE-003', subjectId: 'SUBJ-0004', country: 'UK', status: 'safety-reviewed', discrepancyType: 'Date Inconsistency', daysOpen: 5, severity: 'non-serious' },
];

// Visit Projections (Missing/Overdue Visits)
export const visitProjections: VisitProjection[] = [
  { id: 'VP-001', siteId: 'SITE-005', subjectId: 'SUBJ-0005', visitName: 'Week 8 Follow-up', projectedDate: '2025-12-28', daysOverdue: 10, status: 'overdue' },
  { id: 'VP-002', siteId: 'SITE-010', subjectId: 'SUBJ-0008', visitName: 'Week 12 Assessment', projectedDate: '2025-12-20', daysOverdue: 18, status: 'overdue' },
  { id: 'VP-003', siteId: 'SITE-003', subjectId: 'SUBJ-0004', visitName: 'Week 20 Follow-up', projectedDate: '2026-01-05', daysOverdue: 2, status: 'overdue' },
  { id: 'VP-004', siteId: 'SITE-008', subjectId: 'SUBJ-0004', visitName: 'Week 24 Final', projectedDate: '2026-01-10', daysOverdue: 0, status: 'due-soon' },
  { id: 'VP-005', siteId: 'SITE-001', subjectId: 'SUBJ-0002', visitName: 'Week 16 Check', projectedDate: '2026-01-15', daysOverdue: 0, status: 'on-track' },
];

// Daily Metrics (for trend charts)
export const dailyMetrics: DailyMetric[] = [
  { date: '2025-12-01', openQueries: 85, closedQueries: 1120, cleanCRFs: 1450, enrolledSubjects: 365, dataQualityIndex: 82 },
  { date: '2025-12-08', openQueries: 78, closedQueries: 1185, cleanCRFs: 1520, enrolledSubjects: 369, dataQualityIndex: 84 },
  { date: '2025-12-15', openQueries: 92, closedQueries: 1240, cleanCRFs: 1580, enrolledSubjects: 372, dataQualityIndex: 83 },
  { date: '2025-12-22', openQueries: 88, closedQueries: 1295, cleanCRFs: 1640, enrolledSubjects: 375, dataQualityIndex: 85 },
  { date: '2025-12-29', openQueries: 76, closedQueries: 1350, cleanCRFs: 1710, enrolledSubjects: 378, dataQualityIndex: 87 },
  { date: '2026-01-05', openQueries: 72, closedQueries: 1415, cleanCRFs: 1785, enrolledSubjects: 381, dataQualityIndex: 89 },
];

// Region Metrics
export const regionMetrics: RegionMetric[] = [
  { region: 'North America', sites: 2, subjects: 77, dataQualityScore: 94, queryResolutionRate: 95 },
  { region: 'Europe', sites: 3, subjects: 121, dataQualityScore: 86, queryResolutionRate: 88 },
  { region: 'Asia Pacific', sites: 4, subjects: 146, dataQualityScore: 87, queryResolutionRate: 90 },
  { region: 'Latin America', sites: 1, subjects: 29, dataQualityScore: 89, queryResolutionRate: 92 },
];

// AI Insights
export interface AIInsight {
  id: string;
  type: 'warning' | 'recommendation' | 'critical' | 'success';
  title: string;
  description: string;
  action?: string;
  affectedSites?: string[];
  timestamp: string;
}

export const aiInsights: AIInsight[] = [
  {
    id: 'INS-001',
    type: 'critical',
    title: 'High-Risk Site Requires Immediate Attention',
    description: 'Mumbai Research Hospital (SITE-010) has 21 open queries and 25 missing visits. Data quality score dropped below 80%. Recommend escalation to CRA.',
    action: 'Schedule urgent site visit',
    affectedSites: ['SITE-010'],
    timestamp: '2026-01-07T08:30:00Z'
  },
  {
    id: 'INS-002',
    type: 'warning',
    title: 'SAE Documentation Gap Detected',
    description: 'Paris Research Institute has 1 SAE pending review for 8+ days. Safety team review overdue.',
    action: 'Escalate to Safety Lead',
    affectedSites: ['SITE-005'],
    timestamp: '2026-01-07T07:15:00Z'
  },
  {
    id: 'INS-003',
    type: 'recommendation',
    title: 'Query Resolution Trending Positive',
    description: 'Overall query resolution rate improved by 4% this week. Consider recognizing top-performing sites.',
    affectedSites: ['SITE-002', 'SITE-007'],
    timestamp: '2026-01-07T06:00:00Z'
  },
  {
    id: 'INS-004',
    type: 'success',
    title: 'Singapore General Achieved 97% Data Quality',
    description: 'Site maintains excellent performance with lowest open query count and highest clean CRF rate.',
    affectedSites: ['SITE-007'],
    timestamp: '2026-01-06T18:00:00Z'
  },
  {
    id: 'INS-005',
    type: 'warning',
    title: 'Visit Compliance Alert',
    description: '5 subjects across 4 sites have overdue visits. Longest overdue: 18 days at Mumbai Research Hospital.',
    action: 'Review visit tracker',
    affectedSites: ['SITE-005', 'SITE-010', 'SITE-003', 'SITE-008'],
    timestamp: '2026-01-07T05:30:00Z'
  }
];

// Summary Statistics
export const summaryStats = {
  totalSites: sites.length,
  totalSubjects: sites.reduce((acc, site) => acc + site.enrolledSubjects, 0),
  activeSubjects: sites.reduce((acc, site) => acc + site.activeSubjects, 0),
  totalOpenQueries: queries.filter(q => q.status === 'open').length,
  avgDataQualityScore: Math.round(sites.reduce((acc, site) => acc + site.dataQualityScore, 0) / sites.length),
  cleanSubjectsPercentage: Math.round((subjects.filter(s => s.isClean).length / subjects.length) * 100),
  criticalSites: sites.filter(s => s.status === 'critical').length,
  atRiskSites: sites.filter(s => s.status === 'at-risk').length,
  pendingSAEs: saeRecords.filter(s => s.status === 'pending-review').length,
  overdueVisits: visitProjections.filter(v => v.status === 'overdue').length,
};
