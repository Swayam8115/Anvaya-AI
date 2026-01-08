import { visitProjections } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const VisitsSection = () => {
  const getStatusBadge = (status: string) => {
    const styles = {
      'on-track': 'bg-success/10 text-success border-success/20',
      'due-soon': 'bg-warning/10 text-warning border-warning/20',
      overdue: 'bg-destructive/10 text-destructive border-destructive/20',
    };
    return styles[status as keyof typeof styles];
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'on-track': <CheckCircle className="w-5 h-5 text-success" />,
      'due-soon': <Clock className="w-5 h-5 text-warning" />,
      overdue: <AlertTriangle className="w-5 h-5 text-destructive" />,
    };
    return icons[status as keyof typeof icons];
  };

  const overdueVisits = visitProjections.filter(v => v.status === 'overdue');
  const dueSoonVisits = visitProjections.filter(v => v.status === 'due-soon');
  const onTrackVisits = visitProjections.filter(v => v.status === 'on-track');

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card p-5 border-l-4 border-l-destructive animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <p className="text-3xl font-bold text-destructive">{overdueVisits.length}</p>
              <p className="text-sm text-muted-foreground">Overdue Visits</p>
            </div>
          </div>
        </div>
        <div className="stat-card p-5 border-l-4 border-l-warning animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-3xl font-bold text-warning">{dueSoonVisits.length}</p>
              <p className="text-sm text-muted-foreground">Due Soon</p>
            </div>
          </div>
        </div>
        <div className="stat-card p-5 border-l-4 border-l-success animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-3xl font-bold text-success">{onTrackVisits.length}</p>
              <p className="text-sm text-muted-foreground">On Track</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visit Tracker */}
      <div className="stat-card p-5 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Visit Projection Tracker</h3>
            <p className="text-sm text-muted-foreground">Scheduled visits requiring attention</p>
          </div>
        </div>

        <div className="space-y-3">
          {visitProjections.map((visit) => (
            <div 
              key={visit.id}
              className={cn(
                "p-4 rounded-lg border transition-all hover:shadow-md",
                visit.status === 'overdue' ? "border-destructive/30 bg-destructive/5" :
                visit.status === 'due-soon' ? "border-warning/30 bg-warning/5" :
                "border-border bg-card"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getStatusIcon(visit.status)}
                  <div>
                    <p className="font-medium text-foreground">{visit.visitName}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span>Subject: {visit.subjectId}</span>
                      <span>•</span>
                      <span>Site: {visit.siteId}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <Badge variant="outline" className={cn("capitalize mb-1", getStatusBadge(visit.status))}>
                    {visit.status.replace('-', ' ')}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Projected: {new Date(visit.projectedDate).toLocaleDateString()}
                  </p>
                  {visit.daysOverdue > 0 && (
                    <p className="text-sm font-medium text-destructive">
                      {visit.daysOverdue} days overdue
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisitsSection;
