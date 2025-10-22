import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useAuthStore} from '../../store/AuthStore';
import type { UserRole } from '../../types';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { token, isAuthenticated, user, hasRole } = useAuthStore();

  // Validación de autenticación global
  if (!token || !isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // Validación de rol específico
  if (requiredRole && !hasRole(requiredRole)) {
    // Redirigir según el rol del usuario actual
    switch (user?.role) {
      case 'ADMIN_CLINIC':
        return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
      case 'PROFESSIONAL':
        return <Navigate to={ROUTES.PROFESIONAL_DASHBOARD} replace />;
      default:
        return <Navigate to={ROUTES.HOME} replace />;
    }
  }

  // Acceso permitido
  return children ? <>{children}</> : <Outlet />;
};