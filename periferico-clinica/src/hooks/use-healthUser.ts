//src/hooks/use-healthUser.ts
import { useState, useEffect, useCallback, useRef } from "react"
import { AdminDashboardAdapter } from "../adapters/Dashboard/Admin/AdminDashboardAdapter"
import { useAuthStore } from "../store/AuthStore"
import type { HealthUserListResponse } from "../types/User"
import { ProfessionalDashboardAdapter } from "../adapters/Dashboard/professional/ProfessionalDashboardAdapter"
import type { PatientBasicInfo } from "../types/clinical-document"

// hook para obtener los usuarios de salud

interface UseHealthUserOptions {
    autoFetch?: boolean // si  debe hacer fetch automaticamente
    refetchOnMount?: boolean // si debe hacer fetch al montar el componente

}

interface UseHealthUsersReturn {
    healthUsers: HealthUserListResponse[]
    patientBasicInfo: PatientBasicInfo | null
    patientLoading: boolean
    loading: boolean
    error: string | null

    fetchUsers: () => Promise<void>
    getPatientBasicInfo: (documentNumber: string) => Promise<PatientBasicInfo>
    refetch: () => Promise<void>
    clearError: () => void
    clearPatient: () => void
}

export const useHealthUsers = ({
    autoFetch = true,
    refetchOnMount = false
}: UseHealthUserOptions = {}): UseHealthUsersReturn => {
    const [users, setUsers] = useState<HealthUserListResponse[]>([]);
    const [patientBasicInfo, setPatientBasicInfo] = useState<PatientBasicInfo | null>(null);
    const [patientLoading, setPatientLoading] = useState<boolean>(false);
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
            let usersCount = 0;
            if (Array.isArray(response)) {
                usersCount = response.length;
            } else if (response) {
                usersCount = 1;
            }
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



    // getPatientBasicInfo
    const getPatientBasicInfo = useCallback(async (documentNumber: string): Promise<PatientBasicInfo> => {
        if (!accessToken) {
            const errorMessage = 'No hay token acceso, por favor vuelve a iniciar sesión';
            setError(errorMessage);
            throw new Error(errorMessage)
        }

        setPatientLoading(true);
        setError(null);

        try {

            isFetching.current = true;
            const info: PatientBasicInfo = await ProfessionalDashboardAdapter.getPatientBasicInfo(documentNumber, accessToken);
            setPatientBasicInfo(info);
            return info;
        } catch (error) {
            console.error('Error al obtener la información basica del paciente: ', error);
            throw error;
        } finally {
            setPatientLoading(false)
            isFetching.current = false;
        }
    }, [accessToken])

    const clearPatient = useCallback((): void => {
        setPatientBasicInfo(null);
    }, [])

    return {
        healthUsers: users,
        patientBasicInfo: patientBasicInfo,
        patientLoading,
        loading,
        error,
        fetchUsers,
        refetch,
        clearError,
        getPatientBasicInfo,
        clearPatient
    }

}