import { useCallback } from 'react';
import { TenantAdapter } from '../adapters/TenantAdapter';
import { useTenantStore } from '../store/TenantStore';
import { extractTenantFromDomain } from '../utils/domain-utils';
import { TENANT_CONFIG, type TenantConfig } from '../config/tenant-config';

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
  return tenant?.tenantId || null;
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




export const useTenantFetcher = (preConfig?: Partial<TenantConfig>) => {
  const { setTenant, setLoading, setError } = useTenantStore();

  const fetchTenant = useCallback(async () => {
    setLoading(true);
    setError(null); // reseteamos los errores
    try {
      const fullHostname = globalThis.location.hostname;
      
      // Usar configuración según el ambiente
      const config = preConfig || ( import.meta.env.MODE === 'production' 
          ? TENANT_CONFIG.production 
          : TENANT_CONFIG.development
        );
      
      const currentDomain = extractTenantFromDomain(fullHostname, config);
      if (!currentDomain) {
        throw new Error('No se pudo obtener el dominio del tenant')
      }
      const tenant = await TenantAdapter.getTenantByDomain(currentDomain);
     
      setTenant(tenant); // almacenamos el tenant en localStorage
      if (!tenant) {
        throw new Error('No se pudo obtener el tenant')
      }
      return tenant;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al obtener el tenant';
      setError(errorMessage)
      throw error;
    }finally{
      setLoading(false);
    }
  }, [setTenant, setLoading, setError, preConfig]);

  return { fetchTenant };
};
