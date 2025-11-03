import { handleServiceError } from "../utils";
import API from "./constants/Api";
import { ENDPOINTS_SERVICES } from "./constants/Endpoints";




export const getTenantByDomain = async (domain: string) => {
    try{
        console.log('Obteniendo el tenant por dominio => ', domain);
        const response = await API.get(ENDPOINTS_SERVICES.TENANT.GET_BY_DOMAIN.replace(':domain', domain));
        return response

    }catch(error){
        console.error('Error al obtener el tenant por dominio: ', error);
        handleServiceError(error, 'Error al obtener el tenant por dominio')
    }
}