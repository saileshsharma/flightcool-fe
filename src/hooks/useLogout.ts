import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface UseLogoutOptions {
  redirectTo?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface UseLogoutReturn {
  logout: () => Promise<void>;
  isLoggingOut: boolean;
  error: Error | null;
}

/**
 * Custom hook for handling logout with loading state and error handling
 */
export function useLogout(options: UseLogoutOptions = {}): UseLogoutReturn {
  const { redirectTo = '/login', onSuccess, onError } = options;
  const { logout: authLogout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const logout = useCallback(async () => {
    setIsLoggingOut(true);
    setError(null);

    try {
      await authLogout();
      onSuccess?.();
      navigate(redirectTo);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Logout failed');
      setError(error);
      onError?.(error);
    } finally {
      setIsLoggingOut(false);
    }
  }, [authLogout, navigate, redirectTo, onSuccess, onError]);

  return { logout, isLoggingOut, error };
}
