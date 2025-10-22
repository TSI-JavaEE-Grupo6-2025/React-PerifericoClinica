import API from "../../constants/Api";
import { ENDPOINTS_SERVICES } from "../../constants/Endpoints";
import type { HealthProfessionalRequest } from "../../../types/User";
import type { AxiosResponse } from "axios";




export const createHealthProfessional = async (healtProfessionalRequest: HealthProfessionalRequest): Promise<AxiosResponse> => {
    try{
        const response = await API.post(ENDPOINTS_SERVICES.DASHBOARD.ADMIN.CREATE_PROFESIONAL, healtProfessionalRequest);
        console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
        return Promise.resolve(response);
    }catch(error){
        console.error('Error al crear el profesional de salud: ', error);
        return Promise.reject(error);
    }
    
}