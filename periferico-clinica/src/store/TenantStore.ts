import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { TenantResponse } from '../types';



interface TenantState {
    // Estado actual
    tenant: TenantResponse | null;           // Datos del tenant actual
    loading: boolean;                // Estado de carga
    error: string | null;            // Error si ocurre

    // Acciones
    setTenant: (tenant: TenantResponse) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearTenant: () => void;

    getTenantId: () => string | null;
    getTenant: () => TenantResponse | null;
}

/**
 * Store para gestión de tenants (clínicas) en el sistema HCEN
 * 
 * Maneja el estado del tenant actual basado en el dominio de la URL.
 * Los datos se persisten en localStorage para evitar peticiones innecesarias.
 * 
 * @example
 * ```typescript
 * // Obtener tenant actual
 * const { tenant, loading, error } = useTenantStore();
 * 
 * // Obtener tenant por dominio
 * const { fetchTenantByDomain } = useTenantStore();
 * await fetchTenantByDomain('clinicaPepe.miapp.com');
 * 
 * // Limpiar tenant
 * const { clearTenant } = useTenantStore();
 * clearTenant();
 * ```
 * 
 * @version 1.0.0
 * @since 2025-01-XX
 */
export const useTenantStore = create<TenantState>()(
    persist(
        (set, get) => ({
            // Estado inicial
            tenant: null,
            loading: false,
            error: null,

            /**
             * Establece los datos del tenant actual
             * 
             * @param {TenantResponse} tenant - Datos del tenant a establecer
             */
            setTenant: (tenant: TenantResponse) =>
                set({
                    tenant,
                    error: null // Limpiar error al establecer tenant exitosamente
                }),

            /**
             * Establece el estado de carga
             * 
             * @param {boolean} loading - Estado de carga
             */
            setLoading: (loading: boolean) =>
                set({ loading }),

            /**
             * Establece un mensaje de error
             * 
             * @param {string | null} error - Mensaje de error o null para limpiar
             */
            setError: (error: string | null) =>
                set({ error }),

            /**
             * Limpia todos los datos del tenant
             * 
             * Útil para logout o cambio de tenant
             */
            clearTenant: () =>
                set({
                    tenant: null,
                    loading: false,
                    error: null
                }),

            
            getTenantId(): string | null {
                return get().tenant?.tenantId || null;
            },

            /**
             * Getter para obtener el objeto tenant completo
             * 
             * @returns {TenantResponse | null} Objeto tenant completo o null si no está cargado
             * 
             * @example
             * ```typescript
             * const { getTenant } = useTenantStore();
             * const tenant = getTenant();
             * 
             * if (tenant) {
             *   console.log(tenant.id);        // Acceso a ID
             *   console.log(tenant.name);      // Acceso a nombre
             *   console.log(tenant.domain);    // Acceso a dominio
             *   console.log(tenant.logo);      // Acceso a logo
             * }
             * ```
            */
            getTenant: (): TenantResponse | null => {
                return get().tenant || null;
            },

        }),

        {
            name: 'tenant-storage',
            storage: createJSONStorage(() => localStorage), // Persistir en localStorage
            // Solo persistir el tenant, no loading ni error
            partialize: (state) => ({
                tenant: state.tenant
            }),
        }
    )
);

