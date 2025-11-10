import { useCallback, useEffect, useState } from "react"
import { ProfessionalDashboardAdapter } from "../../adapters/Dashboard"
import { useAuthStore } from "../../store/AuthStore"
import { useProfessionalSpecialtyStore } from "../../store/useProfessionalSpecialtyStore"
import type { ProfessionalInfoResponse } from "../../types/User"
import type { SpecialityState } from "../../types/Specialty"

interface UseProfessionalSpecialtyProps {
  onSuccess?: (response: ProfessionalInfoResponse) => void
  onError?: (error: string) => void
  autoFetch?: boolean
}

interface UseProfessionalSpecialtyReturn {
  loading: boolean
  error: string | null
  specialties: SpecialityState | null
  refetch: () => Promise<SpecialityState>
}

export const useProfessionalSpecialty = ({
  onSuccess,
  onError,
  autoFetch = true,
}: UseProfessionalSpecialtyProps = {}): UseProfessionalSpecialtyReturn => {
  const { accessToken } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [specialties, setSpecialtiesState] = useState<SpecialityState | null>(null)

  const { setSpecialties, getSpecialties } = useProfessionalSpecialtyStore()

  const fetchSpecialties = useCallback(async (): Promise<SpecialityState> => {
    try {
      if (!accessToken) throw new Error("No hay token de acceso")
  
      const cached = getSpecialties()
      if (cached) {
        setSpecialtiesState(cached)
        return cached
      }

      setLoading(true)
      setError(null)

      const profile = await ProfessionalDashboardAdapter.getProfessionalInfo(accessToken)
      onSuccess?.(profile)

      const response: SpecialityState = profile.specialties
      setSpecialties(response)       // guarda en store
      setSpecialtiesState(response)  // guarda en hook

      return response
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al obtener las especialidades del profesional"
      setError(message)
      onError?.(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [accessToken, getSpecialties, setSpecialties, onSuccess, onError])

  useEffect(() => {
    if (autoFetch) void fetchSpecialties()
  }, [autoFetch, fetchSpecialties])

  return {
    loading,
    error,
    specialties,
    refetch: fetchSpecialties,
  }
}