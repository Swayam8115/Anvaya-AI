import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

const variantStyles = {
  default: {
    container: 'stat-card',
    icon: 'bg-muted text-muted-foreground',
    value: 'text-foreground',
  },
  primary: {
    container: 'stat-card border-primary/20',
    icon: 'bg-primary/10 text-primary',
    value: 'text-primary',
  },
  success: {
    container: 'stat-card border-success/20',
    icon: 'bg-success/10 text-success',
    value: 'text-success',
  },
  warning: {
    container: 'stat-card border-warning/20',
    icon: 'bg-warning/10 text-warning',
    value: 'text-warning',
  },
  danger: {
    container: 'stat-card border-destructive/20',
    icon: 'bg-destructive/10 text-destructive',
    value: 'text-destructive',
  },
};

const StatCard = ({ title, value, subtitle, icon: Icon, trend, variant = 'default' }: StatCardProps) => {
  const styles = variantStyles[variant];

  return (
    <div className={cn(styles.container, 'p-5 animate-fade-in')}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={cn('text-2xl font-bold mt-1', styles.value)}>{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              'flex items-center gap-1 mt-2 text-xs font-medium',
              trend.isPositive ? 'text-success' : 'text-destructive'
            )}>
              <span>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', styles.icon)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
