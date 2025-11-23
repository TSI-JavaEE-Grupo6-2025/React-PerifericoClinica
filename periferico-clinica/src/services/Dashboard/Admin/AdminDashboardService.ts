import API from "../../constants/Api";
import { ENDPOINTS_SERVICES } from "../../constants/Endpoints";
import type { AdminUserRequest, HealthProfessionalRequest, HealthUserRequest } from "../../../types/User";
import { handleServiceError } from "../../../utils";
import type { UpdateClinicRequest } from "../../../types";
import * as serviceHandler from "../../helper/serviceHelper"


/**
 * Servicio para crear un profesional de salud
 * @description: Realiza una solicitud para crear un profesional de salud en el backend.
 * @param healtProfessionalRequest: Datos del profesional de salud.
 * @param accessToken: Token de autenticación.
 * @returns: Devuelve la respuesta del servidor.
 */

export const createHealthProfessional = async (healtProfessionalRequest: HealthProfessionalRequest, accessToken: string) => {
    try {

        const response = await API.post(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.CREATE_PROFESIONAL, healtProfessionalRequest, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
        console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
        return response;
    } catch (error) {
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
    try {
        const response = await API.post(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.CREATE_HEALTH_USER, healthUserRequest, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
        return response;
    } catch (error) {
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
    try {
        const response = await API.post(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.CREATE_ADMIN_USER, adminUserRequest, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
        return response;
    } catch (error) {
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

    try {
        const response = await API.get(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.GET_HEALTH_USERS, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
        return response;
    } catch (error) {
        console.error('Error al obtener los usuarios de salud: ', error);
        throw new Error('Error al obtener los usuarios de salud: ' + error);
    }
}

export const getHealthProfessionals = async (accessToken: string) => {
    try {
        const response = await API.get(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.GET_PROFESIONALS, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2))
        return response;
    } catch (error) {
        handleServiceError(error, 'Error al obtener los profesionales de salud')
    }
}



export const getAdminUser = async (accessToken: string) => {
    try {
        const response = await API.get(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.GET_ADMIN_USERS, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2))
        return response;
    } catch (error) {
        handleServiceError(error, 'Error al obtener los profesionales de salud')
    }
}


export const getClinicInfoByTenant = async (tenantId: string, accessToken: string) => {
    try {
        const response = await API.get(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.GET_CLINIC_INFO.replace(':tenantId', tenantId), {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2))
        return response
    } catch (error) {
        handleServiceError(error, 'Error al obtener información de la clínica')
    }
}

/**
 * Servicio para actualizar los datos de la clínica
 * @description: Actualiza los datos de la clínica, maneja archivos con FormData y datos simples con JSON
 * @param tenantId - ID del tenant/clínica
 * @param clinicData - Datos de la clínica a actualizar
 * @param accessToken - Token de autenticación
 * @returns Respuesta del servidor con los datos actualizados
 */
export const updateClinicDataByTenant = async (
    tenantId: string,
    clinicData: UpdateClinicRequest,
    accessToken: string
) => {
    // Log mejorado de datos (maneja File correctamente)
    serviceHandler.logClinicData(clinicData)
    
    try {
        const endpoint = ENDPOINTS_SERVICES.DASHBOARD.ADMIN.PUT_UPDATE_CLINIC.replace(':tenantId', tenantId)
        const hasFile = serviceHandler.hasFile(clinicData)

        if(hasFile){
            // Construir FormData usando serviceHelper
            const formData = serviceHandler.buildFormData(clinicData)
            // Log de información del archivo
            serviceHandler.logFileInfo(clinicData.logoFile as File)
            // Construir headers para multipart/form-data
            const headers = serviceHandler.buildHeaders(accessToken, { hasFile: true })
            
            const response = await API.put(endpoint, formData, { headers })
            console.log('Respuesta del backend ', response)
            return response
            
        } else {
            // Enviar como JSON (sin archivo)
            const headers = serviceHandler.buildHeaders(accessToken, { hasFile: false })
            const response = await API.put(endpoint, clinicData, { headers })
            console.log('Respuesta del backend ', response)
            return response
        }
    } catch (error) {
        handleServiceError(error, 'Error al actualizar los datos de la clínica.')
    }
}


