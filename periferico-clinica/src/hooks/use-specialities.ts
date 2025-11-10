// src/hooks/use-specialities.ts
import { useState, useRef, useEffect, useCallback } from 'react'
import { AdminDashboardAdapter } from '../adapters/Dashboard/Admin/AdminDashboardAdapter'
import { useAuthStore } from '../store/AuthStore'
import type { SpecialityResponse, SpecialityState } from '../types/Specialty'

const CACHE_KEY = 'specialties_cache'
const CACHE_EXPIRY = 24 * 60 * 60 * 1000 // 24 horas

export const useSpecialities = () => {
  const [specialties, setSpecialties] = useState<SpecialityState>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // useRef para controlar si ya se hizo la llamada
  const hasFetched = useRef(false)
  const { accessToken } = useAuthStore()

  // Funciones de cache
  const getCachedSpecialties = (): SpecialityResponse | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (!cached) return null
      
      const { data, timestamp } = JSON.parse(cached)
      const now = Date.now()
      
      // Verificar si el cache expiró
      if (now - timestamp > CACHE_EXPIRY) {
        localStorage.removeItem(CACHE_KEY)
        return null
      }
      
      return data
    } catch {
      return null
    }
  }

  const setCachedSpecialties = (data: SpecialityResponse) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    } catch (error) {
      console.warn('No se pudo guardar en cache:', error)
    }
  }

  const fetchSpecialties = useCallback(async () => {
    if (hasFetched.current) return // Ya se hizo la llamada
    
    setLoading(true)
    setError(null)
    
    try {
      // 1. Verificar cache primero
      const cached = getCachedSpecialties()
      if (cached) {
        setSpecialties(cached)
        hasFetched.current = true
        setLoading(false)
        return
      }

      // 2. Si no hay cache, hacer llamada
      if (!accessToken) {
        throw new Error('No hay token de acceso')
      }

      const response = await AdminDashboardAdapter.getSpecialities(accessToken)
      
      // 3. Guardar en cache
      setCachedSpecialties(response)
      setSpecialties(response)
      hasFetched.current = true
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar especialidades'
      setError(errorMessage)
      console.error('Error al obtener especialidades:', err)
    } finally {
      setLoading(false)
    }
  }, [accessToken])

  // Forzar refresh (para F5 o cambios)
  const refreshSpecialties = () => {
    hasFetched.current = false
    localStorage.removeItem(CACHE_KEY)
    fetchSpecialties()
  }

  // Invalidar cache manualmente
  const invalidateCache = () => {
    localStorage.removeItem(CACHE_KEY)
    hasFetched.current = false
  }

  // Auto-fetch al montar el componente
  useEffect(() => {
    fetchSpecialties()
  }, [fetchSpecialties])

  return {
    specialties,
    loading,
    error,
    fetchSpecialties,
    refreshSpecialties,
    invalidateCache
  }
}