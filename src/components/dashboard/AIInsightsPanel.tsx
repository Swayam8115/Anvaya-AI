import { aiInsights, AIInsight } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { AlertTriangle, Lightbulb, AlertCircle, CheckCircle2, ArrowRight, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

const insightIcons = {
  critical: AlertCircle,
  warning: AlertTriangle,
  recommendation: Lightbulb,
  success: CheckCircle2,
};

const insightStyles = {
  critical: {
    border: 'border-l-destructive',
    icon: 'text-destructive bg-destructive/10',
    title: 'text-destructive',
  },
  warning: {
    border: 'border-l-warning',
    icon: 'text-warning bg-warning/10',
    title: 'text-warning',
  },
  recommendation: {
    border: 'border-l-primary',
    icon: 'text-primary bg-primary/10',
    title: 'text-primary',
  },
  success: {
    border: 'border-l-success',
    icon: 'text-success bg-success/10',
    title: 'text-success',
  },
};

const InsightCard = ({ insight }: { insight: AIInsight }) => {
  const Icon = insightIcons[insight.type];
  const styles = insightStyles[insight.type];
  
  const timeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className={cn(
      "bg-card rounded-lg border border-border border-l-4 p-4 hover:shadow-md transition-shadow",
      styles.border
    )}>
      <div className="flex gap-3">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", styles.icon)}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={cn("font-medium text-sm", styles.title)}>{insight.title}</h4>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{timeAgo(insight.timestamp)}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{insight.description}</p>
          {insight.affectedSites && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {insight.affectedSites.map((site) => (
                <span key={site} className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-md">
                  {site}
                </span>
              ))}
            </div>
          )}
          {insight.action && (
            <Button variant="link" size="sm" className="px-0 mt-2 h-auto text-primary">
              {insight.action}
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const AIInsightsPanel = () => {
  return (
    <div className="stat-card p-5 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">AI-Powered Insights</h3>
          <p className="text-sm text-muted-foreground">Real-time recommendations based on current data</p>
        </div>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {aiInsights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
};

export default AIInsightsPanel;
