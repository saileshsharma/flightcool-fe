import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { LogoutConfirmModal } from './LogoutConfirmModal';

interface LogoutButtonProps {
  showConfirmation?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onLogoutSuccess?: () => void;
  redirectTo?: string;
}

export function LogoutButton({
  showConfirmation = true,
  variant = 'ghost',
  size = 'md',
  className = '',
  onLogoutSuccess,
  redirectTo = '/login',
}: LogoutButtonProps) {
  const { logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = () => {
    if (showConfirmation) {
      setShowModal(true);
    } else {
      performLogout();
    }
  };

  const performLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      onLogoutSuccess?.();
      navigate(redirectTo);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleLogoutClick}
        isLoading={isLoading || isLoggingOut}
        className={className}
        aria-label="Log out"
      >
        <LogoutIcon />
        <span>Logout</span>
      </Button>

      {showConfirmation && (
        <LogoutConfirmModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={performLogout}
          isLoading={isLoggingOut}
        />
      )}
    </>
  );
}

function LogoutIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
}
