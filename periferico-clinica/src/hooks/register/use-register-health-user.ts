import { useState } from "react";
import { AdminDashboardAdapter } from "../../adapters";
import type { HealthUserRequest} from "../../types/User";
import { useAuthStore } from "../../store/AuthStore";



// ==== TIPOS ====

interface UseRegisterHealthUserOptions {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

interface UseRegisterHealthUserReturn {
    // Estado
    loading: boolean;
    error: string | null;
    success: boolean;

    // Acciones
    registerHealthUser: (data: HealthUserRequest) => Promise<void>;
    clearErrors: () => void;
    reset: () => void;
}

// ==== HOOK ====

export const useRegisterHealthUser = ({
    onSuccess,
    onError
}: UseRegisterHealthUserOptions = {}): UseRegisterHealthUserReturn => {
    // === ESTADO ===

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const { accessToken } = useAuthStore();

    // === FUNCIONES AUXILIARES ===
    const clearError = () => setError(null);
    const reset = () => {
        setError(null);
        setSuccess(false);
        setLoading(false);
    }
   
    // === FUNCION PRINCIPAL ===

    const registerHealthUser = async (data: HealthUserRequest): Promise<void> => {
        try{
            // 1. validamos token
            if(!accessToken){
                throw new Error("No hay token de acceso");
            }
            // 2. Iniciar proceso
            setLoading(true);
            setError(null);
            setSuccess(false);
            // 3. LLamamos al adapter
            await AdminDashboardAdapter.createHealthUser(data, accessToken);
            // 4. Exito
            setSuccess(true);
            onSuccess?.();
           
        }catch(error){
            // 6. validamos posibles errores
            const errorMessage = error instanceof Error ? error.message : "Error al registrar el usuario de salud";

            setError(errorMessage);
            onError?.(errorMessage);
            
            console.error("Error al registrar el usuario de salud: ", error);
        }finally{
            // 7. finalizamos
            setLoading(false);
        }
    }

    return {
        // Estado
        loading,
        error,
        success,
        // Acciones
        registerHealthUser,
        clearErrors: clearError,
        reset,
        
    }

}




