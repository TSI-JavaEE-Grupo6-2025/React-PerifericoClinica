import API from "../../constants/Api";
import { ENDPOINTS_SERVICES } from "../../constants/Endpoints";
import type { HealthProfessionalRequest, HealthUserRequest } from "../../../types/User";
import type { AxiosResponse } from "axios";



/**
 * Servicio para crear un profesional de salud
 * @description: Realiza una solicitud para crear un profesional de salud en el backend.
 * @param healtProfessionalRequest: Datos del profesional de salud.
 * @param accessToken: Token de autenticación.
 * @returns: Promise que resuelve con la respuesta del servidor o rechaza con el error
 */

export const createHealthProfessional = async (healtProfessionalRequest: HealthProfessionalRequest, accessToken: string): Promise<AxiosResponse> => {
    try{
        console.log('HealthProfessionalRequest enviado al backend: ', JSON.stringify(healtProfessionalRequest, null, 2));
        const response = await API.post(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.CREATE_PROFESIONAL, healtProfessionalRequest,{
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
        return Promise.resolve(response);
    }catch(error){
        console.error('Error al crear el profesional de salud: ', error);
        return Promise.reject(error);
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
 * @returns Devuelve una promesa con la respuesta del servidor o rechaza con el error
 */
export const createHealthUser = async (healthUserRequest: HealthUserRequest, accessToken: string): Promise<AxiosResponse> => {
    try{
        const response = await API.post(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.CREATE_HEALTH_USER, healthUserRequest, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
        return Promise.resolve(response);
    }catch(error){
        console.error('Error al crear el usuario de salud: ', error);
        return Promise.reject(error);
    }
    
}