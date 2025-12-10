-- =============================================
-- SECURITY FIX: Complete RLS and Roles Migration
-- =============================================

-- 1. Create app_role enum
CREATE TYPE public.app_role AS ENUM ('user', 'admin', 'moderator');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- 3. Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Create has_role SECURITY DEFINER function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 5. Create get_user_company_id SECURITY DEFINER function
CREATE OR REPLACE FUNCTION public.get_user_company_id(_user_id UUID)
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT company_id
  FROM public.profiles
  WHERE id = _user_id
$$;

-- 6. RLS policies for user_roles (only admins can manage, users can read their own)
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can insert roles"
ON public.user_roles FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update roles"
ON public.user_roles FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- 7. Migrate existing roles from profiles to user_roles (if any exist)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'user'::app_role
FROM public.profiles
WHERE id IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- 8. Remove role column from profiles (after migration)
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;

-- =============================================
-- UPDATE RLS POLICIES FOR SENSITIVE TABLES
-- =============================================

-- 9. Fix profiles table policies - remove old ones first
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Recreate secure profiles policies
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- 10. Fix predictions table policies
DROP POLICY IF EXISTS "Anyone can read predictions" ON public.predictions;

CREATE POLICY "Users can read own company predictions"
ON public.predictions FOR SELECT
USING (
  company_id = public.get_user_company_id(auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Users can insert own company predictions"
ON public.predictions FOR INSERT
WITH CHECK (
  company_id = public.get_user_company_id(auth.uid())
);

-- 11. Fix recommended_tenders table policies
DROP POLICY IF EXISTS "Anyone can read recommended_tenders" ON public.recommended_tenders;

CREATE POLICY "Users can read own company tenders"
ON public.recommended_tenders FOR SELECT
USING (
  company_id = public.get_user_company_id(auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Users can insert own company tenders"
ON public.recommended_tenders FOR INSERT
WITH CHECK (
  company_id = public.get_user_company_id(auth.uid())
);

-- 12. Fix tendermatch_preferences table policies
DROP POLICY IF EXISTS "Anyone can read tendermatch_preferences" ON public.tendermatch_preferences;
DROP POLICY IF EXISTS "Anyone can insert tendermatch_preferences" ON public.tendermatch_preferences;
DROP POLICY IF EXISTS "Anyone can update tendermatch_preferences" ON public.tendermatch_preferences;

CREATE POLICY "Users can read own company preferences"
ON public.tendermatch_preferences FOR SELECT
USING (
  company_id = public.get_user_company_id(auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Users can insert own company preferences"
ON public.tendermatch_preferences FOR INSERT
WITH CHECK (
  company_id = public.get_user_company_id(auth.uid())
);

CREATE POLICY "Users can update own company preferences"
ON public.tendermatch_preferences FOR UPDATE
USING (
  company_id = public.get_user_company_id(auth.uid())
);

-- 13. Fix company_partners table policies
DROP POLICY IF EXISTS "Anyone can read company_partners" ON public.company_partners;
DROP POLICY IF EXISTS "Anyone can insert company_partners" ON public.company_partners;
DROP POLICY IF EXISTS "Anyone can delete company_partners" ON public.company_partners;

CREATE POLICY "Users can read own company partners"
ON public.company_partners FOR SELECT
USING (
  company_id = public.get_user_company_id(auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Users can insert own company partners"
ON public.company_partners FOR INSERT
WITH CHECK (
  company_id = public.get_user_company_id(auth.uid())
);

CREATE POLICY "Users can update own company partners"
ON public.company_partners FOR UPDATE
USING (
  company_id = public.get_user_company_id(auth.uid())
);

CREATE POLICY "Users can delete own company partners"
ON public.company_partners FOR DELETE
USING (
  company_id = public.get_user_company_id(auth.uid())
);

-- 14. Fix companies table policies
DROP POLICY IF EXISTS "Anyone can read companies" ON public.companies;

CREATE POLICY "Users can read own company"
ON public.companies FOR SELECT
USING (
  id = public.get_user_company_id(auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Users can update own company"
ON public.companies FOR UPDATE
USING (
  id = public.get_user_company_id(auth.uid())
);

-- 15. Fix predictions_basic table policies (already auth required but let's ensure company-level)
DROP POLICY IF EXISTS "Authenticated users can read predictions_basic" ON public.predictions_basic;

CREATE POLICY "Users can read own company predictions_basic"
ON public.predictions_basic FOR SELECT
USING (
  company_id = public.get_user_company_id(auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

-- 16. Fix tenders_suggestions table policies
DROP POLICY IF EXISTS "Authenticated users can read tenders_suggestions" ON public.tenders_suggestions;

CREATE POLICY "Users can read own company tenders_suggestions"
ON public.tenders_suggestions FOR SELECT
USING (
  company_id = public.get_user_company_id(auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

-- 17. Create trigger to assign default 'user' role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_role ON auth.users;
CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();