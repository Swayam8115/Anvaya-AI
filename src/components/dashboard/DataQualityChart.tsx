import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dailyMetrics } from '@/data/mockData';

const DataQualityChart = () => {
  const data = dailyMetrics.map(d => ({
    ...d,
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="stat-card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">Data Quality Index Trend</h3>
          <p className="text-sm text-muted-foreground">Weekly performance score</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-chart-1" />
            <span className="text-xs text-muted-foreground">Quality Index</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDQI" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              domain={[70, 100]} 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="dataQualityIndex" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorDQI)" 
              name="Quality Index"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DataQualityChart;
