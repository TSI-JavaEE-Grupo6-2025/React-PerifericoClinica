import { useCallback, useState, useEffect } from "react"
import { ProfessionalDashboardAdapter } from "../../adapters/Dashboard"
import type { SnomedCatalogListResponse, SnomedCatalogItem } from "../../types/clinical-document"
import { useAuthStore } from "../../store/AuthStore"
import { useSnomedCatalogStore } from "../../store/useSnomedCatalogState"

interface ProblemStatusProps {
    onSuccess?: (response: SnomedCatalogListResponse) => void;
    onError?: (error: string) => void;
    autoFetch?: boolean; // Si se carga automáticamente al montar
}

interface ProblemStatusReturn {
    loading: boolean;
    error: string | null;
    reasons: SnomedCatalogItem[];
    totalCount: number;
    getProblemStatus: () => Promise<SnomedCatalogListResponse>;
}

/**
 * Hook para obtener estados de problema del catálogo SNOMED
 * Integra caché local usando Zustand store para evitar llamadas innecesarias al backend
 * 
 * @param onSuccess: Callback para cuando la búsqueda es exitosa
 * @param onError: Callback para cuando la búsqueda falla
 * @param autoFetch: Si es true, carga automáticamente al montar el componente
 * @returns {ProblemStatusReturn}
 * 
 * @example: 
 * ```typescript
 * const { loading, error, reasons, getProblemStatus } = useProblemStatus({
 *   autoFetch: true,
 *   onSuccess: (response) => {
 *     console.log('Estados obtenidos: ', response.reasons);
 *   }
 * });
 * ```
 */
export const useProblemStatus = ({
    onSuccess,
    onError,
    autoFetch = false,
}: ProblemStatusProps = {}): ProblemStatusReturn => {

    const { accessToken } = useAuthStore()
    const { 
        problemStatus: cachedStatus, 
        hasProblemStatus, 
        setProblemStatus 
    } = useSnomedCatalogStore()
    
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reasons, setReasons] = useState<SnomedCatalogItem[]>(cachedStatus);
    const [totalCount, setTotalCount] = useState<number>(cachedStatus.length);

    const getProblemStatus = useCallback(async () => {
        // Verificar caché primero
        if (hasProblemStatus()) {
            // Usar datos del caché
            setReasons(cachedStatus);
            setTotalCount(cachedStatus.length);
            const cachedResponse: SnomedCatalogListResponse = {
                success: true,
                reasons: cachedStatus,
                totalCount: cachedStatus.length,
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
            const resp = await ProfessionalDashboardAdapter.getProblemsStatus(accessToken);
            
            // Guardar en caché
            setProblemStatus(resp.reasons);
            
            setReasons(resp.reasons);
            setTotalCount(resp.totalCount);
            onSuccess?.(resp);
            return resp;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al obtener los estados de problema';
            setError(message);
            onError?.(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }

    }, [accessToken, onSuccess, onError, cachedStatus, hasProblemStatus, setProblemStatus])

    // Carga automática si autoFetch es true
    useEffect(() => {
        if (autoFetch && accessToken) {
            getProblemStatus();
        }
    }, [autoFetch, accessToken, getProblemStatus])

    // Sincronizar con el store cuando cambie el caché
    useEffect(() => {
        if (cachedStatus.length > 0 && !loading) {
            setReasons(cachedStatus);
            setTotalCount(cachedStatus.length);
        }
    }, [cachedStatus, loading])

    return {
        loading,
        error,
        reasons,
        totalCount,
        getProblemStatus,
    };
}

