import { sites } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const SitePerformanceTable = () => {
  const sortedSites = [...sites].sort((a, b) => b.dataQualityScore - a.dataQualityScore);

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-success/10 text-success border-success/20',
      'at-risk': 'bg-warning/10 text-warning border-warning/20',
      critical: 'bg-destructive/10 text-destructive border-destructive/20',
    };
    return styles[status as keyof typeof styles] || styles.active;
  };

  return (
    <div className="stat-card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">Site Performance</h3>
          <p className="text-sm text-muted-foreground">Ranked by data quality score</p>
        </div>
        <button className="text-sm text-primary hover:underline">View all</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Site</th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Country</th>
              <th className="text-center py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Subjects</th>
              <th className="text-center py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Quality</th>
              <th className="text-center py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Clean CRF</th>
              <th className="text-center py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Open Queries</th>
              <th className="text-center py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedSites.slice(0, 6).map((site) => (
              <tr key={site.id} className="hover:bg-muted/30 transition-colors">
                <td className="py-3 px-2">
                  <div>
                    <p className="font-medium text-sm text-foreground">{site.name}</p>
                    <p className="text-xs text-muted-foreground">{site.id}</p>
                  </div>
                </td>
                <td className="py-3 px-2 text-sm text-muted-foreground">{site.country}</td>
                <td className="py-3 px-2 text-center">
                  <span className="text-sm font-medium text-foreground">{site.activeSubjects}</span>
                  <span className="text-xs text-muted-foreground">/{site.enrolledSubjects}</span>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className={cn(
                      "text-sm font-semibold",
                      site.dataQualityScore >= 90 ? "text-success" :
                      site.dataQualityScore >= 80 ? "text-warning" : "text-destructive"
                    )}>
                      {site.dataQualityScore}%
                    </span>
                    {site.dataQualityScore >= 90 ? (
                      <ArrowUpRight className="w-3 h-3 text-success" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-destructive" />
                    )}
                  </div>
                </td>
                <td className="py-3 px-2 text-center text-sm text-muted-foreground">
                  {site.cleanCRFPercentage}%
                </td>
                <td className="py-3 px-2 text-center">
                  <span className={cn(
                    "text-sm font-medium",
                    site.openQueries > 10 ? "text-destructive" :
                    site.openQueries > 5 ? "text-warning" : "text-foreground"
                  )}>
                    {site.openQueries}
                  </span>
                </td>
                <td className="py-3 px-2 text-center">
                  <Badge variant="outline" className={cn("capitalize text-xs", getStatusBadge(site.status))}>
                    {site.status.replace('-', ' ')}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SitePerformanceTable;
