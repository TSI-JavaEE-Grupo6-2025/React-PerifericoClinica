// hook para la autenticación de usuarios administradores y profesionales

import { UserCredentials } from '../value-objects/UserCredentials';
//import { AuthAdapter } from '../adapters/Auth/AuthAdapter';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
//import { useAuthStore } from '../store/AuthStore';
//import { useTenantId } from './use-tenant';
import { Email } from '../value-objects/Email';
import { ROUTES } from '../routes/constants/routes';

export const useLogin = () => {
    const navigate = useNavigate();
    // hook login
   // const { login: storeLogin} = useAuthStore();
    // obtenemos el tenantId del store
    const tenantId = '1'; //useTenantId() || '';
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    // simular autenticación
    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try{
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1000));
            
           
            const userCredentials = UserCredentials.fromForm(email,password, tenantId); // acordarse de que tenantid viene del store
            console.log('userCredentials creado: ', userCredentials);
            console.log('email: ', userCredentials.email.getValue());
            console.log('password: ', userCredentials.password.getValue());
            console.log('tenantId: ', userCredentials.tenantId);
            if(userCredentials.email.equals(new Email('admin@clinica.com')) && password === '12345678'){
                alert('Simulación de autenticación exitosa mediante custom hook');
                setError(null);   
                
                // llamo al servicio de autenticación atravez del adaptador authAdapter
                // obtenemos el access token, userData y tenantId
                // const responseAuthData = await AuthAdapter.login(userCredentials);
                // luego guardo el access token , tenantId y user Data en el store
                // storeLogin(accessToken, userData, tenantId)
                navigate(ROUTES.ADMIN_DASHBOARD)
                return Promise.resolve();
            }else if(userCredentials.email.equals(new Email('profesional@clinica.com')) && password === '12345678'){
                  alert('Simulación de autenticación exitosa como profesional');
                  setError(null);
                  navigate(ROUTES.PROFESIONAL_DASHBOARD);
                  return Promise.resolve();
            }else{
                const errorMessage: string = 'Credenciales incorrectas';
                setError(errorMessage);
            }

            return Promise.resolve();
        }catch(error){
            // Capturar el mensaje de error y mostrarlo en la UI
            const errorMessage = error instanceof Error ? error.message : 'Error inesperado durante el login';
            setError(errorMessage);
            
            // Solo limpiar storage si es un error de autenticación, no de validación
            if (errorMessage.includes('Credenciales incorrectas') || errorMessage.includes('autenticación')) {
                localStorage.removeItem('tenant-storage');
                sessionStorage.removeItem('auth-storage');
            }
            
            return Promise.reject(errorMessage);
        }finally{
            setLoading(false);
        }
    }


    return { handleLogin, error, loading}

}
