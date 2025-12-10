-- Drop the restrictive admin-only INSERT policy
DROP POLICY IF EXISTS "Only admins can insert companies" ON public.companies;

-- Create new INSERT policy that allows authenticated users to create a company
CREATE POLICY "Users can insert companies" 
ON public.companies 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Drop the restrictive admin-only DELETE policy
DROP POLICY IF EXISTS "Only admins can delete companies" ON public.companies;

-- Create new DELETE policy that allows users to delete their own company
CREATE POLICY "Users can delete own company" 
ON public.companies 
FOR DELETE 
TO authenticated
USING (id = get_user_company_id(auth.uid()));