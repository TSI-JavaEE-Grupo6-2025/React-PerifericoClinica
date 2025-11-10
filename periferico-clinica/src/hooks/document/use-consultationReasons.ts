import { useCallback, useState, useEffect } from 'react'
import { ProfessionalDashboardAdapter } from '../../adapters/Dashboard'
import type { SnomedCatalogListResponse, SnomedCatalogItem } from '../../types/clinical-document'
import { useAuthStore } from '../../store/AuthStore'
import { useSnomedCatalogStore } from '../../store/useSnomedCatalogState'

interface ConsultationReasonsProps {
    onSuccess?: (response: SnomedCatalogListResponse) => void;
    onError?: (error: string) => void;
    autoFetch?: boolean; // Si se carga automáticamente al montar
}

interface ConsultationReasonsReturn {
    loading: boolean;
    error: string | null;
    reasons: SnomedCatalogItem[];
    totalCount: number;
    searchConsultationReasons: (search?: string) => Promise<SnomedCatalogListResponse>;
}

/**
 * Hook para obtener motivos de consulta del catálogo SNOMED
 * Integra caché local usando Zustand store para evitar llamadas innecesarias al backend
 * 
 * @param onSuccess: Callback para cuando la búsqueda es exitosa
 * @param onError: Callback para cuando la búsqueda falla
 * @param autoFetch: Si es true, carga automáticamente al montar el componente
 * @returns {ConsultationReasonsReturn}
 * 
 * @example: 
 * ```typescript
 * const { loading, error, reasons, searchConsultationReasons } = useConsultationReasons({
 *   autoFetch: true,
 *   onSuccess: (response) => {
 *     console.log('Motivos obtenidos: ', response.reasons);
 *   },
 *   onError: (error) => {
 *     console.log('Error: ', error);
 *   }
 * });
 * 
 * // Buscar con filtro
 * searchConsultationReasons('dolor');
 * 
 * // Obtener todos (usa caché si está disponible)
 * searchConsultationReasons();
 * ```
 */
export const useConsultationReasons = ({
    onSuccess,
    onError,
    autoFetch = false,
}: ConsultationReasonsProps = {}): ConsultationReasonsReturn => {

    const { accessToken } = useAuthStore()
    const { 
        consultationReasons: cachedReasons, 
        hasConsultationReasons, 
        setConsultationReasons 
    } = useSnomedCatalogStore()
    
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reasons, setReasons] = useState<SnomedCatalogItem[]>(cachedReasons);
    const [totalCount, setTotalCount] = useState<number>(cachedReasons.length);

    const searchConsultationReasons = useCallback(async (search?: string) => {
        // Si hay búsqueda, siempre llamar al backend (no usar caché)
        if (search) {
            setLoading(true);
            setError(null);

            try {
                if (!accessToken) {
                    const err = new Error('No hay token de acceso');
                    setError(err.message);
                    onError?.(err.message);
                    throw err;
                }
                const resp = await ProfessionalDashboardAdapter.getConsultationReasons(accessToken, search);
                setReasons(resp.reasons);
                setTotalCount(resp.totalCount);
                onSuccess?.(resp);
                return resp;
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Error al obtener los motivos de consulta';
                setError(message);
                onError?.(message);
                throw new Error(message);
            } finally {
                setLoading(false);
            }
        }

        // Si no hay búsqueda, verificar caché primero
        if (hasConsultationReasons()) {
            // Usar datos del caché
            setReasons(cachedReasons);
            setTotalCount(cachedReasons.length);
            const cachedResponse: SnomedCatalogListResponse = {
                success: true,
                reasons: cachedReasons,
                totalCount: cachedReasons.length,
            };
            onSuccess?.(cachedResponse);
            return cachedResponse;
        }

        // Si no hay caché, llamar al backend
        setLoading(true);
        setError(null);

        try {
            if (!accessToken) {
                const err = new Error('No hay token de acceso');
                setError(err.message);
                onError?.(err.message);
                throw err;
            }
            const resp = await ProfessionalDashboardAdapter.getConsultationReasons(accessToken);
            
            // Guardar en caché
            setConsultationReasons(resp.reasons);
            
            setReasons(resp.reasons);
            setTotalCount(resp.totalCount);
            onSuccess?.(resp);
            return resp;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al obtener los motivos de consulta';
            setError(message);
            onError?.(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }

    }, [accessToken, onSuccess, onError, cachedReasons, hasConsultationReasons, setConsultationReasons])

    // Carga automática si autoFetch es true
    useEffect(() => {
        if (autoFetch && accessToken) {
            searchConsultationReasons();
        }
    }, [autoFetch, accessToken, searchConsultationReasons])

    // Sincronizar con el store cuando cambie el caché
    useEffect(() => {
        if (cachedReasons.length > 0 && !loading) {
            setReasons(cachedReasons);
            setTotalCount(cachedReasons.length);
        }
    }, [cachedReasons, loading])

    return {
        loading,
        error,
        reasons,
        totalCount,
        searchConsultationReasons,
    };
}
