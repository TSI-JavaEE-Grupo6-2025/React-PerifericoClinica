import { createHealthProfessional } from "../../services/UserService/UserService";
import type { HealthProfessionalRegisterResponse, HealthProfessionalRequest } from "../../types/User";
/**
 * Adaptador para las operaciones de usuarios
 * @namespace UserAdapter
 * @description: Transforma los datos recibidos de los servicios de usuarios a formato usable para la aplicación
 * 
 * @property {Function} createAdmin: Crea un nuevo usuario administrador
 * @property {Function} createHealthProfessional: Crea un nuevo usuario profesional de salud
 * @property {Function} createHealthUser: Crea un nuevo usuario de salud
 * 
 * 
 * @example
 * ```typescript
 *  const userData = {}
 *  const response = await UserAdapter.createAdmin(userData);
 * 
 * ```
 */
export const UserAdapter = {
    createHealthProfessional: async (healtProfessionalRequest: HealthProfessionalRequest): Promise<HealthProfessionalRegisterResponse> => {
        try {
            const response = await createHealthProfessional(healtProfessionalRequest);
            return Promise.resolve(response.data);
        } catch (error) {
            console.error('Error al crear el profesional de salud: ', error);
            return Promise.reject(error);
        }
    },

    // mas operaciones 
    //...
}


