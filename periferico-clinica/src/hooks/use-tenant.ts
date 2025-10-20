import { TenantAdapter } from '../adapters/TenantAdapter';
import { useTenantStore } from '../store/TenantStore';
import { extractTenantFromDomain } from '../utils/domain-utils';

/**
 * Hook personalizado para obtener el tenantId actual
 * 
 * Útil cuando solo necesitas el ID del tenant sin los datos completos.
 * 
 * @returns {string | null} ID del tenant actual o null si no está cargado
 * 
 * @example
 * ```typescript
 * const tenantId = useTenantId();
 * if (tenantId) {
 *   // Usar tenantId para login o otras operaciones
 * }
 * ```
 */
export const useTenantId = (): string | null => {
  const { tenant } = useTenantStore();
  return tenant?.id || null;
};

/**
 * Hook personalizado para verificar si el tenant está cargado
 * 
 * @returns {boolean} true si el tenant está cargado y disponible
 * 
 * @example
 * ```typescript
 * const isTenantLoaded = useIsTenantLoaded();
 * if (isTenantLoaded) {
 *   // El tenant está listo para usar
 * }
 * ```
 */
export const useIsTenantLoaded = (): boolean => {
  const { tenant, loading, error } = useTenantStore();
  return !loading && !error && tenant !== null;
};




export const useTenantFetcher = async () => {

  const { setTenant, setLoading, setError } = useTenantStore();

  setLoading(true);
  setError(null); // reseteamos los errores
  try {
    const fullHostname = window.location.hostname
    const currentDomain = extractTenantFromDomain(fullHostname)
    if (!currentDomain) {
      return Promise.reject(new Error('No se pudo obtener el dominio del tenant'))
    }
    const tenant = await TenantAdapter.getTenantByDomain(currentDomain);
    setTenant(tenant); // almacenamos el tenant en localStorage
    if (!tenant) {
      return Promise.reject(new Error('No se pudo obtener el tenant'))
    }
    return Promise.resolve(tenant);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al obtener el tenant';
    setError(errorMessage)
    return Promise.reject(error);
  }finally{
    setLoading(false);
  }

}
