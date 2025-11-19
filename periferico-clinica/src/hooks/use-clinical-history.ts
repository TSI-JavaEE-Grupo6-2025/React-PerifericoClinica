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
    documentNumber: number,
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
    async (documentNumber: number, specialtyId: string) => {
      console.log("fetchHistory llamado con:", { documentNumber, specialtyId })
      
      if (!accessToken) {
        const message = 'No hay token de acceso, por favor inicie sesión'
        console.error("No hay accessToken")
        setError(message)
        throw new Error(message)
      }

      console.log("Token disponible, iniciando carga...")
      setLoading(true)
      setError(null)
      setSuccess(false)

      try {
        currentParamsRef.current = { documentNumber: documentNumber.toString(), specialtyId }

        console.log("Llamando a ProfessionalDashboardAdapter.getClinicHistoryPatient")
        const response =
          await ProfessionalDashboardAdapter.getClinicHistoryPatient(
            documentNumber,
            specialtyId,
            accessToken
          )

        console.log("Respuesta recibida:", response)

        let documents: ClinicalHistoryResponse[] = [];
        
        if(Array.isArray(response)){
            documents = response;
        }else{
            documents = [response]
        }

        console.log("Documentos procesados:", documents)
        setDocuments(documents)
        setSuccess(true)

        return documents
      } catch (error) {
        console.error("Error en fetchHistory:", error)
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
    return fetchHistory(Number(documentNumber), specialtyId)
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