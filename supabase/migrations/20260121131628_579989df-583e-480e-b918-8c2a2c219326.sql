-- Add profile_type and persona-specific fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS profile_type text DEFAULT 'azienda' CHECK (profile_type IN ('azienda', 'privato', 'freelance'));

-- Fields for Privato (individual career seeker)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS ruolo_attuale text,
ADD COLUMN IF NOT EXISTS esperienza_anni integer,
ADD COLUMN IF NOT EXISTS competenze jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS ruolo_target text,
ADD COLUMN IF NOT EXISTS settore_interesse text;

-- Fields for Freelance
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS servizi_offerti jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS tariffa_oraria numeric,
ADD COLUMN IF NOT EXISTS nicchia text,
ADD COLUMN IF NOT EXISTS anni_freelance integer,
ADD COLUMN IF NOT EXISTS clienti_tipo jsonb DEFAULT '[]'::jsonb;

-- Create a table for section-specific user inputs (notes + structured data per section)
CREATE TABLE IF NOT EXISTS public.section_inputs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  section_key text NOT NULL, -- e.g. 'aziende_trend', 'privati_roadmap', 'freelance_pricing'
  notes text, -- free text notes
  structured_data jsonb DEFAULT '{}'::jsonb, -- structured fields per section
  ai_analysis text, -- AI-generated analysis
  ai_analyzed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, section_key)
);

-- Enable RLS
ALTER TABLE public.section_inputs ENABLE ROW LEVEL SECURITY;

-- RLS policies for section_inputs
CREATE POLICY "Users can read own section inputs"
ON public.section_inputs FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own section inputs"
ON public.section_inputs FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own section inputs"
ON public.section_inputs FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own section inputs"
ON public.section_inputs FOR DELETE
USING (auth.uid() = user_id);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.section_inputs TO authenticated;

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_section_inputs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_section_inputs_updated_at
BEFORE UPDATE ON public.section_inputs
FOR EACH ROW
EXECUTE FUNCTION public.update_section_inputs_updated_at();