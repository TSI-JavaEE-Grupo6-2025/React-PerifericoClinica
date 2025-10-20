
/**
 * Extrae el dominio desde un hostname para enviar al backend
 * 
 * Esta función maneja diferentes formatos de dominio para sistemas multi-tenant,
 * permitiendo extraer el identificador de la clínica desde la URL.
 * 
 * @param {string} hostname - El hostname completo (ej: 'clinicaA.miapp.com')
 * @param {Object} options - Opciones de configuración
 * @param {boolean} [options.isSubdomain=false] - Si el tenant está en un subdominio
 * @param {number} [options.subdomainIndex=1] - Índice del subdominio donde está el tenant
 * @param {string} [options.fallbackForLocalhost='dev-tenant'] - Valor para desarrollo local
 * @param {boolean} [options.allDomain=false] - Si debe retornar el hostname completo
 * 
 * @returns {string} El dominio para enviar  al backend
 * 
 * @example
 * ```typescript
 * // Dominio simple: clinicaA.com
 * extractTenantFromDomain('clinicaA.com')
 * // → 'clinicaA'
 * 
 * // Subdominio: clinicaA.miapp.com
 * extractTenantFromDomain('clinicaA.miapp.com', { 
 *   isSubdomain: true, 
 *   subdomainIndex: 0 
 * })
 * // → 'clinicaA'
 * 
 * // Subdominio con admin: admin.clinicaA.miapp.com
 * extractTenantFromDomain('admin.clinicaA.miapp.com', { 
 *   isSubdomain: true, 
 *   subdomainIndex: 1 
 * })
 * // → 'clinicaA'
 * 
 * // Desarrollo local
 * extractTenantFromDomain('localhost', { 
 *   fallbackForLocalhost: 'mi-clinica-dev' 
 * })
 * // → 'mi-clinica-dev'
 * 
 * // IP local
 * extractTenantFromDomain('127.0.0.1:3000')
 * // → 'dev-tenant'
 * 
 * // Hostname completo
 * extractTenantFromDomain('clinicaA.miapp.com', { allDomain: true })
 * // → 'clinicaA.miapp.com'
 * 
 * // Hostname completo con puerto
 * extractTenantFromDomain('clinicaA.miapp.com:3000', { allDomain: true })
 * // → 'clinicaA.miapp.com:3000'
 * ```
 * 
 * @example
 * ```typescript
 * // Uso con configuración por ambiente
 * import { TENANT_CONFIG } from '../config/tenant-config';
 * 
 * const config = TENANT_CONFIG.production;
 * const tenantId = extractTenantFromDomain(
 *   window.location.hostname, 
 *   config
 * );
 * ```
 */
export const extractTenantFromDomain = (
    hostname: string,
    options?: {
        isSubdomain?: boolean;
        subdomainIndex?: number;
        fallbackForLocalhost?: string;
        allDomain?: boolean;
    }
): string => {
    const {
        isSubdomain = false,
        subdomainIndex = 1,
        fallbackForLocalhost = 'localhost-xd',
        allDomain = false
    } = options || {};

    // Si allDomain está activado, retornar el hostname completo
    if (allDomain) {
        return hostname;
    }

    if(hostname === 'localhost' || hostname.startsWith('127.0.0.1')){
        return fallbackForLocalhost
    }
    const parts = hostname.split('.');
    
    if(isSubdomain){
        return parts[subdomainIndex] || parts[0]; // devuelve el subdominio o el dominio principal
    }else{
        return parts[0]; // devuelve el dominio principal
    }
}