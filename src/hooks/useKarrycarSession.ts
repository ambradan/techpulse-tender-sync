import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const KARRYCAR_SESSION_KEY = "karrycar_session";
const KARRYCAR_EXPIRES_KEY = "karrycar_expires";

interface KarrycarSession {
  token: string;
  expiresAt: number;
}

interface UseKarrycarSessionReturn {
  isKarrycarAuthenticated: boolean;
  isLoading: boolean;
  validateCode: (code: string) => Promise<{ success: boolean; error?: string }>;
  clearSession: () => void;
}

export const useKarrycarSession = (): UseKarrycarSessionReturn => {
  const [isKarrycarAuthenticated, setIsKarrycarAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing valid session on mount
  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem(KARRYCAR_SESSION_KEY);
      const expiresAt = localStorage.getItem(KARRYCAR_EXPIRES_KEY);
      
      if (token && expiresAt) {
        const expiry = parseInt(expiresAt, 10);
        if (Date.now() < expiry) {
          setIsKarrycarAuthenticated(true);
        } else {
          // Session expired, clear it
          localStorage.removeItem(KARRYCAR_SESSION_KEY);
          localStorage.removeItem(KARRYCAR_EXPIRES_KEY);
          setIsKarrycarAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const validateCode = useCallback(async (code: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.functions.invoke('validate-karrycar-code', {
        body: { code }
      });

      if (error) {
        console.error('Validation error:', error);
        return { success: false, error: 'Errore durante la validazione' };
      }

      if (data?.valid && data?.sessionToken) {
        // Store session
        localStorage.setItem(KARRYCAR_SESSION_KEY, data.sessionToken);
        localStorage.setItem(KARRYCAR_EXPIRES_KEY, data.expiresAt.toString());
        setIsKarrycarAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: data?.error || 'Codice non valido' };
      }
    } catch (err) {
      console.error('Validation exception:', err);
      return { success: false, error: 'Errore di connessione' };
    }
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(KARRYCAR_SESSION_KEY);
    localStorage.removeItem(KARRYCAR_EXPIRES_KEY);
    setIsKarrycarAuthenticated(false);
  }, []);

  return {
    isKarrycarAuthenticated,
    isLoading,
    validateCode,
    clearSession
  };
};
