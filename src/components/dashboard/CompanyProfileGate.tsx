import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

interface CompanyProfileGateProps {
  message?: string;
}

const CompanyProfileGate = ({ 
  message = "Configura il profilo aziendale per abilitare questa sezione" 
}: CompanyProfileGateProps) => {
  return (
    <Card className="border-dashed border-2">
      <CardContent className="flex flex-col items-center justify-center py-12 px-6">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Building2 className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-center mb-4 max-w-md">
          {message}
        </p>
        <Button asChild>
          <Link to="/profile">
            <Building2 className="mr-2 h-4 w-4" />
            Configura Profilo Azienda
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompanyProfileGate;
