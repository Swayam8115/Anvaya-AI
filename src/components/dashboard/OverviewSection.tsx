import StatCard from './StatCard';
import DataQualityChart from './DataQualityChart';
import QueryChart from './QueryChart';
import SitePerformanceTable from './SitePerformanceTable';
import AIInsightsPanel from './AIInsightsPanel';
import RegionPieChart from './RegionPieChart';
import { summaryStats as mockStats } from '@/data/mockData';
import { Building2, Users, FileQuestion, AlertTriangle, CheckCircle, TrendingUp, Calendar, Activity } from 'lucide-react';

interface OverviewSectionProps {
  studyData?: any;
}

const OverviewSection = ({ studyData }: OverviewSectionProps) => {
  // Calculate specific stats from studyData if available, fallback to mock
  const stats = studyData ? {
    totalSites: studyData.sites?.length || 0,
    activeSubjects: studyData.sites?.reduce((acc: number, s: any) => acc + (s.activeSubjects || 0), 0) || 0,
    totalSubjects: studyData.sites?.reduce((acc: number, s: any) => acc + (s.enrolledSubjects || 0), 0) || 0,
    totalOpenQueries: studyData.sites?.reduce((acc: number, s: any) => acc + (s.openQueries || 0), 0) || 0,
    avgDataQualityScore: Math.round(
      (studyData.sites?.reduce((acc: number, s: any) => acc + (s.dataQualityScore || 0), 0) || 0) / (studyData.sites?.length || 1)
    ),
    cleanSubjectsPercentage: 88, // Derived if possible, else mock or heuristic
    pendingSAEs: studyData.saeRecords?.filter((s:any) => s.status === 'pending-review').length || 0,
    overdueVisits: studyData.visitProjections?.filter((v:any) => v.status === 'overdue').length || 0,
    criticalSites: studyData.sites?.filter((s:any) => s.status === 'critical').length || 0,
    atRiskSites: studyData.sites?.filter((s:any) => s.status === 'at-risk').length || 0,
  } : mockStats;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Sites"
          value={stats.totalSites}
          subtitle={`${stats.criticalSites} critical, ${stats.atRiskSites} at-risk`}
          icon={Building2}
          variant="primary"
        />
        <StatCard
          title="Active Subjects"
          value={stats.activeSubjects}
          subtitle={`of ${stats.totalSubjects} enrolled`}
          icon={Users}
          trend={{ value: 3.2, isPositive: true }}
          variant="default"
        />
        <StatCard
          title="Open Queries"
          value={stats.totalOpenQueries}
          subtitle="Requiring resolution"
          icon={FileQuestion}
          trend={{ value: 8, isPositive: true }}
          variant="warning"
        />
        <StatCard
          title="Data Quality Score"
          value={`${stats.avgDataQualityScore}%`}
          subtitle="Overall index"
          icon={TrendingUp}
          trend={{ value: 4, isPositive: true }}
          variant="success"
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Clean Subjects"
          value={`${stats.cleanSubjectsPercentage}%`}
          subtitle="Fully verified"
          icon={CheckCircle}
          variant="success"
        />
        <StatCard
          title="Pending SAEs"
          value={stats.pendingSAEs}
          subtitle="Awaiting review"
          icon={AlertTriangle}
          variant="danger"
        />
        <StatCard
          title="Overdue Visits"
          value={stats.overdueVisits}
          subtitle="Requiring follow-up"
          icon={Calendar}
          variant="warning"
        />
        <StatCard
          title="Query Resolution"
          value="94%"
          subtitle="Last 30 days"
          icon={Activity}
          trend={{ value: 2.5, isPositive: true }}
          variant="primary"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataQualityChart />
        <QueryChart />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SitePerformanceTable />
        </div>
        <div>
          <RegionPieChart sites={studyData?.sites} />
        </div>
      </div>

      {/* AI Insights */}
      <AIInsightsPanel />
    </div>
  );
};

export default OverviewSection;
