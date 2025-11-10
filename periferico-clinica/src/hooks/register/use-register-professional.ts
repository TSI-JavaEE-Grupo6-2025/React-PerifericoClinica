import { useState } from "react";
import { AdminDashboardAdapter } from "../../adapters";
import type { HealthProfessionalRequest } from "../../types/User";
import { useAuthStore } from "../../store/AuthStore";
import { ROUTES } from "../../routes";
import { useNavigate } from "react-router-dom";

// ==== TIPOS ====

interface UseRegisterProfessionalOptions {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export interface UseRegisterProfessionalReturn {
    // Estado
    loading: boolean;
    error: string | null;
    success: boolean;

    // Acciones
    registerProfessional: (data: HealthProfessionalRequest) => Promise<void>;
    clearError: () => void;
    reset: () => void;
    goBack: () => void;
}

// ==== HOOK ====

export const useRegisterProfessional = ({
    onSuccess,
    onError
}: UseRegisterProfessionalOptions = {}): UseRegisterProfessionalReturn => {
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
    
    const goBack = () => navigate(ROUTES.ADMIN_DASHBOARD);

    // === FUNCIÓN PRINCIPAL ===
    const registerProfessional = async (data: HealthProfessionalRequest): Promise<void> => {
        try {
            // 0. Validar datos específicos de profesional
            if (!data.email || !data.firstName || !data.lastName || !data.document) {
                throw new Error("Faltan datos requeridos del profesional");
            }
            
            // 1. Validar especialidades
            if (!data.specialtyIds || data.specialtyIds.length === 0) {
                throw new Error("Debe seleccionar al menos una especialidad");
            }

            // 2. Validar token
            if (!accessToken) {
                throw new Error("No hay token de acceso");
            }

            // 3. Iniciar proceso
            setLoading(true);
            setError(null);
            setSuccess(false);

            // 4. Llamar al adapter
            await AdminDashboardAdapter.createHealthProfessional(data, accessToken);
    
            // 5. Éxito
            setSuccess(true);
            onSuccess?.();

            // 6. Redireccionar al dashboard de administrador
            goBack();

        } catch (error) {
            // 7. Manejar errores
            let errorMessage = "Error al registrar el profesional de salud";
            
            if (error instanceof Error) {
                // Si el error ya tiene el mensaje del backend extraído
                errorMessage = error.message;
            }
            
            setError(errorMessage);
            onError?.(errorMessage);
        } finally {
            // 8. Finalizar
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
        registerProfessional,
        clearError,
        reset,
        goBack,
    }
}