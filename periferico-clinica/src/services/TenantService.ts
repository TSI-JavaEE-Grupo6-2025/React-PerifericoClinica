import type { AxiosResponse } from "axios";
import API from "./constants/Api";
import { ENDPOINTS_SERVICES } from "./constants/Endpoints";




export const getTenantByDomain = async (domain: string): Promise<AxiosResponse> => {
    try{
        console.log('Obteniendo el tenant por dominio => ', domain);
        const response = await API.get(ENDPOINTS_SERVICES.TENANT.GET_BY_DOMAIN,{
            params: {
                domain: domain
            }
        })
        return Promise.resolve(response)

    }catch(error){
        console.error('Error al obtener el tenant por dominio: ', error);
        return Promise.reject(error);
    }
}