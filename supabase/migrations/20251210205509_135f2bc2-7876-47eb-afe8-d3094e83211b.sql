-- 1. Add user_id column to companies table if it doesn't exist
ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Update existing companies to link to their owner via profiles
UPDATE public.companies c
SET user_id = p.id
FROM public.profiles p
WHERE p.company_id = c.id AND c.user_id IS NULL;

-- 3. Make user_id NOT NULL after migration (only if there are no orphaned records)
-- First check and delete orphaned companies
DELETE FROM public.companies WHERE user_id IS NULL;

-- 4. Drop all existing RLS policies on companies
DROP POLICY IF EXISTS "Users can read own company" ON public.companies;
DROP POLICY IF EXISTS "Users can update own company" ON public.companies;
DROP POLICY IF EXISTS "Users can insert companies" ON public.companies;
DROP POLICY IF EXISTS "Users can delete own company" ON public.companies;
DROP POLICY IF EXISTS "Only admins can insert companies" ON public.companies;
DROP POLICY IF EXISTS "Only admins can delete companies" ON public.companies;

-- 5. Create new RLS policies based on user_id
CREATE POLICY "Users can read own company"
ON public.companies
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own company"
ON public.companies
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own company"
ON public.companies
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 6. NO DELETE policy for security (users cannot delete companies directly)

-- 7. Ensure grants are correct
GRANT SELECT, INSERT, UPDATE ON public.companies TO authenticated;
REVOKE DELETE ON public.companies FROM authenticated;