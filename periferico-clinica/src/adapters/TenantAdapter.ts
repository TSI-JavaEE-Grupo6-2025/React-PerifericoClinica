import { getTenantByDomain} from "../services";
import type { TenantResponse } from "../types/tenant";

/**
 * Adaptador de tenant para obtener el tenant por dominio
 * 
 * @description: Realiza la obtención del tenant por dominio y retorna los datos del tenant.
 * @property: getTenantByDomain: Realiza la obtención del tenant por dominio y retorna los datos del tenant.
 * @returns: Promise que resuelve con los datos del tenant o rechaza con el error
 */
export const TenantAdapter = {
    getTenantByDomain: async (domain: string): Promise<TenantResponse> => {
        try{
            console.warn('Entrando a getTenantByDomain: ', domain)
            const response = await getTenantByDomain(domain);
            console.log('Respuesta del servicio de getTenant: ', JSON.stringify(response.data, null, 2));
            return response?.data as TenantResponse
        }catch(error){
            console.error('Error al obtener el tenant por dominio: ', error);
            throw new Error('Error al obtener el tenant por dominio: ' + error);
        }
    }
}