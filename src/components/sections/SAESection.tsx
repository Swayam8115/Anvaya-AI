import { saeRecords } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertTriangle, Clock, CheckCircle, FileWarning, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SAESection = () => {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'pending-review': 'bg-destructive/10 text-destructive border-destructive/20',
      'dm-reviewed': 'bg-warning/10 text-warning border-warning/20',
      'safety-reviewed': 'bg-primary/10 text-primary border-primary/20',
      closed: 'bg-success/10 text-success border-success/20',
    };
    return styles[status] || 'bg-muted text-muted-foreground';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'pending-review': 'Pending Review',
      'dm-reviewed': 'DM Reviewed',
      'safety-reviewed': 'Safety Reviewed',
      closed: 'Closed',
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-6">
      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card p-5 border-l-4 border-l-destructive animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <p className="text-3xl font-bold text-destructive">
                {saeRecords.filter(s => s.status === 'pending-review').length}
              </p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </div>
          </div>
        </div>
        <div className="stat-card p-5 border-l-4 border-l-warning animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
              <FileWarning className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-3xl font-bold text-warning">
                {saeRecords.filter(s => s.severity === 'serious').length}
              </p>
              <p className="text-sm text-muted-foreground">Serious Events</p>
            </div>
          </div>
        </div>
        <div className="stat-card p-5 border-l-4 border-l-primary animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">{saeRecords.length}</p>
              <p className="text-sm text-muted-foreground">Total SAE Records</p>
            </div>
          </div>
        </div>
      </div>

      {/* SAE Table */}
      <div className="stat-card p-5 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">SAE Dashboard</h3>
            <p className="text-sm text-muted-foreground">Serious Adverse Event tracking and reconciliation</p>
          </div>
        </div>

        <div className="space-y-4">
          {saeRecords.map((sae) => (
            <div 
              key={sae.id}
              className={cn(
                "p-5 rounded-lg border-2 transition-all hover:shadow-md",
                sae.status === 'pending-review' ? "border-destructive/30 bg-destructive/5" :
                sae.status === 'dm-reviewed' ? "border-warning/30 bg-warning/5" :
                "border-border bg-card"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-foreground">{sae.id}</span>
                    <Badge variant="outline" className={cn("capitalize", getStatusBadge(sae.status))}>
                      {getStatusLabel(sae.status)}
                    </Badge>
                    <Badge variant={sae.severity === 'serious' ? 'destructive' : 'secondary'}>
                      {sae.severity}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Subject</p>
                      <p className="text-sm font-medium text-foreground">{sae.subjectId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Site</p>
                      <p className="text-sm font-medium text-foreground">{sae.siteId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Country</p>
                      <p className="text-sm font-medium text-foreground">{sae.country}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Discrepancy Type</p>
                      <p className="text-sm font-medium text-foreground">{sae.discrepancyType}</p>
                    </div>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1">
                    <Clock className={cn(
                      "w-4 h-4",
                      sae.daysOpen > 10 ? "text-destructive" : "text-warning"
                    )} />
                    <span className={cn(
                      "font-bold",
                      sae.daysOpen > 10 ? "text-destructive" : "text-warning"
                    )}>
                      {sae.daysOpen} days
                    </span>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    Review
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SAESection;
