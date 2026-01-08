import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { dailyMetrics } from '@/data/mockData';

const QueryChart = () => {
  const data = dailyMetrics.map(d => ({
    ...d,
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="stat-card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">Query Status Overview</h3>
          <p className="text-sm text-muted-foreground">Open vs Resolved queries</p>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
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
            <Legend 
              wrapperStyle={{ paddingTop: '10px' }}
              iconType="circle"
              iconSize={8}
            />
            <Bar 
              dataKey="openQueries" 
              fill="hsl(var(--chart-4))" 
              radius={[4, 4, 0, 0]} 
              name="Open Queries"
            />
            <Bar 
              dataKey="closedQueries" 
              fill="hsl(var(--chart-2))" 
              radius={[4, 4, 0, 0]} 
              name="Closed Queries"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default QueryChart;
