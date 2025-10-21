// src/services/Dashboard/Admin/AdminDashboardService.ts
import API from '../../constants/Api';
import { ENDPOINTS_SERVICES } from '../../constants/Endpoints';

import type { AxiosResponse } from 'axios';
import type { UserRegistrationData, HealthProfessional, HealthUser } from '../../../types/User';



/**
 * Servicio para crear un nuevo usuario (administrador)
 * @param userData - Datos del nuevo usuario
 * @returns Promise con la respuesta de la API
 */
export const createAdminUser = async (adminUserData: UserRegistrationData): Promise<AxiosResponse> => {
    try {
        const response = await API.post(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.CREATE_ADMIN_USER,adminUserData);
        return Promise.resolve(response.data);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return Promise.reject(error);
    }
};

/**
 * Servicio para crear un nuevo profesional de salud
 * @param professionalData - Datos del nuevo profesional
 * @returns Promise con la respuesta de la API
 */
export const createProfessional = async (professionalData: HealthProfessional): Promise<AxiosResponse> => {
    try {
        const response = await API.post(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.CREATE_PROFESIONAL, professionalData);
        return Promise.resolve(response.data);
    } catch (error) {
        console.error('Error al crear profesional:', error);
        return Promise.reject(error);
    }
};

/**
 * Servicio para crear un nuevo usuario de salud
 * @param healthUserData : Datos del nuevo usuario de salud
 * @returns Promise con la respuesta de la API
 */

export const createHealthUser = async (healthUserData: HealthUser): Promise<AxiosResponse> => {
    try{
        const response = await API.post(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.CREATE_HEALTH_USER, healthUserData);
        return Promise.resolve(response.data);
    }catch(error){
        console.error('Error al crear usuario de salud:', error);
        return Promise.reject(error);
    }
}

export const getUsers = async (): Promise<AxiosResponse> => {
    try{
        const response = await API.get(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.GET_USERS);
        return Promise.resolve(response.data);
    }catch(error){
        console.error('Error al obtener usuarios:', error);
        return Promise.reject(error);
    }
}

export const getProfessionals = async (): Promise<AxiosResponse> => {
    try{
        const response = await API.get(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.GET_PROFESIONALS);
        return Promise.resolve(response.data);
    }catch(error){
        console.error('Error al obtener profesionales:', error);
        return Promise.reject(error);
    }
}

export const getHealthUsers = async (): Promise<AxiosResponse> => {
    try{
        const response = await API.get(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.GET_HEALTH_USERS);
        return Promise.resolve(response.data);
    }catch(error){
        console.error('Error al obtener usuarios de salud:', error);
        return Promise.reject(error);
    }
}
