import { getTenantByDomain} from "../services";


/**
 * Adaptador de tenant para obtener el tenant por dominio
 * 
 * @description: Realiza la obtención del tenant por dominio y retorna los datos del tenant.
 * @property: getTenantByDomain: Realiza la obtención del tenant por dominio y retorna los datos del tenant.
 * @returns: Promise que resuelve con los datos del tenant o rechaza con el error
 */
export const TenantAdapter = {
    getTenantByDomain: async (domain: string) => {
        try{
            const response = await getTenantByDomain(domain);
            return Promise.resolve(response.data);
        }catch(error){
            console.error('Error al obtener el tenant por dominio: ', error);
            return Promise.reject(error);
        }
    }
}