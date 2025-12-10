
-- =============================================
-- TECHPULSE AI SUITE - SIMPLE ELEGANT STRUCTURE
-- =============================================

-- 1️⃣ ALTER COMPANIES TABLE - Add new columns
ALTER TABLE public.companies 
ADD COLUMN IF NOT EXISTS tecnologia_usata jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS automazione_livello text DEFAULT 'non_specificato',
ADD COLUMN IF NOT EXISTS modello_lavoro text DEFAULT 'non_specificato',
ADD COLUMN IF NOT EXISTS numero_team_tech integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS numero_team_nontech integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS completeness_score integer DEFAULT 0;

-- 2️⃣ CREATE HIRING TABLE
CREATE TABLE IF NOT EXISTS public.hiring (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  ruoli_prioritari jsonb DEFAULT '[]'::jsonb,
  competenze_critiche jsonb DEFAULT '[]'::jsonb,
  update_auto boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id)
);

ALTER TABLE public.hiring ENABLE ROW LEVEL SECURITY;

-- 3️⃣ CREATE RISK TABLE
CREATE TABLE IF NOT EXISTS public.risk (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  normative_rilevanti jsonb DEFAULT '[]'::jsonb,
  rischio_operativo text DEFAULT 'non_valutato',
  rischio_ai_act text DEFAULT 'non_valutato',
  livello_rischio text DEFAULT 'non_valutato',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id)
);

ALTER TABLE public.risk ENABLE ROW LEVEL SECURITY;

-- 4️⃣ CREATE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.company_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  lingua text DEFAULT 'it',
  dashboard_focus text DEFAULT 'generale',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id)
);

ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;

-- 5️⃣ SECURITY DEFINER FUNCTION TO GET COMPANY BY USER
CREATE OR REPLACE FUNCTION public.get_company_id_by_user(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.companies WHERE user_id = _user_id LIMIT 1
$$;

-- 6️⃣ RLS POLICIES FOR HIRING
CREATE POLICY "Users can read own hiring" ON public.hiring
FOR SELECT USING (company_id = get_company_id_by_user(auth.uid()));

CREATE POLICY "Users can insert own hiring" ON public.hiring
FOR INSERT WITH CHECK (company_id = get_company_id_by_user(auth.uid()));

CREATE POLICY "Users can update own hiring" ON public.hiring
FOR UPDATE USING (company_id = get_company_id_by_user(auth.uid()));

-- 7️⃣ RLS POLICIES FOR RISK
CREATE POLICY "Users can read own risk" ON public.risk
FOR SELECT USING (company_id = get_company_id_by_user(auth.uid()));

CREATE POLICY "Users can insert own risk" ON public.risk
FOR INSERT WITH CHECK (company_id = get_company_id_by_user(auth.uid()));

CREATE POLICY "Users can update own risk" ON public.risk
FOR UPDATE USING (company_id = get_company_id_by_user(auth.uid()));

-- 8️⃣ RLS POLICIES FOR COMPANY_SETTINGS
CREATE POLICY "Users can read own settings" ON public.company_settings
FOR SELECT USING (company_id = get_company_id_by_user(auth.uid()));

CREATE POLICY "Users can insert own settings" ON public.company_settings
FOR INSERT WITH CHECK (company_id = get_company_id_by_user(auth.uid()));

CREATE POLICY "Users can update own settings" ON public.company_settings
FOR UPDATE USING (company_id = get_company_id_by_user(auth.uid()));

-- 9️⃣ GRANTS
GRANT SELECT, INSERT, UPDATE ON public.hiring TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.risk TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.company_settings TO authenticated;

-- 🔟 SYNC FUNCTION - Calculate completeness and sync related tables
CREATE OR REPLACE FUNCTION public.sync_company_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  score integer := 0;
BEGIN
  -- Calculate completeness score based on filled fields
  IF NEW.name IS NOT NULL AND NEW.name <> '' THEN score := score + 15; END IF;
  IF NEW.sector IS NOT NULL AND NEW.sector <> '' THEN score := score + 15; END IF;
  IF NEW.location IS NOT NULL AND NEW.location <> '' THEN score := score + 10; END IF;
  IF NEW.employees IS NOT NULL AND NEW.employees > 0 THEN score := score + 10; END IF;
  IF NEW.description IS NOT NULL AND NEW.description <> '' THEN score := score + 10; END IF;
  IF NEW.tecnologia_usata IS NOT NULL AND jsonb_array_length(NEW.tecnologia_usata) > 0 THEN score := score + 10; END IF;
  IF NEW.automazione_livello IS NOT NULL AND NEW.automazione_livello <> 'non_specificato' THEN score := score + 10; END IF;
  IF NEW.modello_lavoro IS NOT NULL AND NEW.modello_lavoro <> 'non_specificato' THEN score := score + 10; END IF;
  IF NEW.numero_team_tech IS NOT NULL AND NEW.numero_team_tech > 0 THEN score := score + 5; END IF;
  IF NEW.numero_team_nontech IS NOT NULL AND NEW.numero_team_nontech > 0 THEN score := score + 5; END IF;

  NEW.completeness_score := score;
  NEW.updated_at := now();

  -- Ensure hiring record exists
  INSERT INTO public.hiring (company_id)
  VALUES (NEW.id)
  ON CONFLICT (company_id) DO UPDATE SET updated_at = now();

  -- Ensure risk record exists
  INSERT INTO public.risk (company_id)
  VALUES (NEW.id)
  ON CONFLICT (company_id) DO UPDATE SET updated_at = now();

  -- Ensure settings record exists
  INSERT INTO public.company_settings (company_id)
  VALUES (NEW.id)
  ON CONFLICT (company_id) DO UPDATE SET updated_at = now();

  RETURN NEW;
END;
$$;

-- 1️⃣1️⃣ TRIGGER FOR SYNC
DROP TRIGGER IF EXISTS trigger_sync_company_profile ON public.companies;
CREATE TRIGGER trigger_sync_company_profile
BEFORE INSERT OR UPDATE ON public.companies
FOR EACH ROW
EXECUTE FUNCTION public.sync_company_profile();
