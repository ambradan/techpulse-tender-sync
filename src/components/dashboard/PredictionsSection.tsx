import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

// Demo prediction data - in production this would come from AI analysis
const weeklyData = [
  { name: "Lun", mercato: 65, opportunita: 42 },
  { name: "Mar", mercato: 72, opportunita: 55 },
  { name: "Mer", mercato: 68, opportunita: 48 },
  { name: "Gio", mercato: 78, opportunita: 62 },
  { name: "Ven", mercato: 82, opportunita: 70 },
  { name: "Sab", mercato: 85, opportunita: 68 },
  { name: "Dom", mercato: 88, opportunita: 75 },
];

const monthlyData = [
  { name: "Sett 1", crescita: 12, rischio: 8 },
  { name: "Sett 2", crescita: 18, rischio: 12 },
  { name: "Sett 3", crescita: 25, rischio: 15 },
  { name: "Sett 4", crescita: 32, rischio: 10 },
];

const yearlyData = [
  { name: "Q1", revenue: 120, investimenti: 80 },
  { name: "Q2", revenue: 145, investimenti: 95 },
  { name: "Q3", revenue: 180, investimenti: 110 },
  { name: "Q4", revenue: 220, investimenti: 130 },
];

const PredictionsSection = () => {
  const [period, setPeriod] = useState("weekly");

  return (
    <section className="bg-gradient-card rounded-2xl border border-border/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Scenari Futuri</h2>
          <p className="text-sm text-muted-foreground">Previsioni basate su AI e dati di mercato</p>
        </div>
      </div>

      <Tabs defaultValue="weekly" onValueChange={setPeriod}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="weekly">Settimanale</TabsTrigger>
          <TabsTrigger value="monthly">Mensile</TabsTrigger>
          <TabsTrigger value="yearly">Annuale</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorMercato" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(173, 80%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(173, 80%, 50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOpportunita" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(38, 92%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(38, 92%, 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
              <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(222, 47%, 8%)", 
                  border: "1px solid hsl(222, 30%, 18%)",
                  borderRadius: "8px"
                }}
              />
              <Area type="monotone" dataKey="mercato" stroke="hsl(173, 80%, 50%)" fillOpacity={1} fill="url(#colorMercato)" />
              <Area type="monotone" dataKey="opportunita" stroke="hsl(38, 92%, 60%)" fillOpacity={1} fill="url(#colorOpportunita)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Trend Mercato</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">Opportunità</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
              <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(222, 47%, 8%)", 
                  border: "1px solid hsl(222, 30%, 18%)",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="crescita" fill="hsl(173, 80%, 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="rischio" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Crescita Stimata</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-sm text-muted-foreground">Rischio</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="yearly" className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={yearlyData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(173, 80%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(173, 80%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
              <XAxis dataKey="name" stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(222, 47%, 8%)", 
                  border: "1px solid hsl(222, 30%, 18%)",
                  borderRadius: "8px"
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(173, 80%, 50%)" fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="investimenti" stroke="hsl(38, 92%, 60%)" fillOpacity={0.5} fill="url(#colorOpportunita)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Revenue Previsto (K€)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">Investimenti (K€)</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default PredictionsSection;
