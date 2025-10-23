// src/adapters/Dashboard/Admin/AdminDashboardAdapter.ts

import { createHealthProfessional } from "../../../services/Dashboard";
import type { HealthProfessionalRegisterResponse, HealthProfessionalRequest } from "../../../types/User";




/**
 * Adaptador para las operaciones del dashboard de administración
 * @description: Transforma los datos del servicio a un formato usable por la aplicación
 * @property: createHealthProfessional: Crea un profesional de salud.
 * @param healtProfessionalRequest: Datos del profesional de salud.
 * @param accessToken: Token de autenticación.
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
};
