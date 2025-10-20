// src/services/AuthService/AuthService.ts
import type { UserCredentials } from "../../value-objects/UserCredentials";
import API from "../Api";

const AUTH_ENDPOINTS = {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
}
/**
 * Servicio de autenticación para usuarios administradores y profesionales de salud
 * @description: Realiza una solicitud de autenticación al backend.
 * @param userCredentials: Credenciales de usuario para autenticación.
 * @returns: Promise que resuelve con los datos del usuario autenticado o rechaza con el error
 */
export const login = async (userCredentials: UserCredentials) => {
    try{
        const response = await API.post(AUTH_ENDPOINTS.LOGIN, userCredentials.toBackendPayLoad());
        // por ahora .
        return Promise.resolve(response) 
    }catch(error){
        console.error('Error al iniciar sesión: ', error);
        return Promise.reject(error);
    }
}

/**
 * Servicio de cierre de sesión para 
 */

export const logout = async (): Promise<void> => {
    try{
        await API.post(AUTH_ENDPOINTS.LOGOUT);
        return Promise.resolve();
    }catch(error){
        console.error('Error al cerrar sesión: ', error);
        return Promise.reject(error);
    }
}