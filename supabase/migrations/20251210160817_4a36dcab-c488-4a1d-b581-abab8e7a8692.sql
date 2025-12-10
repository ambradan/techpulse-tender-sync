-- Fix: Add missing INSERT policy for predictions_basic
CREATE POLICY "Users can insert own company predictions_basic"
ON public.predictions_basic
FOR INSERT
TO authenticated
WITH CHECK (company_id = get_user_company_id(auth.uid()));

-- Fix: Add missing INSERT policy for tenders_suggestions
CREATE POLICY "Users can insert own company tenders_suggestions"
ON public.tenders_suggestions
FOR INSERT
TO authenticated
WITH CHECK (company_id = get_user_company_id(auth.uid()));

-- Fix: Add UPDATE policy for predictions
CREATE POLICY "Users can update own company predictions"
ON public.predictions
FOR UPDATE
TO authenticated
USING (company_id = get_user_company_id(auth.uid()));

-- Fix: Add DELETE policy for predictions
CREATE POLICY "Users can delete own company predictions"
ON public.predictions
FOR DELETE
TO authenticated
USING (company_id = get_user_company_id(auth.uid()));

-- Fix: Add UPDATE policy for recommended_tenders
CREATE POLICY "Users can update own company recommended_tenders"
ON public.recommended_tenders
FOR UPDATE
TO authenticated
USING (company_id = get_user_company_id(auth.uid()));

-- Fix: Add DELETE policy for recommended_tenders
CREATE POLICY "Users can delete own company recommended_tenders"
ON public.recommended_tenders
FOR DELETE
TO authenticated
USING (company_id = get_user_company_id(auth.uid()));

-- Fix: Add INSERT policy for companies (admins only)
CREATE POLICY "Only admins can insert companies"
ON public.companies
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Fix: Add DELETE policy for companies (admins only)
CREATE POLICY "Only admins can delete companies"
ON public.companies
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix: Add DELETE policy for profiles
CREATE POLICY "Users can delete own profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (auth.uid() = id);

-- Fix: Add DELETE policy for tendermatch_preferences
CREATE POLICY "Users can delete own company preferences"
ON public.tendermatch_preferences
FOR DELETE
TO authenticated
USING (company_id = get_user_company_id(auth.uid()));

-- Fix: Add UPDATE policy for tenders_suggestions
CREATE POLICY "Users can update own company tenders_suggestions"
ON public.tenders_suggestions
FOR UPDATE
TO authenticated
USING (company_id = get_user_company_id(auth.uid()));

-- Fix: Add DELETE policy for tenders_suggestions
CREATE POLICY "Users can delete own company tenders_suggestions"
ON public.tenders_suggestions
FOR DELETE
TO authenticated
USING (company_id = get_user_company_id(auth.uid()));

-- Fix: Add UPDATE policy for predictions_basic
CREATE POLICY "Users can update own company predictions_basic"
ON public.predictions_basic
FOR UPDATE
TO authenticated
USING (company_id = get_user_company_id(auth.uid()));

-- Fix: Add DELETE policy for predictions_basic
CREATE POLICY "Users can delete own company predictions_basic"
ON public.predictions_basic
FOR DELETE
TO authenticated
USING (company_id = get_user_company_id(auth.uid()));