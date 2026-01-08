import { queries } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Clock, CheckCircle, MessageSquare, AlertTriangle } from 'lucide-react';

const QueriesSection = () => {
  const getPriorityBadge = (priority: string) => {
    const styles = {
      low: 'bg-muted text-muted-foreground',
      medium: 'bg-warning/10 text-warning border-warning/20',
      high: 'bg-destructive/10 text-destructive border-destructive/20',
    };
    return styles[priority as keyof typeof styles];
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      open: 'bg-destructive/10 text-destructive border-destructive/20',
      answered: 'bg-primary/10 text-primary border-primary/20',
      closed: 'bg-success/10 text-success border-success/20',
    };
    return styles[status as keyof typeof styles];
  };

  const getTypeBadge = (type: string) => {
    const styles: Record<string, string> = {
      DM: 'bg-chart-1/10 text-chart-1',
      Clinical: 'bg-chart-2/10 text-chart-2',
      Medical: 'bg-chart-3/10 text-chart-3',
      Safety: 'bg-chart-4/10 text-chart-4',
      Coding: 'bg-chart-5/10 text-chart-5',
    };
    return styles[type] || 'bg-muted text-muted-foreground';
  };

  const openQueries = queries.filter(q => q.status === 'open');
  const answeredQueries = queries.filter(q => q.status === 'answered');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card p-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">{openQueries.length}</p>
              <p className="text-sm text-muted-foreground">Open Queries</p>
            </div>
          </div>
        </div>
        <div className="stat-card p-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{answeredQueries.length}</p>
              <p className="text-sm text-muted-foreground">Awaiting Review</p>
            </div>
          </div>
        </div>
        <div className="stat-card p-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">{queries.filter(q => q.daysOpen > 7).length}</p>
              <p className="text-sm text-muted-foreground">&gt;7 Days Old</p>
            </div>
          </div>
        </div>
        <div className="stat-card p-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-success">94%</p>
              <p className="text-sm text-muted-foreground">Resolution Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Query List */}
      <div className="stat-card p-5 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Query Log</h3>
          <div className="flex gap-2">
            <Badge variant="outline" className={getStatusBadge('open')}>{openQueries.length} Open</Badge>
            <Badge variant="outline" className={getStatusBadge('answered')}>{answeredQueries.length} Answered</Badge>
          </div>
        </div>

        <div className="space-y-3">
          {queries.map((query) => (
            <div 
              key={query.id}
              className={cn(
                "p-4 rounded-lg border border-border hover:shadow-md transition-all",
                query.priority === 'high' && query.status === 'open' && "border-l-4 border-l-destructive"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-sm text-foreground">{query.id}</span>
                    <Badge className={cn("text-xs", getTypeBadge(query.type))}>{query.type}</Badge>
                    <Badge variant="outline" className={cn("text-xs capitalize", getPriorityBadge(query.priority))}>{query.priority}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{query.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Site: {query.siteId}</span>
                    <span>Subject: {query.subjectId}</span>
                    <span>Created: {query.createdDate}</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={cn("text-xs capitalize mb-2", getStatusBadge(query.status))}>
                    {query.status}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className={cn(
                      "w-4 h-4",
                      query.daysOpen > 10 ? "text-destructive" :
                      query.daysOpen > 5 ? "text-warning" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "font-medium",
                      query.daysOpen > 10 ? "text-destructive" :
                      query.daysOpen > 5 ? "text-warning" : "text-muted-foreground"
                    )}>
                      {query.daysOpen}d
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QueriesSection;
