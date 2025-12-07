import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  priority?: 'alta' | 'media' | 'bassa';
}

export const ActionCard = ({ icon: Icon, title, description, priority }: ActionCardProps) => {
  const priorityStyles = {
    alta: 'bg-red-500/10 text-red-500',
    media: 'bg-yellow-500/10 text-yellow-500',
    bassa: 'bg-green-500/10 text-green-500',
  };

  return (
    <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-all">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          {priority && (
            <span className={`text-xs font-medium px-2 py-1 rounded ${priorityStyles[priority]}`}>
              Priorità {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
          )}
        </div>
        <h4 className="font-display font-semibold text-foreground mb-1">{title}</h4>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : (
          <p className="text-sm text-muted-foreground italic">In attesa dei dati...</p>
        )}
      </CardContent>
    </Card>
  );
};
