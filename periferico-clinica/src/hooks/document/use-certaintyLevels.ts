import { useCallback, useState, useEffect } from "react"
import { ProfessionalDashboardAdapter } from "../../adapters/Dashboard"
import type { SnomedCatalogListResponse, SnomedCatalogItem } from "../../types/clinical-document"
import { useAuthStore } from "../../store/AuthStore"
import { useSnomedCatalogStore } from "../../store/useSnomedCatalogState"

interface CertaintyLevelsProps {
    onSuccess?: (response: SnomedCatalogListResponse) => void;
    onError?: (error: string) => void;
    autoFetch?: boolean; // Si se carga automáticamente al montar
}

interface CertaintyLevelsReturn {
    loading: boolean;
    error: string | null;
    reasons: SnomedCatalogItem[];
    totalCount: number;
    getCertaintyLevels: () => Promise<SnomedCatalogListResponse>;
}

/**
 * Hook para obtener grados de certeza del catálogo SNOMED
 * Integra caché local usando Zustand store para evitar llamadas innecesarias al backend
 * 
 * @param onSuccess: Callback para cuando la búsqueda es exitosa
 * @param onError: Callback para cuando la búsqueda falla
 * @param autoFetch: Si es true, carga automáticamente al montar el componente
 * @returns {CertaintyLevelsReturn}
 * 
 * @example: 
 * ```typescript
 * const { loading, error, reasons, getCertaintyLevels } = useCertaintyLevels({
 *   autoFetch: true,
 *   onSuccess: (response) => {
 *     console.log('Grados obtenidos: ', response.reasons);
 *   }
 * });
 * ```
 */
export const useCertaintyLevels = ({
    onSuccess,
    onError,
    autoFetch = false,
}: CertaintyLevelsProps = {}): CertaintyLevelsReturn => {

    const { accessToken } = useAuthStore()
    const { 
        certaintyLevels: cachedLevels, 
        hasCertaintyLevels, 
        setCertaintyLevels 
    } = useSnomedCatalogStore()
    
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [reasons, setReasons] = useState<SnomedCatalogItem[]>(cachedLevels);
    const [totalCount, setTotalCount] = useState<number>(cachedLevels.length);

    const getCertaintyLevels = useCallback(async () => {
        // Verificar caché primero
        if (hasCertaintyLevels()) {
            // Usar datos del caché
            setReasons(cachedLevels);
            setTotalCount(cachedLevels.length);
            const cachedResponse: SnomedCatalogListResponse = {
                success: true,
                reasons: cachedLevels,
                totalCount: cachedLevels.length,
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
            const resp = await ProfessionalDashboardAdapter.getCertaintyLevels(accessToken);
            
            // Guardar en caché
            setCertaintyLevels(resp.reasons);
            
            setReasons(resp.reasons);
            setTotalCount(resp.totalCount);
            onSuccess?.(resp);
            return resp;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al obtener los grados de certeza';
            setError(message);
            onError?.(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }

    }, [accessToken, onSuccess, onError, cachedLevels, hasCertaintyLevels, setCertaintyLevels])

    // Carga automática si autoFetch es true
    useEffect(() => {
        if (autoFetch && accessToken) {
            getCertaintyLevels();
        }
    }, [autoFetch, accessToken, getCertaintyLevels])

    // Sincronizar con el store cuando cambie el caché
    useEffect(() => {
        if (cachedLevels.length > 0 && !loading) {
            setReasons(cachedLevels);
            setTotalCount(cachedLevels.length);
        }
    }, [cachedLevels, loading])

    return {
        loading,
        error,
        reasons,
        totalCount,
        getCertaintyLevels,
    };
}

