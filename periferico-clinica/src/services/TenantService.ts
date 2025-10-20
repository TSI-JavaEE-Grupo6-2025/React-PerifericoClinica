import type { AxiosResponse } from "axios";
import API from "./Api";

const TENANT_ENDPOINTS = {
    GET_TENANT_BY_DOMAIN: '/tenant/', // colocar la ruta correspondiente al servicio
}


export const getTenantByDomain = async (domain: string): Promise<AxiosResponse> => {
    try{
        const response = await API.get(TENANT_ENDPOINTS.GET_TENANT_BY_DOMAIN,{
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