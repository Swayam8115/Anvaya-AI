import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Site, regionMetrics as mockMetrics } from '@/data/mockData';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-5))',
];

interface RegionPieChartProps {
  sites?: Site[];
}

const RegionPieChart = ({ sites }: RegionPieChartProps) => {
  // Aggregate data from sites or fallback to mock
  const data = sites && sites.length > 0 ? (() => {
    const regionMap = sites.reduce((acc, site) => {
      acc[site.region] = (acc[site.region] || 0) + site.activeSubjects;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(regionMap).map(([name, value]) => ({ name, value }));
  })() : mockMetrics.map((r) => ({ name: r.region, value: r.subjects }));

  return (
    <div className="stat-card p-5 animate-fade-in">
      <div className="mb-4">
        <h3 className="font-semibold text-foreground">Subject Distribution</h3>
        <p className="text-sm text-muted-foreground">By region</p>
      </div>

      <div className="h-64 flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              formatter={(value: number) => [`${value} subjects`, '']}
            />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item, idx) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
            <span className="text-xs text-muted-foreground">{item.name}</span>
            <span className="text-xs font-medium text-foreground ml-auto">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionPieChart;
