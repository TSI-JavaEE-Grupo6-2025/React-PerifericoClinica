// src/adapters/Dashboard/Admin/AdminDashboardAdapter.ts

import { createHealthProfessional } from "../../../services/Dashboard";
import type { HealthProfessionalRegisterResponse, HealthProfessionalRequest } from "../../../types/User";




/**
 * Adaptador para las operaciones del dashboard de administración
 * @description: Transforma los datos del servicio a un formato usable por la aplicación
 */
export const AdminDashboardAdapter = {
    createHealthProfessional: async (healtProfessionalRequest: HealthProfessionalRequest): Promise<HealthProfessionalRegisterResponse> => {
        try {
            const response = await createHealthProfessional(healtProfessionalRequest);
            return Promise.resolve(response.data);
        } catch (error) {
            console.error('Error al crear el profesional de salud: ', error);
            return Promise.reject(error);
        }
    },
};
