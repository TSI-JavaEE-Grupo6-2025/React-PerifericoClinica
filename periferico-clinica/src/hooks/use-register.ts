//src/hooks/use-register.ts
import { useState } from "react"
import { AdminDashboardAdapter } from "../adapters/Dashboard/Admin/AdminDashboardAdapter"
import type { AdminUserRequest, HealthProfessionalRequest, HealthUserRequest } from "../types/User"
import { useAuthStore } from "../store/AuthStore"



type RegisterAction = "health-user" | "health-professional" | "admin-user"

interface UseRegisterOptions {
  action: RegisterAction
  onSuccess?: () => void
  onError?: (error: Error) => void
}

interface UseRegisterReturn {
  register: (data: HealthProfessionalRequest) => Promise<void>
  loading: boolean
  error: string | null
  success: boolean
}

type RegisterData = HealthProfessionalRequest | HealthUserRequest | AdminUserRequest;
/**
 * Hook flexible para registro de diferentes tipos de usuarios
 *
 * @param options - Configuración del hook
 * @param options.action - Tipo de registro a realizar
 * @param options.onSuccess - Callback ejecutado al completar exitosamente
 * @param options.onError - Callback ejecutado en caso de error
 *
 * @example
 * ```typescript
 * const { register, loading, error } = useRegister({
 *   action: 'health-professional',
 *   onSuccess: () => console.log('Profesional registrado'),
 * });
 *
 * await register(professionalData);
 * ```
 */
export const useRegister = ({ action, onSuccess, onError }: UseRegisterOptions): UseRegisterReturn => {
  const { accessToken } = useAuthStore();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const register = async (data: RegisterData) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      switch (action) {
        case "health-professional":
          await AdminDashboardAdapter.createHealthProfessional(data as HealthProfessionalRequest, accessToken || '');
          break
        case "health-user":
          console.log('Registro de usuario de salud No implementado aún.');
          break;
        case "admin-user":
          console.log('Registro de usuario administrador No implementado aún.');
          break;
        default:
          throw new Error(`Acción de registro no válida: ${action}`)
      }

      setSuccess(true)
      onSuccess?.()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al registrar usuario"
      setError(errorMessage)
      onError?.(err instanceof Error ? err : new Error(errorMessage))
    } finally {
      setLoading(false)
    }
  }

  return { register, loading, error, success }
}
