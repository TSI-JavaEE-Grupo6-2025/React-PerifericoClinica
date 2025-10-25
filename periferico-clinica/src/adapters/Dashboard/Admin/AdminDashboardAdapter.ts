// src/adapters/Dashboard/Admin/AdminDashboardAdapter.ts

import { createHealthProfessional, createHealthUser } from "../../../services/Dashboard";
import type { HealthProfessionalRegisterResponse, HealthProfessionalRequest, HealthUserRegisterResponse, HealthUserRequest } from "../../../types/User";




/**
 * Adaptador para las operaciones del dashboard de administración
 * @description: Transforma los datos del servicio a un formato usable por la aplicación
 * @property: createHealthProfessional: Crea un profesional de salud.
 * @property: createHealthUser: Crea un usuario de salud.
 * @returns: Promise que resuelve con los datos del profesional de salud creado o rechaza con el error
 */
export const AdminDashboardAdapter = {
    createHealthProfessional: async (healtProfessionalRequest: HealthProfessionalRequest, accessToken: string): Promise<HealthProfessionalRegisterResponse> => {
        try {
            const response = await createHealthProfessional(healtProfessionalRequest, accessToken);
            return Promise.resolve(response.data);
        } catch (error) {
            console.error('Error al crear el profesional de salud: ', error);
            return Promise.reject(error);
        }
    },
    createHealthUser: async (healthUserRequest: HealthUserRequest, accessToken: string): Promise<HealthUserRegisterResponse> => {
        try{
            const response = await createHealthUser(healthUserRequest, accessToken);
            console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
            return Promise.resolve(response.data)
        }catch(error){
            console.error('Error al crear el usuario de salud: ', error);
            return Promise.reject(error);
        }
    }
};
