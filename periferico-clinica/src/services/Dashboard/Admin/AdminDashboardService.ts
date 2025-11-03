import API from "../../constants/Api";
import { ENDPOINTS_SERVICES } from "../../constants/Endpoints";
import type { AdminUserRequest, HealthProfessionalRequest, HealthUserRequest } from "../../../types/User";
import { handleServiceError } from "../../../utils";


/**
 * Servicio para crear un profesional de salud
 * @description: Realiza una solicitud para crear un profesional de salud en el backend.
 * @param healtProfessionalRequest: Datos del profesional de salud.
 * @param accessToken: Token de autenticación.
 * @returns: Devuelve la respuesta del servidor.
 */

export const createHealthProfessional = async (healtProfessionalRequest: HealthProfessionalRequest, accessToken: string) => {
    try{
        
        const response = await API.post(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.CREATE_PROFESIONAL, healtProfessionalRequest,{
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
        return response;
    }catch(error){
        handleServiceError(error, 'Error al crear el profesional de salud')
    }
    
}

/**
 * Servicio para crear un usuario de salud
 * @description: Realiza una solicitud para crear un usuario de salud en el backend.
 * @param healthUserRequest: Datos del usuario de salud.
 * @param accessToken: Token de autenticación.
 * @returns: Promise que resuelve con la respuesta del servidor o rechaza con el error
 * @param healthUserRequest 
 * @param accessToken 
 * @returns Devuelve la respuesta del servidor.
 */
export const createHealthUser = async (healthUserRequest: HealthUserRequest, accessToken: string) => {
    try{
        const response = await API.post(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.CREATE_HEALTH_USER, healthUserRequest, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
        return response;
    }catch(error){
       handleServiceError(error, 'Error al crear el usuario de salud')
    }
    
}

/**
 * Servicio para crear un usuario administrador en el backend
 * @param adminUserRequest: Datos del usuario administrador.
 * @param accessToken: Token de autenticación.
 * @returns: Promise que resuelve con la respuesta del servidor o rechaza con el error
 */

export const createAdminUser = async (adminUserRequest: AdminUserRequest, accessToken: string) => {
    try{
        const response = await API.post(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.CREATE_ADMIN_USER, adminUserRequest, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
        return response;
    }catch(error){
        handleServiceError(error, 'Error al crear el usuario administrador')
    }
}


/**
 * Servicio para obtener los usuarios de salud
 * @description: Realiza una solicitud para obtener los usuarios de salud en el backend.
 * @param accessToken: Token de autenticación.
 * @returns: Devuelve la respuesta del servidor.
 */

export const getHealthUsers = async (accessToken: string) => {
   
   try{
        const response = await API.get(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.GET_HEALTH_USERS,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
        return response;
   }catch(error){
        console.error('Error al obtener los usuarios de salud: ', error);
        throw new Error('Error al obtener los usuarios de salud: ' + error);
   }
}


