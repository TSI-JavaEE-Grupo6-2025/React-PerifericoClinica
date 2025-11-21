// src/adapters/Dashboard/Admin/AdminDashboardAdapter.ts

import { createHealthProfessional, createHealthUser, createAdminUser, getSpecialities, getHealthUsers, getHealthProfessionals, getAdminUser, getClinicInfoByTenant, updateClinicDataByTenant } from "../../../services/Dashboard";
import type { AdminUserListResponse, AdminUserRegisterResponse, AdminUserRequest, HealthProfessionalRegisterResponse, HealthProfessionalRequest, HealthUserListResponse, HealthUserRegisterResponse, HealthUserRequest, ProfessionalInfoResponse } from "../../../types/User";
import type { SpecialityResponse } from "../../../types/Specialty";
import type { UpdateClinicRequest, ClinicResponse } from "../../../types";



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
            return response?.data;
        } catch (error) {
            console.error('Error al crear el profesional de salud: ', error);
            throw new Error('Error al crear el profesional de salud: ' + error);
        }
    },
    createHealthUser: async (healthUserRequest: HealthUserRequest, accessToken: string): Promise<HealthUserRegisterResponse> => {
        try {
            const response = await createHealthUser(healthUserRequest, accessToken);
            console.log('Respuesta del servidor: ', JSON.stringify(response?.data, null, 2));
            return response?.data as HealthUserRegisterResponse
        } catch (error) {
            throw new Error('Error al crear el usuario de salud: ' + error);
        }
    },
    createAdminUser: async (adminUserRequest: AdminUserRequest, accessToken: string): Promise<AdminUserRegisterResponse> => {
        try {
            const response = await createAdminUser(adminUserRequest, accessToken);
            return response?.data as AdminUserRegisterResponse
        } catch (error) {
            throw new Error('Error al crear el usuario administrador: ' + error);
        }
    },
    getSpecialities: async (accessToken: string): Promise<SpecialityResponse> => {
        try {
            const specialities = await getSpecialities(accessToken);
            return specialities?.data as SpecialityResponse
        } catch (error) {
            throw new Error('Error al obtener las especialidades: ' + error);
        }
    },
    getHealthUsers: async (accessToken: string): Promise<HealthUserListResponse> => {
        try {
            const healthUsers = await getHealthUsers(accessToken);
            return healthUsers?.data as HealthUserListResponse
        } catch (error) {
            throw new Error('Error al obtener los usuarios de salud: ' + error);
        }
    },
    getAdminUsers: async (accessToken: string): Promise<AdminUserListResponse> => {
        try {
            const adminUsers = await getAdminUser(accessToken)
            return adminUsers?.data as AdminUserListResponse
        } catch (error) {
            throw new Error('Error al obtener los usuariso administradores: ' + error)
        }
    },
    getProfessioanlUsers: async (accessToken: string): Promise<ProfessionalInfoResponse> => {
        try {
            const professionalUsers = await getHealthProfessionals(accessToken)
            return professionalUsers?.data as ProfessionalInfoResponse
        } catch (error) {
            throw new Error('Error al obtener los usuariso administradores: ' + error)
        }
    },
    getClinicInfo: async (tenantId: string, accessToken: string) => {
        try {
            const clinicData = await getClinicInfoByTenant(tenantId, accessToken)
            return clinicData?.data
        } catch (error) {
            throw new Error('Error al obtener la información de la clínica ' + error)
        }
    },
    updateClinic: async (tenantId: string, clinicData: UpdateClinicRequest, accessToken: string): Promise<ClinicResponse> => {
        try{
            const updateData = await updateClinicDataByTenant(tenantId,clinicData,accessToken);
            return updateData?.data as ClinicResponse
        }catch(error){
            throw new Error('Error al actualizar la información de la clínica '+ error);
        }
    }

};
