// src/hooks/list/use-user-list.ts
// Hook genérico y reutilizable para listar usuarios de cualquier tipo

import { useState, useEffect, useCallback, useRef } from "react"
import { useAuthStore } from "../../store/AuthStore"

/**
 * Opciones de configuración para el hook useUserList
 */
export interface UseUserListOptions {
    /**
     * Si debe hacer fetch automáticamente al montar el componente
     * @default true
     */
    autoFetch?: boolean
    
    /**
     * Si debe hacer refetch al montar el componente (incluso si ya se hizo fetch antes)
     * @default false
     */
    refetchOnMount?: boolean
}

/**
 * Tipo de retorno del hook useUserList
 * @template T - Tipo de usuario en la lista
 */
export interface UseUserListReturn<T> {
    /** Lista de usuarios obtenidos */
    users: T[]
    
    /** Estado de carga */
    loading: boolean
    
    /** Mensaje de error si ocurrió alguno */
    error: string | null
    
    /** Función para obtener los usuarios manualmente */
    fetchUsers: () => Promise<void>
    
    /** Función para refrescar los datos */
    refetch: () => Promise<void>
    
    /** Función para limpiar el error */
    clearError: () => void
}

/**
 * Hook genérico y reutilizable para listar usuarios de cualquier tipo
 * @template T - Tipo de usuario en la lista
 * @param fetchFunction - Función que realiza el fetch de usuarios (recibe accessToken y devuelve T[] o T)
 * @param options - Opciones de configuración del hook
 * @returns Objeto con los usuarios, estados y funciones de control
 * 
 * @example
 * ```typescript
 * const { users, loading, error, refetch } = useUserList(
 *   async (token) => await AdminDashboardAdapter.getAdminUsers(token),
 *   { autoFetch: true }
 * )
 * 
 * ```
 */
export const useUserList = <T>(
    fetchFunction: (accessToken: string) => Promise<T[] | T>,
    options: UseUserListOptions = {}
): UseUserListReturn<T> => {
    const { autoFetch = true, refetchOnMount = false } = options
    
    const [users, setUsers] = useState<T[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    
    const { accessToken } = useAuthStore()
    const hasFetched = useRef(false)
    const isFetching = useRef(false)
    
    /**
     * Función para obtener los usuarios
     * Previene múltiples requests simultáneos
     */
    const fetchUsers = useCallback(async (): Promise<void> => {
        // Evitar múltiples requests simultáneos
        if (isFetching.current) {
            console.log('🔄 [useUserList] Ya hay una petición en curso, ignorando...')
            return
        }
        
        if (!accessToken) {
            setError('No hay token de acceso')
            return
        }
        
        try {
            isFetching.current = true
            setLoading(true)
            setError(null)
            
            console.log('🔍 [useUserList] Iniciando fetch de usuarios...')
            const response = await fetchFunction(accessToken)
            
            // Normalizar la respuesta: puede ser array, objeto único, o null/undefined
            if (Array.isArray(response)) {
                setUsers(response)
            } else if (response) {
                setUsers([response])
            } else {
                setUsers([])
            }
            
            hasFetched.current = true
            
            // Calcular cantidad de usuarios para logging
            let usersCount = 0
            if (Array.isArray(response)) {
                usersCount = response.length
            } else if (response) {
                usersCount = 1
            }
            console.log(`✅ [useUserList] Usuarios obtenidos: ${usersCount}`)
            
        } catch (err) {
            const errorMessage = err instanceof Error 
                ? err.message 
                : 'Error al obtener usuarios'
            setError(errorMessage)
            console.error('❌ [useUserList] Error:', err)
        } finally {
            setLoading(false)
            isFetching.current = false
        }
    }, [accessToken, fetchFunction])
    
    /**
     * Función para refrescar los datos manualmente
     */
    const refetch = useCallback(async (): Promise<void> => {
        console.log('🔄 [useUserList] Refetch manual iniciado...')
        hasFetched.current = false
        await fetchUsers()
    }, [fetchUsers])
    
    /**
     * Función para limpiar el error
     */
    const clearError = useCallback((): void => {
        setError(null)
    }, [])
    
    // Auto-fetch en el primer render si está habilitado
    useEffect(() => {
        if (autoFetch && !hasFetched.current && accessToken) {
            console.log('🚀 [useUserList] Auto-fetch iniciado...')
            fetchUsers()
        }
    }, [autoFetch, accessToken, fetchUsers])
    
    // Refetch al montar si está habilitado y ya se había hecho fetch antes
    useEffect(() => {
        if (refetchOnMount && hasFetched.current && accessToken) {
            console.log('🔄 [useUserList] Refetch on mount iniciado...')
            fetchUsers()
        }
    }, [refetchOnMount, accessToken, fetchUsers])
    
    return {
        users,
        loading,
        error,
        fetchUsers,
        refetch,
        clearError
    }
}
