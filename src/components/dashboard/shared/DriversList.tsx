import { TrendingUp, TrendingDown } from "lucide-react";

interface DriversListProps {
  positive: string[];
  negative: string[];
}

export const DriversList = ({ positive, negative }: DriversListProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Positive Drivers */}
      <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <h3 className="font-display font-semibold text-foreground">Driver Positivi</h3>
        </div>
        {positive && positive.length > 0 ? (
          <ul className="space-y-3">
            {positive.map((driver, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <span className="text-foreground">{driver}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm italic">
            I driver positivi verranno mostrati qui
          </p>
        )}
      </div>

      {/* Negative Drivers */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-5 h-5 text-red-500" />
          <h3 className="font-display font-semibold text-foreground">Driver Negativi</h3>
        </div>
        {negative && negative.length > 0 ? (
          <ul className="space-y-3">
            {negative.map((driver, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span className="text-foreground">{driver}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm italic">
            I driver negativi verranno mostrati qui
          </p>
        )}
      </div>
    </div>
  );
};
