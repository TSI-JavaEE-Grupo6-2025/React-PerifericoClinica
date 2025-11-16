import { useState, useEffect, useCallback, useRef } from 'react'
import type { ClinicResponse } from '../types'
import { AdminDashboardAdapter } from '../adapters'
import { useTenantId } from './use-tenant'
import { useAuthStore } from '../store/AuthStore'

interface ClinicOption {
    autoFetch?: boolean,
    refetchOnMount?: boolean,
}

interface ClinicReturn {
    // Estado
    clinicData: ClinicResponse | null,
    clinicLoading: boolean,
    clinicError: string | null

    // Acciones
    refetch: () => Promise<void>
    getClinicInfo: (tenantId: string) => Promise<ClinicResponse>
}

export const useClinic = ({
    autoFetch = true,
    refetchOnMount = true
}: ClinicOption = {}): ClinicReturn => {

    // capturamos el tenantId
    const tenantId = useTenantId();
    const { accessToken } = useAuthStore()

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [clinic, setClinic] = useState<ClinicResponse | null>(null)

    const hasFetched = useRef(false);
    const isFetching = useRef(false);

    const getClinicInfo = useCallback(async (tenantIdParam: string): Promise<ClinicResponse> => {
        if (!accessToken) {
            setError('Error: Sesión caducada. por favor vuelva a iniciar sesión');
            throw new Error('No hay token de acceso');
        }

        if (isFetching.current) {
            throw new Error('Ya hay una petición en curso');
        }

        try {
            isFetching.current = true
            setLoading(true)
            setError(null)

            const clinicInfo: ClinicResponse = await AdminDashboardAdapter.getClinicInfo(tenantIdParam || '', accessToken)
            setClinic(clinicInfo)
            hasFetched.current = true
            return clinicInfo
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al obtener información de la clínica';
            setError(errorMessage);
            console.error('❌ [useClinic] Error:', err);
            throw err instanceof Error ? err : new Error(String(err))
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    }, [accessToken])

    const refetch = useCallback(async (): Promise<void> => {
        hasFetched.current = false
        if (!tenantId) {
            setError('No hay tenant seleccionado')
            return
        }
        await getClinicInfo(tenantId)
    }, [getClinicInfo, tenantId])

    // Auto-fetch en el primer render si está habilitado
    useEffect(() => {
        if (autoFetch && !hasFetched.current && tenantId && accessToken) {
            getClinicInfo(tenantId).catch(() => {
                // error ya manejado en getClinicInfo
            })
        }
    }, [autoFetch, tenantId, accessToken, getClinicInfo])

    // Refetch al montar si está habilitado y ya se había hecho fetch antes
    useEffect(() => {
        if (refetchOnMount && hasFetched.current && tenantId && accessToken) {
            getClinicInfo(tenantId).catch(() => {
                // error ya manejado en getClinicInfo
            })
        }
    }, [refetchOnMount, tenantId, accessToken, getClinicInfo])

    return {
        clinicData: clinic,
        clinicLoading: loading,
        clinicError: error,
        refetch,
        getClinicInfo
    }
}