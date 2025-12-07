interface ScoreGaugeProps {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ScoreGauge = ({ score, label, size = 'md' }: ScoreGaugeProps) => {
  const dimensions = {
    sm: { width: 120, fontSize: '2xl', subFontSize: 'xs' },
    md: { width: 160, fontSize: '4xl', subFontSize: 'sm' },
    lg: { width: 200, fontSize: '5xl', subFontSize: 'base' },
  };

  const { width, fontSize, subFontSize } = dimensions[size];
  const percentage = Math.min(100, Math.max(0, score));
  const strokeDasharray = `${percentage * 2.51} ${100 * 2.51}`;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width, height: width }}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-${fontSize} font-display font-bold text-foreground`}>
            {score}
          </span>
          <span className={`text-${subFontSize} text-muted-foreground`}>su 100</span>
        </div>
      </div>
      {label && (
        <div className="mt-4 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium">
          {label}
        </div>
      )}
    </div>
  );
};
