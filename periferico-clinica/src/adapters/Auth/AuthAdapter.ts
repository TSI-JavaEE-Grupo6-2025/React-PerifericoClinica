//src/adapters/Auth/AuthAdapter.ts
import type { UserCredentials } from "../../value-objects/UserCredentials";
import { login, logout } from "../../services/AuthService/AuthService";

/**
 * Adaptador de autenticación para usuarios administradores y profesionales 
 * @description: Realiza la autenticación de usuarios y retorna los datos del usuario autenticado.
 * @property: login: Realiza la autenticación de un usuario y retorna los datos del usuario autenticado.
 * @property: logout: Realiza el cierre de sesión del usuario actual.
 * @returns: Promise que resuelve con los datos del usuario autenticado o rechaza con el error
 */
export const AuthAdapter = {
    login: async (userCredentials: UserCredentials): Promise<string> => {
        try{
            const responseAuthData = await login(userCredentials);
            return Promise.resolve(responseAuthData.data);
        }catch(error){
            console.error('Error al iniciar sesión: ', error);
            return Promise.reject(error);
        }
    },
    logout: async (): Promise<void> => {
        try{
            await logout();
            return Promise.resolve();
        }catch(error){
            console.error('Error al cerrar sesión: ', error);
            return Promise.reject(error);
        }
    }
}