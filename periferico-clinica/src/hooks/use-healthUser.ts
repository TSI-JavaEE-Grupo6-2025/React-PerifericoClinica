//src/hooks/use-healthUser.ts
import { useState, useEffect, useCallback, useRef } from "react"
import { AdminDashboardAdapter } from "../adapters/Dashboard/Admin/AdminDashboardAdapter"
import { useAuthStore } from "../store/AuthStore"
import type { HealthUserListResponse } from "../types/User"

// hook para obtener los usuarios de salud

interface UseHealthUserOptions {
    autoFetch?: boolean // si  debe hacer fetch automaticamente
    refetchOnMount?: boolean // si debe hacer fetch al montar el componente

}

interface UseHealthUsersReturn {
    healthUsers: HealthUserListResponse[]
    loading: boolean
    error: string | null

    fetchUsers: () => Promise<void>
    refetch: () => void
    clearError: () => void
}

export const useHealthUsers = ({
    autoFetch = true,
    refetchOnMount = false
}: UseHealthUserOptions = {}): UseHealthUsersReturn => {
    const [users, setUsers] = useState<HealthUserListResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const { accessToken } = useAuthStore();
    const hasFetched = useRef(false);
    const isFetching = useRef(false);

    const fetchUsers = useCallback(async (): Promise<void> => {
        // Evitar múltiples requests simultáneos
        if (isFetching.current) {
            console.log('🔄 [useHealthUsers] Ya hay una petición en curso, ignorando...');
            return;
        }

        if (!accessToken) {
            setError('No hay token de acceso');
            return;
        }

        try {
            isFetching.current = true;
            setLoading(true);
            setError(null);

            console.log('🔍 [useHealthUsers] Iniciando fetch de usuarios de salud...');
            const response = await AdminDashboardAdapter.getHealthUsers(accessToken);

            // El API responde con un array de usuarios
            if (Array.isArray(response)) {
                setUsers(response);
            } else if (response) {
                setUsers([response]);
            } else {
                setUsers([]);
            }
            
            hasFetched.current = true;
            const usersCount = Array.isArray(response) ? response.length : (response ? 1 : 0);
            console.log('✅ [useHealthUsers] Usuarios obtenidos:', usersCount);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al obtener usuarios de salud';
            setError(errorMessage);
            console.error('❌ [useHealthUsers] Error:', err);
        } finally {
            setLoading(false);
            isFetching.current = false;
        }

    }, [accessToken]);

    const refetch = useCallback(async (): Promise<void> => {
        console.log('🔄 [useHealthUsers] Refetch manual iniciado...');
        hasFetched.current = false;
        await fetchUsers();
    }, [fetchUsers]);

    const clearError = useCallback((): void => {
        setError(null);
    }, []);

    // Auto-fetch en el primer render si está habilitado
    useEffect(() => {
        if (autoFetch && !hasFetched.current && accessToken) {
            console.log('🚀 [useHealthUsers] Auto-fetch iniciado...');
            fetchUsers();
        }
    }, [autoFetch, accessToken, fetchUsers]);

    // Refetch al montar si está habilitado y ya se había hecho fetch antes
    useEffect(() => {
        if (refetchOnMount && hasFetched.current && accessToken) {
            console.log('🔄 [useHealthUsers] Refetch on mount iniciado...');
            fetchUsers();
        }
    }, [refetchOnMount, accessToken, fetchUsers]);

    return {
        healthUsers: users,
        loading,
        error,
        fetchUsers,
        refetch,
        clearError
    }

}