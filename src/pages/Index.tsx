import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import OverviewSection from '@/components/dashboard/OverviewSection';
import SitesSection from '@/components/sections/SitesSection';
import SubjectsSection from '@/components/sections/SubjectsSection';
import QueriesSection from '@/components/sections/QueriesSection';
import SAESection from '@/components/sections/SAESection';
import VisitsSection from '@/components/sections/VisitsSection';
import InsightsSection from '@/components/sections/InsightsSection';
import { loadStudyIndex, fetchStudyData, Study } from '@/services/dataService';
import { aiInsights, sites as mockSites } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const sectionTitles: Record<string, { title: string; subtitle: string }> = {
  overview: { title: 'Dashboard Overview', subtitle: 'Real-time clinical trial metrics and insights' },
  sites: { title: 'Site Management', subtitle: 'Performance metrics across all sites' },
  subjects: { title: 'Subject Registry', subtitle: 'Patient-level data and status tracking' },
  queries: { title: 'Query Management', subtitle: 'Open queries and resolution tracking' },
  sae: { title: 'SAE Dashboard', subtitle: 'Serious Adverse Event monitoring' },
  visits: { title: 'Visit Tracker', subtitle: 'Projected and overdue visit management' },
  insights: { title: 'AI Insights', subtitle: 'Intelligent recommendations and analysis' },
};

const Index = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [studies, setStudies] = useState<Study[]>([]);
  const [selectedStudyId, setSelectedStudyId] = useState<string>('');
  const [studyData, setStudyData] = useState<any>({ sites: mockSites });
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { title, subtitle } = sectionTitles[activeSection] || sectionTitles.overview;

  useEffect(() => {
    const init = async () => {
        const loadedStudies = await loadStudyIndex();
        setStudies(loadedStudies);
        if (loadedStudies.length > 0) {
            setSelectedStudyId(loadedStudies[0].id);
        }
    };
    init();
  }, []);

  useEffect(() => {
    if (!selectedStudyId) return;
    
    const loadData = async () => {
        setIsLoading(true);
        try {
            const data = await fetchStudyData(selectedStudyId);
            setStudyData(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    loadData();
  }, [selectedStudyId]);

  const renderSection = () => {
    if (isLoading) {
        return <div className="flex items-center justify-center h-64">Loading data...</div>;
    }

    switch (activeSection) {
      case 'overview':
        return <OverviewSection studyData={studyData} />;
      case 'sites':
        return <SitesSection sites={studyData.sites} />;
      case 'subjects':
        return <SubjectsSection />; // Needs refactor to accept props
      case 'queries':
        return <QueriesSection />; // Needs refactor
      case 'sae':
        return <SAESection />; // Needs refactor
      case 'visits':
        return <VisitsSection />; // Needs refactor
      case 'insights':
        return <InsightsSection insights={aiInsights} studyData={studyData} />;
      default:
        return <OverviewSection studyData={studyData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed} 
      />
      
      <div 
        className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}
      >
        <div className="relative">
             <Header title={title} subtitle={subtitle} />
             <div className="absolute right-6 top-4 z-10 w-64 bg-card rounded-md border shadow-sm">
                <Select value={selectedStudyId} onValueChange={setSelectedStudyId}>
                    <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select Study" />
                    </SelectTrigger>
                    <SelectContent>
                        {studies.map(study => (
                            <SelectItem key={study.id} value={study.id}>
                                {study.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
             </div>
        </div>
        
        <main className="p-6">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Index;
