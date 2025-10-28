// src/adapters/Dashboard/Admin/AdminDashboardAdapter.ts

import { createHealthProfessional, createHealthUser,createAdminUser ,getSpecialities, getHealthUsers } from "../../../services/Dashboard";
import type { AdminUserRegisterResponse, AdminUserRequest, HealthProfessionalRegisterResponse, HealthProfessionalRequest, HealthUserListResponse, HealthUserRegisterResponse, HealthUserRequest } from "../../../types/User";
import type { SpecialityResponse } from "../../../types/Specialty";



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
    },
    createAdminUser: async (adminUserRequest: AdminUserRequest, accessToken: string): Promise<AdminUserRegisterResponse> => {
        try{
            const response = await createAdminUser(adminUserRequest, accessToken);
            return Promise.resolve(response.data);
        }catch(error){
            console.error('Error al crear el usuario administrador: ', error);
            return Promise.reject(error);
        }
    },
    getSpecialities: async (accessToken: string): Promise<SpecialityResponse> => {
        try{
            const specialities = await getSpecialities(accessToken);
            return Promise.resolve(specialities.data as SpecialityResponse);
        }catch(error){
            console.error('Error al obtener las especialidades: ', error);
            return Promise.reject(error);
        }
    },
    getHealthUsers: async (accessToken: string): Promise<HealthUserListResponse> => {
        try{
            const healthUsers = await getHealthUsers(accessToken);
            return Promise.resolve(healthUsers.data as HealthUserListResponse);
        }catch(error){
            console.error('Error al obtener los usuarios de salud: ', error);
            return Promise.reject(error);
        }
    }
};
