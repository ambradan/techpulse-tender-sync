-- Add DELETE policy on companies table
-- Owner can delete their own company, or admin can delete any company
CREATE POLICY "Users can delete own company or admin can delete any"
ON public.companies
FOR DELETE
USING (
  auth.uid() = user_id 
  OR has_role(auth.uid(), 'admin'::app_role)
);