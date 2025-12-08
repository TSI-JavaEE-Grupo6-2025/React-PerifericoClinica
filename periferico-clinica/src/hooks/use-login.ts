// hook para la autenticación de usuarios administradores y profesionales

import { UserCredentials } from '../value-objects/UserCredentials';
import { AuthAdapter } from '../adapters/Auth/AuthAdapter';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../store/AuthStore';
import { useTenantId } from './use-tenant';
import { ROUTES } from '../routes/constants/routes';
import type { UserRole } from '../types';

export const useLogin = (expectedRole?: UserRole) => {
    const navigate = useNavigate();
    // hook login
    const { login: storeLogin } = useAuthStore();
    // obtenemos el tenantId del store
    const tenantIdStore = useTenantId() || '';
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    // simular autenticación
    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const userCredentials = UserCredentials.fromForm(email, password, tenantIdStore, expectedRole); // acordarse de que tenantid viene del store
            const responseAuthData = await AuthAdapter.login(userCredentials);
            const { accessToken, tenantId, user } = responseAuthData;

            if (expectedRole && user.role !== expectedRole) {
                const roleName = {
                    ADMIN_CLINIC: 'Administrador',
                    PROFESSIONAL: 'Profesional de Salud'
                }
                const expectedRoleName = roleName[expectedRole];
                const currentRoleName = roleName[user.role as keyof typeof roleName] || user.role;

                setError(`
                    Este formulario es para ${expectedRoleName}. Usted está registrado como ${currentRoleName}. Por favor, use el formulario de login correcto.
                    `);
                return Promise.reject(new Error(`Rol no válido para la autenticación`));
            }
            // guardamos los datos en el store
            storeLogin(accessToken, tenantId, user);
            // según el role del usuario, redireccionamos a la página correspondiente
            if (user.role === 'ADMIN_CLINIC') {
                navigate(ROUTES.ADMIN_DASHBOARD);
            } else if (user.role === 'PROFESSIONAL') {

                navigate(ROUTES.PROFESIONAL_DASHBOARD);
            } else {
                setError('Rol no válido para la autenticación');
                return Promise.reject(new Error('Rol no válido para la autenticación'))
            }

            return Promise.resolve();
        } catch (error) {
            // Capturar el mensaje de error y mostrarlo en la UI
            const errorMessage = error instanceof Error ? error.message : 'Error inesperado durante el login';
            setError(errorMessage);

            // Solo limpiar storage si es un error de autenticación, no de validación
            if (errorMessage.includes('Credenciales incorrectas') || errorMessage.includes('autenticación')) {
                localStorage.removeItem('tenant-storage');
                sessionStorage.removeItem('auth-storage');
            }

            return Promise.reject(errorMessage);
        } finally {
            setLoading(false);
        }
    }


    return { handleLogin, error, loading }

}
