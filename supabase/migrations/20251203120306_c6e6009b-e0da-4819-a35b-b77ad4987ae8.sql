-- Create profiles table for user data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  full_name TEXT,
  role TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add location column to companies if not exists
ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS location TEXT;

-- Create market_news table
CREATE TABLE IF NOT EXISTS public.market_news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  source TEXT,
  category TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create predictions_basic table
CREATE TABLE IF NOT EXISTS public.predictions_basic (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  prediction_type TEXT NOT NULL,
  ai_output TEXT,
  confidence NUMERIC,
  period TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create partner_services table
CREATE TABLE IF NOT EXISTS public.partner_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tenders_suggestions table
CREATE TABLE IF NOT EXISTS public.tenders_suggestions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  tender_title TEXT NOT NULL,
  ai_suggestion TEXT,
  match_score INTEGER,
  deadline DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictions_basic ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenders_suggestions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for market_news (public read)
CREATE POLICY "Anyone can read market_news" ON public.market_news FOR SELECT USING (true);

-- RLS Policies for predictions_basic (authenticated read)
CREATE POLICY "Authenticated users can read predictions_basic" ON public.predictions_basic FOR SELECT USING (auth.role() = 'authenticated');

-- RLS Policies for partner_services (public read)
CREATE POLICY "Anyone can read partner_services" ON public.partner_services FOR SELECT USING (true);

-- RLS Policies for tenders_suggestions (authenticated read)
CREATE POLICY "Authenticated users can read tenders_suggestions" ON public.tenders_suggestions FOR SELECT USING (auth.role() = 'authenticated');

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- Trigger for auto-creating profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();