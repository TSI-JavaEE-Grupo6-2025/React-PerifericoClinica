import type React from "react"

import { Navigate, Outlet } from "react-router-dom"
import { ROUTES } from "../constants/routes"
import { useAuthStore } from "../../store/AuthStore"
import type { UserRole } from "../../types"
import { UnauthorizedPage } from "../../pages"

interface ProtectedRouteProps {
  children?: React.ReactNode
  requiredRole?: UserRole
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { accessToken, isAuthenticated, hasRole } = useAuthStore()

  // Validación de autenticación global
  if (!accessToken || !isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <UnauthorizedPage />
  }

  // Acceso permitido
  return children ? <>{children}</> : <Outlet />
}
