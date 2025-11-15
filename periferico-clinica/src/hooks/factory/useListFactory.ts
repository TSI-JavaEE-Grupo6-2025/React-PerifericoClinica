// src/hooks/factory/useListFactory.ts
// Factory hook para listar usuarios con type safety completo

import { useUserList } from '../list/use-user-list'
import type { UseUserListOptions, UseUserListReturn } from '../list/use-user-list'
import { AdminDashboardAdapter } from '../../adapters/Dashboard/Admin/AdminDashboardAdapter'
import type { 
    AdminUserListResponse, 
    HealthUserListResponse, 
    ProfessionalInfoResponse 
} from '../../types/User'

// ==== TIPOS ====
/**
 * Tipos de listas de usuarios disponibles
 */
export type ListAction =
    | 'admin-user'
    | 'health-user'
    | 'health-professional'

/**
 * Opciones de configuración para el factory hook
 */
export interface UseListFactoryOptions extends UseUserListOptions {
    onSuccess?: () => void
    onError?: (error: string) => void
}

// ==== CONDITIONAL TYPES ====
/**
 * Mapea cada acción de lista a su tipo de retorno correspondiente
 * @template T - Tipo de acción de lista
 */
type ListReturn<T extends ListAction> = 
    T extends 'admin-user' 
        ? UseUserListReturn<AdminUserListResponse> 
    : T extends 'health-user' 
        ? UseUserListReturn<HealthUserListResponse> 
    : T extends 'health-professional' 
        ? UseUserListReturn<ProfessionalInfoResponse> 
    : never

/**
 * Mapea cada acción de lista a su tipo de usuario correspondiente
 * @template T - Tipo de acción de lista
 */
type ListUserType<T extends ListAction> = 
    T extends 'admin-user' 
        ? AdminUserListResponse 
    : T extends 'health-user' 
        ? HealthUserListResponse 
    : T extends 'health-professional' 
        ? ProfessionalInfoResponse 
    : never

// ==== REGISTRY PATTERN ====
/**
 * Registry de funciones de fetch para mejor mantenibilidad
 * Permite agregar nuevos tipos sin modificar el switch
 */
const fetchFunctions = {
    'admin-user': async (accessToken: string): Promise<AdminUserListResponse[] | AdminUserListResponse> => {
        const response = await AdminDashboardAdapter.getAdminUsers(accessToken)
        // Normalizar respuesta: puede ser array o objeto único
        // El adapter puede devolver un objeto único, lo convertimos a array para consistencia
        return response as AdminUserListResponse[] | AdminUserListResponse
    },
    'health-user': async (accessToken: string): Promise<HealthUserListResponse[] | HealthUserListResponse> => {
        const response = await AdminDashboardAdapter.getHealthUsers(accessToken)
        // Normalizar respuesta: puede ser array o objeto único
        // El adapter puede devolver un objeto único, lo convertimos a array para consistencia
        return response as HealthUserListResponse[] | HealthUserListResponse
    },
    'health-professional': async (accessToken: string): Promise<ProfessionalInfoResponse[] | ProfessionalInfoResponse> => {
        const response = await AdminDashboardAdapter.getProfessioanlUsers(accessToken)
        // Normalizar respuesta: puede ser array o objeto único
        // El adapter puede devolver un objeto único, lo convertimos a array para consistencia
        return response as ProfessionalInfoResponse[] | ProfessionalInfoResponse
    }
} as const

// ==== HIGHER-ORDER FUNCTION ====
/**
 * Higher-Order Function para crear un hook de lista de usuarios
 * @param action - Tipo de lista a obtener
 * @returns Hook de lista de usuarios
 */
const createListHook = <T extends ListAction>(action: T) => {
    return (options: UseListFactoryOptions = {}): ListReturn<T> => {
        const fetchFunction = fetchFunctions[action]
        
        if (!fetchFunction) {
            throw new Error(
                `Unsupported list action: ${action}. ` +
                `Valid actions: ${Object.keys(fetchFunctions).join(', ')}`
            )
        }
        
        const hookResult = useUserList<ListUserType<T>>(
            fetchFunction as (token: string) => Promise<ListUserType<T>[] | ListUserType<T>>,
            options
        )
        
        return hookResult as unknown as ListReturn<T>
    }
}

// ==== FACTORY CON TYPE SAFETY ====
/**
 * Factory para crear un hook de lista de usuarios con type safety completo
 * @param action - Tipo de lista a obtener
 * @param options - Opciones del hook
 * @returns Hook de lista de usuarios con tipo correcto inferido
 * 
 * @example
 * ```typescript
 * // Para administradores
 * const { users, loading, error, refetch } = useListFactory('admin-user', {
 *   autoFetch: true,
 *   onSuccess: () => console.log('Admins cargados'),
 *   onError: (err) => console.error('Error:', err)
 * })
 * 
 * // Para profesionales de salud
 * const { users, loading, error, refetch } = useListFactory('health-professional')
 * ```
 */
export const useListFactory = <T extends ListAction>(
    action: T,
    options: UseListFactoryOptions = {}
): ListReturn<T> => {
    const hook = createListHook(action)
    return hook(options)
}

// ==== ALIAS PARA COMPATIBILIDAD ====
/**
 * Alias para mantener compatibilidad con código existente
 */
export const useList = useListFactory

// ==== HOOKS ESPECÍFICOS PARA FACILITAR EL USO ====
/**
 * Hook específico para listar usuarios administradores
 * @param options - Opciones del hook
 * @returns Hook de lista de administradores
 */
export const useAdminUserList = (options: UseListFactoryOptions = {}) => {
    return useListFactory('admin-user', options)
}

/**
 * Hook específico para listar usuarios de salud
 * @param options - Opciones del hook
 * @returns Hook de lista de usuarios de salud
 * 
 * @note Este hook es una alternativa a useHealthUsers existente
 * Se mantiene useHealthUsers para compatibilidad
 */
export const useHealthUserList = (options: UseListFactoryOptions = {}) => {
    return useListFactory('health-user', options)
}

/**
 * Hook específico para listar profesionales de salud
 * @param options - Opciones del hook
 * @returns Hook de lista de profesionales de salud
 */
export const useHealthProfessionalList = (options: UseListFactoryOptions = {}) => {
    return useListFactory('health-professional', options)
}

