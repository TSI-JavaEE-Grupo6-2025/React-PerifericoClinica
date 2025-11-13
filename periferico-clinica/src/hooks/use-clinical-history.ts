import { useCallback, useRef, useState } from 'react'
import { ProfessionalDashboardAdapter } from '../adapters/Dashboard/professional/ProfessionalDashboardAdapter'
import { useAuthStore } from '../store/AuthStore'
import type { ClinicalHistoryResponse } from '../types/clinical-history'

interface ClinicalHistoryState {
  loading: boolean
  success: boolean
  error: string | null
  documents: ClinicalHistoryResponse[]
}

interface ClinicalHistoryActions {
  getClinicalHistoryPatient: (
    documentNumber: string,
    specialtyId: string
  ) => Promise<ClinicalHistoryResponse[]>
  clearError: () => void
  clearDocuments: () => void
  refetch: () => Promise<ClinicalHistoryResponse[] | void>
}

type UseClinicalHistoryReturn = ClinicalHistoryState & ClinicalHistoryActions

export const useClinicalHistory = (): UseClinicalHistoryReturn => {
  const { accessToken } = useAuthStore()

  const [state, setState] = useState<ClinicalHistoryState>({
    loading: false,
    success: false,
    error: null,
    documents: [],
  })

  const currentParamsRef = useRef<{
    documentNumber: string
    specialtyId: string
  } | null>(null)

  const setLoading = (loading: boolean) =>
    setState((prev) => ({ ...prev, loading }))
  const setSuccess = (success: boolean) =>
    setState((prev) => ({ ...prev, success }))
  const setError = (error: string | null) =>
    setState((prev) => ({ ...prev, error }))
  const setDocuments = (documents: ClinicalHistoryResponse[]) =>
    setState((prev) => ({ ...prev, documents }))

  const fetchHistory = useCallback(
    async (documentNumber: string, specialtyId: string) => {
      if (!accessToken) {
        const message = 'No hay token de acceso, por favor inicie sesión'
        setError(message)
        throw new Error(message)
      }

      setLoading(true)
      setError(null)
      setSuccess(false)

      try {
        currentParamsRef.current = { documentNumber, specialtyId }

        const response =
          await ProfessionalDashboardAdapter.getClinicHistoryPatient(
            documentNumber,
            specialtyId,
            accessToken
          )

        let documents: ClinicalHistoryResponse[] = [];
        
        if(Array.isArray(response)){
            documents = response;
        }else{
            documents = [response]
        }

        setDocuments(documents)
        setSuccess(true)

        return documents
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Error al obtener la historia clínica del paciente'

        setError(message)
        setSuccess(false)

        throw error instanceof Error ? error : new Error(message)
      } finally {
        setLoading(false)
      }
    },
    [accessToken]
  )

  const refetch = useCallback(async () => {
    if (!currentParamsRef.current) return
    const { documentNumber, specialtyId } = currentParamsRef.current
    return fetchHistory(documentNumber, specialtyId)
  }, [fetchHistory])

  const clearError = () => setError(null)

  const clearDocuments = () => {
    setDocuments([])
    setSuccess(false)
    setError(null)
    currentParamsRef.current = null
  }

  return {
    ...state,
    getClinicalHistoryPatient: fetchHistory,
    clearError,
    clearDocuments,
    refetch,
  }
}