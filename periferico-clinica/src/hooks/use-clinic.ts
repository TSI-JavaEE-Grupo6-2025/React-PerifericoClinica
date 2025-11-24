import { useState, useEffect, useCallback, useRef } from 'react'
import type { ClinicResponse, UpdateClinicRequest } from '../types'
import { AdminDashboardAdapter } from '../adapters'
import { useTenantStore } from '../store/TenantStore'
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
    success: boolean

    // Acciones
    refetch: () => Promise<void>
    getClinicInfo: () => Promise<ClinicResponse>
    updateClinicData: (clinicData: UpdateClinicRequest) => Promise<ClinicResponse>;
}

export const useClinic = ({
    autoFetch = true,
    refetchOnMount = true
}: ClinicOption = {}): ClinicReturn => {

    const { accessToken } = useAuthStore()

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [clinic, setClinic] = useState<ClinicResponse | null>(null)

    const [success, setSuccess] = useState<boolean>(false)

    const hasFetched = useRef(false);
    const isFetching = useRef(false);
    const isUpdating = useRef(false);

    const getClinicInfo = useCallback(async (): Promise<ClinicResponse> => {
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

            const clinicInfo: ClinicResponse = await AdminDashboardAdapter.getClinicInfo( accessToken)
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
        await getClinicInfo()
    }, [getClinicInfo])

    // Auto-fetch en el primer render si está habilitado
    useEffect(() => {
        if (autoFetch && !hasFetched.current && accessToken) {
            getClinicInfo().catch(() => {
                // error ya manejado en getClinicInfo
            })
        }
    }, [autoFetch, accessToken, getClinicInfo])

    // Refetch al montar si está habilitado y ya se había hecho fetch antes
    useEffect(() => {
        if (refetchOnMount && hasFetched.current && accessToken) {
            getClinicInfo().catch(() => {
                // error ya manejado en getClinicInfo
            })
        }
    }, [refetchOnMount, accessToken, getClinicInfo])



    // update clinic 

    const updateClinicData = useCallback(
        async (clinicData: UpdateClinicRequest): Promise<ClinicResponse> => {
            if (isUpdating.current) {
                throw new Error('Ya hay una actualización en curso');
            }

            setLoading(true)
            setError(null)
            setSuccess(false)

            try {
                if (!accessToken) {
                    const errorMessage = "Error de autenticación, vuelva a iniciar sesión.";
                    setError(errorMessage);
                    throw new Error(errorMessage);
                }
                isUpdating.current = true;
                const res: ClinicResponse = await AdminDashboardAdapter.updateClinic(clinicData, accessToken);
                
                // Actualizar el estado local con los nuevos datos (incluyendo colors si viene)
                setClinic(res);
                setSuccess(true); 

                const {tenant, setTenant} = useTenantStore.getState()

                if(tenant && res ){
                    setTenant({
                        ...tenant,
                        name: res.name ?? tenant.name,
                        logoBase64: res.logoBase64 ?? tenant.logoBase64,
                        color: res.colors ? {
                            sidebar: res.colors.sidebar,
                            primary: res.colors.primary,
                            secondary: res.colors.secondary,
                            background: res.colors.background,
                            text: res.colors.text
                        }: tenant.color
                    })
                }

                return res;

            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Error al actualizar información de la clínica';
                setError(errorMessage);
                console.error('❌ [useClinic] Error al actualizar:', err);
                throw err instanceof Error ? err : new Error(String(err))
            } finally {
                setLoading(false);
                isUpdating.current = false;
            }

        }, [accessToken])


    return {
        clinicData: clinic,
        clinicLoading: loading,
        clinicError: error,
        refetch,
        getClinicInfo,
        success,
        updateClinicData,
    }
}