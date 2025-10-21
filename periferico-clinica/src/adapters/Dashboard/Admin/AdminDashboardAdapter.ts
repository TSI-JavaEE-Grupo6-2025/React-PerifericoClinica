// src/adapters/Dashboard/Admin/AdminDashboardAdapter.ts
import type { AxiosResponse } from 'axios';
import { createAdminUser, createProfessional, createHealthUser, getUsers, getProfessionals, getHealthUsers } from '../../../services/Dashboard/Admin/AdminDashboardService';
import type { UserRegistrationData, HealthProfessional, HealthUser } from '../../../types/User';


/**
 * Adaptador para las operaciones del dashboard de administración
 * @description: Transforma los datos del servicio a un formato usable por la aplicación
 */
export const AdminDashboardAdapter = {
    /**
     * Adapta y llama al servicio para crear un nuevo usuario administrador
     * @param userData - Datos del usuario administrador a crear
     * @returns Promise con los datos del usuario creado
     */
    createAdminUser: async (userData: UserRegistrationData): Promise<AxiosResponse> => {
        try {
            const response = await createAdminUser(userData);
            // Aquí podrías transformar la respuesta si el backend devuelve un formato diferente
            return Promise.resolve(response);
        } catch (error) {
            console.error('Error en el adaptador al crear usuario:', error);
            return Promise.reject(error);
        }
    },

    /**
     * Adapta y llama al servicio para crear un nuevo profesional
     * @param professionalData - Datos del profesional a crear
     * @returns Promise con los datos del profesional creado
     */
    createProfessional: async (professionalData: HealthProfessional): Promise<AxiosResponse> => {
        try {
            const response = await createProfessional(professionalData);
            // Aquí podrías transformar la respuesta
            return Promise.resolve(response);
        } catch (error) {
            console.error('Error en el adaptador al crear profesional:', error);
            return Promise.reject(error);
        }
    },

    createHealthUser: async (healthUserData: HealthUser): Promise<AxiosResponse> => {
        try {
            const response = await createHealthUser(healthUserData);
            return Promise.resolve(response);
        } catch (error) {
            console.error('Error en el adaptador al crear usuario de salud:', error);
            return Promise.reject(error);
        }
    },
    getUsers: async (): Promise<AxiosResponse> => {
        try {
            const response = await getUsers();
            return Promise.resolve(response);
        } catch (error) {
            console.error('Error en el adaptador al obtener usuarios:', error);
            return Promise.reject(error);
        }
    },
    getProfessionals: async (): Promise<AxiosResponse> => {
        try {
            const response = await getProfessionals();
            return Promise.resolve(response);
        } catch (error) {
            console.error('Error en el adaptador al obtener profesionales:', error);
            return Promise.reject(error);
        }
    },
    getHealthUsers: async (): Promise<AxiosResponse> => {
        try {
            const response = await getHealthUsers();
            return Promise.resolve(response);
        } catch (error) {
            console.error('Error en el adaptador al obtener usuarios de salud:', error);
            return Promise.reject(error);
        }
    },
};
