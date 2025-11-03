// src/services/AuthService/AuthService.ts
import type { UserCredentials } from "../../value-objects/UserCredentials";
import API from "../constants/Api";
import { ENDPOINTS_SERVICES } from "../constants/Endpoints";


/**
 * Servicio de autenticación para usuarios administradores y profesionales de salud
 * @description: Realiza una solicitud de autenticación al backend.
 * @param userCredentials: Credenciales de usuario para autenticación.
 * @returns: Promise que resuelve con los datos del usuario autenticado o rechaza con el error
 */
export const login = async (userCredentials: UserCredentials) => {
    try{
        const response = await API.post(ENDPOINTS_SERVICES.AUTH.LOGIN, userCredentials.toBackendPayLoad());
        return response
    }catch(error){
        console.error('Error al iniciar sesión: ', error);
        throw new Error('Error al iniciar sesión: ' + error)
    }
}

/**
 * Servicio de cierre de sesión para 
 */

export const logout = async () => {
    try{
        await API.post(ENDPOINTS_SERVICES.AUTH.LOGOUT);
        console.log('Sesión cerrada correctamente');
    }catch(error){
        console.error('Error al cerrar sesión: ', error);
        throw new Error('Error al cerrar sesión: ' + error)
    }
}