-- Fix: Add admin-only INSERT, UPDATE, DELETE policies for partners, partner_services, market_trends, market_news

-- ==================== PARTNERS TABLE ====================
-- Only admins can insert partners
CREATE POLICY "Only admins can insert partners"
ON public.partners
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update partners
CREATE POLICY "Only admins can update partners"
ON public.partners
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete partners
CREATE POLICY "Only admins can delete partners"
ON public.partners
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- ==================== PARTNER_SERVICES TABLE ====================
-- Only admins can insert partner_services
CREATE POLICY "Only admins can insert partner_services"
ON public.partner_services
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update partner_services
CREATE POLICY "Only admins can update partner_services"
ON public.partner_services
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete partner_services
CREATE POLICY "Only admins can delete partner_services"
ON public.partner_services
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- ==================== MARKET_TRENDS TABLE ====================
-- Only admins can insert market_trends
CREATE POLICY "Only admins can insert market_trends"
ON public.market_trends
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update market_trends
CREATE POLICY "Only admins can update market_trends"
ON public.market_trends
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete market_trends
CREATE POLICY "Only admins can delete market_trends"
ON public.market_trends
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- ==================== MARKET_NEWS TABLE ====================
-- Only admins can insert market_news
CREATE POLICY "Only admins can insert market_news"
ON public.market_news
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update market_news
CREATE POLICY "Only admins can update market_news"
ON public.market_news
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete market_news
CREATE POLICY "Only admins can delete market_news"
ON public.market_news
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));