import { subjects } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

const SubjectsSection = () => {
  const getStatusIcon = (status: string) => {
    const icons = {
      ongoing: <Clock className="w-4 h-4 text-primary" />,
      completed: <CheckCircle className="w-4 h-4 text-success" />,
      discontinued: <XCircle className="w-4 h-4 text-destructive" />,
      'screen-failure': <AlertCircle className="w-4 h-4 text-muted-foreground" />,
    };
    return icons[status as keyof typeof icons];
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      ongoing: 'bg-primary/10 text-primary border-primary/20',
      completed: 'bg-success/10 text-success border-success/20',
      discontinued: 'bg-destructive/10 text-destructive border-destructive/20',
      'screen-failure': 'bg-muted text-muted-foreground border-muted',
    };
    return styles[status as keyof typeof styles];
  };

  return (
    <div className="stat-card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">Subject Registry</h3>
          <p className="text-sm text-muted-foreground">{subjects.length} subjects across all sites</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            {subjects.filter(s => s.isClean).length} Clean
          </Badge>
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
            {subjects.filter(s => !s.isClean && s.status === 'ongoing').length} Pending
          </Badge>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject</th>
              <th className="text-left py-3 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Site</th>
              <th className="text-center py-3 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-center py-3 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Latest Visit</th>
              <th className="text-center py-3 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Missing</th>
              <th className="text-center py-3 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Queries</th>
              <th className="text-center py-3 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Clean CRF</th>
              <th className="text-center py-3 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {subjects.map((subject) => (
              <tr key={subject.id} className="hover:bg-muted/30 transition-colors">
                <td className="py-4 px-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(subject.status)}
                    <span className="font-medium text-sm text-foreground">{subject.id}</span>
                  </div>
                </td>
                <td className="py-4 px-3">
                  <div>
                    <p className="text-sm text-foreground">{subject.siteName}</p>
                    <p className="text-xs text-muted-foreground">{subject.country}</p>
                  </div>
                </td>
                <td className="py-4 px-3 text-center">
                  <Badge variant="outline" className={cn("capitalize text-xs", getStatusBadge(subject.status))}>
                    {subject.status.replace('-', ' ')}
                  </Badge>
                </td>
                <td className="py-4 px-3 text-center text-sm text-muted-foreground">
                  {subject.latestVisit}
                </td>
                <td className="py-4 px-3 text-center">
                  <div className="space-y-1">
                    {subject.missingVisits > 0 && (
                      <span className="text-xs text-destructive block">{subject.missingVisits} visits</span>
                    )}
                    {subject.missingPages > 0 && (
                      <span className="text-xs text-warning block">{subject.missingPages} pages</span>
                    )}
                    {subject.missingVisits === 0 && subject.missingPages === 0 && (
                      <span className="text-xs text-success">None</span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-3 text-center">
                  <span className={cn(
                    "text-sm font-medium",
                    subject.openQueries > 3 ? "text-destructive" :
                    subject.openQueries > 0 ? "text-warning" : "text-success"
                  )}>
                    {subject.openQueries}
                  </span>
                </td>
                <td className="py-4 px-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          subject.cleanCRFPercentage >= 90 ? "bg-success" :
                          subject.cleanCRFPercentage >= 70 ? "bg-warning" : "bg-destructive"
                        )}
                        style={{ width: `${subject.cleanCRFPercentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{subject.cleanCRFPercentage}%</span>
                  </div>
                </td>
                <td className="py-4 px-3 text-center">
                  {subject.isClean ? (
                    <Badge className="bg-success/10 text-success border-success/20">Clean</Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">Pending</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectsSection;
