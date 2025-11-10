
import { useState } from "react";
import { AdminDashboardAdapter } from "../../adapters";
import type { AdminUserRequest } from "../../types/User";
import { useAuthStore } from "../../store/AuthStore";
import { ROUTES } from "../../routes";
import { useNavigate } from "react-router-dom";



// ==== TIPOS ====

interface UseRegisterAdminOptions {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

interface UseRegisterAdminReturn {
    //Estado
    loading: boolean;
    error: string | null;
    success: boolean;

    // Acciones
    registerAdmin: (data: AdminUserRequest) => Promise<void>;
    clearErrors: () => void;
    reset: () => void;
    goBack: () => void;
}

// ==== HOOK ====

export const useRegisterAdmin = ({
    onSuccess,
    onError
}: UseRegisterAdminOptions = {}): UseRegisterAdminReturn => {

    // === ESTADO ===
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // === HOOKS ===
    const navigate = useNavigate();
    const { accessToken } = useAuthStore();


    // === FUNCIONES AUXILIARES ===
    const clearError = () => setError(null);

    const reset = () => {
        setError(null);
        setSuccess(false);
        setLoading(false);
    }
    const goBack = () => {
        navigate(ROUTES.ADMIN_DASHBOARD);
    }

    // === FUNCION PRINCIPAL ===    
    const registerAdmin = async (data: AdminUserRequest): Promise<void> => {
        try {
            // 1. validamos token
            if(!accessToken){
                throw new Error("No hay token de acceso");
            }
            // 2. Iniciar proceso
            setLoading(true);
            setError(null);
            setSuccess(false);

            // 3. LLamamos al adapter 
            await AdminDashboardAdapter.createAdminUser(data, accessToken);

            // 4. Exito 
            setSuccess(true);
            onSuccess?.()

            // 5. Redireccionamos al dashboard de administrador
            goBack();

        } catch (error) {
            // 6. validamos posibles errores
            const errorMessage = error instanceof Error ? error.message : "Error al registrar el usuario administrador";
            
            setError(errorMessage);
            onError?.(errorMessage);

            console.error("Error al registrar el usuario administrador: ", error);
        } finally {
            //7.  finalizamos
            setLoading(false);
        }
    }

    // === RETORNO ===
    return {
        // Estado
        loading,
        error,
        success,

        // Acciones
        registerAdmin,
        clearErrors: clearError,
        reset,
        goBack,
    }


}