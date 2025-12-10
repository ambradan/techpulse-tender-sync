-- Grant permissions on companies table to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.companies TO authenticated;

-- Also grant usage on the sequence if it exists
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;