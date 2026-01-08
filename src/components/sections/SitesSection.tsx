import { Site, sites as mockSites } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { MapPin, Users, FileCheck, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface SitesSectionProps {
  sites?: Site[];
}

const SitesSection = ({ sites = mockSites }: SitesSectionProps) => {
  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-success/10 text-success border-success/20',
      'at-risk': 'bg-warning/10 text-warning border-warning/20',
      critical: 'bg-destructive/10 text-destructive border-destructive/20',
    };
    return styles[status as keyof typeof styles] || styles.active;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sites.map((site) => (
          <div 
            key={site.id} 
            className={cn(
              "stat-card p-5 hover:shadow-lg transition-all cursor-pointer animate-fade-in",
              site.status === 'critical' && "border-destructive/30",
              site.status === 'at-risk' && "border-warning/30"
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground text-sm">{site.name}</h3>
                <p className="text-xs text-muted-foreground">{site.id}</p>
              </div>
              <Badge variant="outline" className={cn("capitalize text-xs", getStatusBadge(site.status))}>
                {site.status.replace('-', ' ')}
              </Badge>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>{site.country}, {site.region}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                  <Users className="w-3.5 h-3.5" />
                  <span className="text-xs">Subjects</span>
                </div>
                <p className="text-lg font-semibold text-foreground">{site.activeSubjects}<span className="text-sm text-muted-foreground">/{site.enrolledSubjects}</span></p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span className="text-xs">Clean CRF</span>
                </div>
                <p className={cn(
                  "text-lg font-semibold",
                  site.cleanCRFPercentage >= 90 ? "text-success" :
                  site.cleanCRFPercentage >= 80 ? "text-warning" : "text-destructive"
                )}>
                  {site.cleanCRFPercentage}%
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {site.dataQualityScore >= 90 ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                  <span className="text-sm text-muted-foreground">Quality Score</span>
                </div>
                <span className={cn(
                  "text-lg font-bold",
                  site.dataQualityScore >= 90 ? "text-success" :
                  site.dataQualityScore >= 80 ? "text-warning" : "text-destructive"
                )}>
                  {site.dataQualityScore}%
                </span>
              </div>

              {site.openQueries > 0 && (
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <AlertTriangle className={cn(
                    "w-4 h-4",
                    site.openQueries > 10 ? "text-destructive" : "text-warning"
                  )} />
                  <span className="text-muted-foreground">{site.openQueries} open queries</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SitesSection;
