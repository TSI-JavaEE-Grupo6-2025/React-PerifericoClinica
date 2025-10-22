//src/adapters/Auth/AuthAdapter.ts
import type { UserCredentials } from "../../value-objects/UserCredentials";
import { login, logout } from "../../services/AuthService/AuthService";
import type { LoginResponse } from "../../types"

/**
 * Adaptador de autenticación para usuarios administradores y profesionales 
 * @description: Realiza la autenticación de usuarios y retorna los datos del usuario autenticado.
 * @property: login: Realiza la autenticación de un usuario y retorna los datos del usuario autenticado.
 * @property: logout: Realiza el cierre de sesión del usuario actual.
 * @returns: Devuelve una promesa con el formato de LoginResponse
 */
export const AuthAdapter = {
    login: async (userCredentials: UserCredentials): Promise<LoginResponse> => {
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