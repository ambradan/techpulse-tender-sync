import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  id?: string;
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  className?: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
}

export const DashboardCard = ({
  id,
  title,
  subtitle,
  icon: Icon,
  className,
  children,
  headerAction,
}: DashboardCardProps) => {
  return (
    <Card id={id} className={cn("bg-gradient-card border-border/50", className)}>
      {(title || Icon) && (
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {Icon && (
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              )}
              <div>
                {title && <CardTitle className="text-lg">{title}</CardTitle>}
                {subtitle && (
                  <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
                )}
              </div>
            </div>
            {headerAction}
          </div>
        </CardHeader>
      )}
      <CardContent className={title ? "" : "pt-6"}>{children}</CardContent>
    </Card>
  );
};
