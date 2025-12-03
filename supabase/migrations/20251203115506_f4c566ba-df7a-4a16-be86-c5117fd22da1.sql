-- Add TenderMatch preferences table
CREATE TABLE IF NOT EXISTS public.tendermatch_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  is_connected BOOLEAN DEFAULT true,
  notify_email BOOLEAN DEFAULT true,
  notify_in_app BOOLEAN DEFAULT true,
  min_match_score INTEGER DEFAULT 70,
  preferred_categories TEXT[],
  max_value DECIMAL(12,2),
  min_value DECIMAL(12,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(company_id)
);

ALTER TABLE public.tendermatch_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read tendermatch_preferences" ON public.tendermatch_preferences FOR SELECT USING (true);
CREATE POLICY "Anyone can insert tendermatch_preferences" ON public.tendermatch_preferences FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update tendermatch_preferences" ON public.tendermatch_preferences FOR UPDATE USING (true);

-- Add more tender data
INSERT INTO public.recommended_tenders (title, value, deadline, match_score, category) VALUES
('Sviluppo portale e-government regionale', 450000, '2025-03-10', 91, 'Software'),
('Manutenzione sistemi informatici ASL', 85000, '2025-02-18', 79, 'Manutenzione'),
('Fornitura licenze software PA', 320000, '2025-03-25', 86, 'Licenze'),
('Consulenza trasformazione digitale', 150000, '2025-02-28', 93, 'Consulenza'),
('Implementazione SPID per comune', 75000, '2025-03-05', 88, 'Identità Digitale')
ON CONFLICT DO NOTHING;

-- Insert default TenderMatch preferences for demo company
INSERT INTO public.tendermatch_preferences (company_id, is_connected, notify_email, notify_in_app, min_match_score, preferred_categories)
SELECT id, true, true, true, 70, ARRAY['Software', 'Consulenza', 'Infrastruttura']
FROM public.companies
WHERE name = 'TechCorp Italia'
ON CONFLICT DO NOTHING;