import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Minus, TrendingDown } from "lucide-react";

interface ScenarioTabsProps {
  scenarios: {
    optimistic?: string;
    base?: string;
    pessimistic?: string;
  };
}

export const ScenarioTabs = ({ scenarios }: ScenarioTabsProps) => {
  return (
    <Tabs defaultValue="base" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="optimistic" className="gap-2">
          <TrendingUp className="w-4 h-4" />
          <span className="hidden sm:inline">Ottimistico</span>
        </TabsTrigger>
        <TabsTrigger value="base" className="gap-2">
          <Minus className="w-4 h-4" />
          <span className="hidden sm:inline">Base</span>
        </TabsTrigger>
        <TabsTrigger value="pessimistic" className="gap-2">
          <TrendingDown className="w-4 h-4" />
          <span className="hidden sm:inline">Pessimistico</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="optimistic">
        <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20">
          <h4 className="font-display font-semibold text-green-500 mb-3">
            Scenario Ottimistico
          </h4>
          {scenarios.optimistic ? (
            <p className="text-foreground">{scenarios.optimistic}</p>
          ) : (
            <p className="text-muted-foreground italic">
              La descrizione dello scenario ottimistico apparirà qui quando saranno disponibili i dati predittivi.
            </p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="base">
        <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
          <h4 className="font-display font-semibold text-primary mb-3">
            Scenario Base
          </h4>
          {scenarios.base ? (
            <p className="text-foreground">{scenarios.base}</p>
          ) : (
            <p className="text-muted-foreground italic">
              La descrizione dello scenario base apparirà qui quando saranno disponibili i dati predittivi.
            </p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="pessimistic">
        <div className="p-6 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
          <h4 className="font-display font-semibold text-yellow-500 mb-3">
            Scenario Pessimistico
          </h4>
          {scenarios.pessimistic ? (
            <p className="text-foreground">{scenarios.pessimistic}</p>
          ) : (
            <p className="text-muted-foreground italic">
              La descrizione dello scenario pessimistico apparirà qui quando saranno disponibili i dati predittivi.
            </p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};
