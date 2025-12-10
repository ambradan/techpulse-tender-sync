import { Building2, Users, MapPin, Briefcase } from "lucide-react";
import { CompanyProfile } from "@/hooks/useCompanyProfile";

interface CompanyContextBannerProps {
  company: CompanyProfile;
  partnerCount?: number;
  compact?: boolean;
}

const CompanyContextBanner = ({ company, partnerCount, compact = false }: CompanyContextBannerProps) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 flex-wrap">
        <span className="font-medium text-foreground">{company.name}</span>
        <span className="text-border">·</span>
        <span>Settore: {company.sector}</span>
        {company.location && (
          <>
            <span className="text-border">·</span>
            <span>Paese: {company.location}</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-4 p-3 rounded-lg bg-secondary/30 border border-border/50 mb-6">
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4 text-primary" />
        <span className="font-medium">{company.name}</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Briefcase className="h-4 w-4" />
        <span>{company.sector}</span>
      </div>
      {company.employees && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{company.employees} dipendenti</span>
        </div>
      )}
      {company.location && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{company.location}</span>
        </div>
      )}
      {partnerCount !== undefined && partnerCount > 0 && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span>{partnerCount} partner attivi</span>
        </div>
      )}
    </div>
  );
};

export default CompanyContextBanner;
