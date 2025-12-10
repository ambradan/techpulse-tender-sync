-- Fix: Remove public access policies and require authentication for sensitive tables

-- 1. DROP public policies on partners table
DROP POLICY IF EXISTS "Anyone can read partners" ON public.partners;

-- Create authenticated-only read policy for partners
CREATE POLICY "Authenticated users can read partners"
ON public.partners
FOR SELECT
TO authenticated
USING (true);

-- 2. DROP public policies on partner_services table
DROP POLICY IF EXISTS "Anyone can read partner_services" ON public.partner_services;

-- Create authenticated-only read policy for partner_services
CREATE POLICY "Authenticated users can read partner_services"
ON public.partner_services
FOR SELECT
TO authenticated
USING (true);

-- 3. DROP public policies on market_trends table
DROP POLICY IF EXISTS "Anyone can read market_trends" ON public.market_trends;

-- Create authenticated-only read policy for market_trends
CREATE POLICY "Authenticated users can read market_trends"
ON public.market_trends
FOR SELECT
TO authenticated
USING (true);

-- 4. DROP public policies on market_news table
DROP POLICY IF EXISTS "Anyone can read market_news" ON public.market_news;

-- Create authenticated-only read policy for market_news
CREATE POLICY "Authenticated users can read market_news"
ON public.market_news
FOR SELECT
TO authenticated
USING (true);