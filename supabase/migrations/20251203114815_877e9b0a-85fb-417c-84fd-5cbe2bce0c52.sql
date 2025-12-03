-- Add more fields to partners table for welfare features
ALTER TABLE public.partners 
ADD COLUMN IF NOT EXISTS pricing_type TEXT DEFAULT 'contact',
ADD COLUMN IF NOT EXISTS price_per_employee DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS min_employees INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS benefits TEXT[],
ADD COLUMN IF NOT EXISTS rating DECIMAL(2,1) DEFAULT 4.0,
ADD COLUMN IF NOT EXISTS website_url TEXT;

-- Update existing partners with welfare data
UPDATE public.partners SET 
  pricing_type = 'per_employee',
  price_per_employee = 15.00,
  min_employees = 10,
  benefits = ARRAY['Buoni pasto digitali', 'Rimborsi trasporto', 'Voucher shopping', 'Previdenza complementare'],
  rating = 4.5,
  website_url = 'https://welfaretech.it'
WHERE name = 'WelfareTech';

UPDATE public.partners SET 
  pricing_type = 'per_employee',
  price_per_employee = 25.00,
  min_employees = 5,
  benefits = ARRAY['Assicurazione sanitaria', 'Visite specialistiche', 'Copertura familiari', 'Telemedicina'],
  rating = 4.7,
  website_url = 'https://healthplus.it'
WHERE name = 'HealthPlus';

UPDATE public.partners SET 
  pricing_type = 'per_employee',
  price_per_employee = 20.00,
  min_employees = 1,
  benefits = ARRAY['Corsi online illimitati', 'Certificazioni professionali', 'Coaching 1:1', 'Webinar esclusivi'],
  rating = 4.3,
  website_url = 'https://formapro.it'
WHERE name = 'FormaPro';

-- Insert additional welfare partners
INSERT INTO public.partners (name, category, description, pricing_type, price_per_employee, min_employees, benefits, rating, website_url, is_active) VALUES
('FlexBenefit', 'Flexible Benefit', 'Piattaforma completa di flexible benefit con wallet digitale per dipendenti', 'per_employee', 12.00, 20, ARRAY['Wallet digitale', 'Buoni acquisto', 'Rimborsi spese', 'Gift card multi-brand'], 4.4, 'https://flexbenefit.it', true),
('MindCare', 'Corporate Wellbeing', 'Programmi di benessere mentale e supporto psicologico per aziende', 'flat', 500.00, 10, ARRAY['Supporto psicologico', 'Mindfulness aziendale', 'Gestione stress', 'Work-life balance'], 4.6, 'https://mindcare.it', true),
('GymPass Pro', 'Fitness & Sport', 'Accesso a palestre e centri sportivi convenzionati in tutta Italia', 'per_employee', 18.00, 5, ARRAY['Accesso palestre', 'Corsi fitness', 'Personal trainer', 'App wellness'], 4.2, 'https://gympasspro.it', true),
('TravelPlus', 'Viaggi & Tempo Libero', 'Sconti e convenzioni per viaggi e tempo libero dei dipendenti', 'per_employee', 8.00, 1, ARRAY['Sconti hotel', 'Pacchetti vacanze', 'Esperienze', 'Cinema e teatro'], 4.1, 'https://travelplus.it', true)
ON CONFLICT DO NOTHING;

-- Create table to track company-partner selections
CREATE TABLE IF NOT EXISTS public.company_partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
  selected_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  plan_type TEXT,
  monthly_cost DECIMAL(10,2),
  UNIQUE(company_id, partner_id)
);

ALTER TABLE public.company_partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read company_partners" ON public.company_partners FOR SELECT USING (true);
CREATE POLICY "Anyone can insert company_partners" ON public.company_partners FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete company_partners" ON public.company_partners FOR DELETE USING (true);