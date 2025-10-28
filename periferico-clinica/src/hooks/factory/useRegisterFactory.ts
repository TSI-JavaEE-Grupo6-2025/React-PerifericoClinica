// factoryHook para registro de usuarios

import {
    useRegisterHealthUser,
    useRegisterAdmin,
    useRegisterProfessional
} from '../register';

// ==== TIPOS ====
export type RegisterAction =
    'health-user' |
    'health-professional' |
    'admin-user';

interface UseRegisterFactoryOptions {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

// ==== CONDITIONAL TYPES ====
/**
 * Mapea cada acción de registro a su tipo de retorno correspondiente
 * @template T - Tipo de acción de registro
 */
type RegisterReturn<T extends RegisterAction> = 
    T extends 'admin-user' ? ReturnType<typeof useRegisterAdmin> :
    T extends 'health-user' ? ReturnType<typeof useRegisterHealthUser> :
    T extends 'health-professional' ? ReturnType<typeof useRegisterProfessional> :
    never;

// ==== REGISTRY PATTERN ====
/**
 * Registry de hooks de registro para mejor mantenibilidad
 * Permite agregar nuevos tipos sin modificar el switch
 */
const registerHooks = {
    'admin-user': useRegisterAdmin,
    'health-user': useRegisterHealthUser,
    'health-professional': useRegisterProfessional
} as const;

// ==== HIGER-ORDER FUNCTION ====
/**
 * Higher-Order Function para crear un hook de registro de usuarios
 * @param action - Tipo de registro a realizar
 * @returns Hook de registro de usuarios
 */
export const createRegisterHook = (action: RegisterAction) => {
    return (options: UseRegisterFactoryOptions = {}) => {
        const hook = registerHooks[action];
        
        if (!hook) {
            throw new Error(`Unsupported register action: ${action}. Valid actions: ${Object.keys(registerHooks).join(', ')}`);
        }
        
        return hook(options);
    };
}

// ==== FACTORY CON TYPE SAFETY ====
/**
 * Factory para crear un hook de registro de usuarios con type safety completo
 * @param action - Tipo de registro a realizar
 * @param options - Opciones del hook
 * @returns Hook de registro de usuarios con tipo correcto inferido
 */
export const useRegisterFactory = <T extends RegisterAction>(
    action: T,
    options: UseRegisterFactoryOptions = {}
): RegisterReturn<T> => {
    const hook = createRegisterHook(action);
    return hook(options) as RegisterReturn<T>;
}

// ==== ALIAS PARA COMPATIBILIDAD ====
/**
 * Alias para mantener compatibilidad con código existente
 */
export const useRegister = useRegisterFactory;