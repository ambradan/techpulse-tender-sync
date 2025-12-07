import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TrendChartProps {
  data: Array<{ month: string; index: number }>;
  height?: number;
}

export const TrendChart = ({ data, height = 300 }: TrendChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div 
        className="flex items-center justify-center bg-secondary/30 rounded-lg"
        style={{ height }}
      >
        <p className="text-muted-foreground">Dati non disponibili</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="month" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          domain={[0, 100]}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
          labelStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Line
          type="monotone"
          dataKey="index"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
          activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
