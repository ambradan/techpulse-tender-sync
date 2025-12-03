-- Create companies table
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sector TEXT NOT NULL,
  employees INTEGER,
  founded_year INTEGER,
  description TEXT,
  context TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create partners table
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create market_trends table
CREATE TABLE IF NOT EXISTS public.market_trends (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  impact_score INTEGER DEFAULT 0,
  category TEXT NOT NULL,
  source TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create predictions table
CREATE TABLE IF NOT EXISTS public.predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id),
  period TEXT NOT NULL,
  prediction_type TEXT NOT NULL,
  data JSONB NOT NULL,
  confidence DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recommended_tenders table
CREATE TABLE IF NOT EXISTS public.recommended_tenders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id),
  title TEXT NOT NULL,
  value DECIMAL(12,2),
  deadline DATE,
  match_score INTEGER DEFAULT 0,
  category TEXT,
  source TEXT DEFAULT 'TenderMatch',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommended_tenders ENABLE ROW LEVEL SECURITY;

-- Create public read policies (drop if exists first)
DROP POLICY IF EXISTS "Anyone can read companies" ON public.companies;
DROP POLICY IF EXISTS "Anyone can read partners" ON public.partners;
DROP POLICY IF EXISTS "Anyone can read market_trends" ON public.market_trends;
DROP POLICY IF EXISTS "Anyone can read predictions" ON public.predictions;
DROP POLICY IF EXISTS "Anyone can read recommended_tenders" ON public.recommended_tenders;

CREATE POLICY "Anyone can read companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Anyone can read partners" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Anyone can read market_trends" ON public.market_trends FOR SELECT USING (true);
CREATE POLICY "Anyone can read predictions" ON public.predictions FOR SELECT USING (true);
CREATE POLICY "Anyone can read recommended_tenders" ON public.recommended_tenders FOR SELECT USING (true);

-- Insert demo data
INSERT INTO public.companies (name, sector, employees, founded_year, description, context)
VALUES ('TechCorp Italia', 'Software & IT Services', 85, 2015, 'Azienda specializzata in soluzioni software enterprise e consulenza IT', 'PMI innovativa con focus su trasformazione digitale per PA e aziende private')
ON CONFLICT DO NOTHING;

INSERT INTO public.partners (name, category, description) VALUES
('WelfareTech', 'Welfare Aziendale', 'Piattaforma completa di welfare per dipendenti'),
('HealthPlus', 'Salute', 'Assicurazione sanitaria integrativa'),
('FormaPro', 'Formazione', 'Corsi di aggiornamento professionale')
ON CONFLICT DO NOTHING;

INSERT INTO public.market_trends (title, summary, impact_score, category) VALUES
('Aumento investimenti PA in digitalizzazione', 'Il PNRR accelera la trasformazione digitale della Pubblica Amministrazione con +40% di budget allocato', 85, 'Normativa'),
('Nuova direttiva NIS2 sulla cybersecurity', 'Obbligo di compliance per tutte le aziende del settore tech entro ottobre 2024', 72, 'Compliance'),
('Crescita mercato cloud italiano +28%', 'Il mercato cloud in Italia supera i 5 miliardi, trainato da PMI e startup', 68, 'Mercato'),
('Riforma fiscale: incentivi R&S potenziati', 'Credito d''imposta R&S aumentato al 20% per spese fino a 4 milioni', 78, 'Fiscale')
ON CONFLICT DO NOTHING;

INSERT INTO public.recommended_tenders (title, value, deadline, match_score, category) VALUES
('Servizi IT per digitalizzazione PA', 250000, '2025-02-15', 95, 'Software'),
('Audit cybersecurity enti pubblici', 120000, '2025-02-22', 88, 'Sicurezza'),
('Cloud migration per ASL', 180000, '2025-02-28', 82, 'Infrastruttura')
ON CONFLICT DO NOTHING;