import { createDocument, getConsultationReasons } from "../../../services/Dashboard";
import type { ClinicalDocumentResponse, ConsultationReasonListResponse, CreateClinicalDocumentRequest } from "../../../types/clinical-document";



// por ahora tendra campos any , luego se haran sus interfaces
export const ProfessionalDashboardAdapter = {
    createDocument: async (documentRequest: CreateClinicalDocumentRequest, accessToken: string): Promise<ClinicalDocumentResponse> => {
        try{
            const documentResponseData = await createDocument(documentRequest,accessToken);
            return Promise.resolve(documentResponseData.data);
        }catch(error){
            console.error('Error al crear el documento: ', error);
            return Promise.reject(error);
        }
    },
    getConsultationReasons: async (accessToken: string): Promise<ConsultationReasonListResponse> => {
        try{
            const consultationReasonsResponseData = await getConsultationReasons(accessToken);
            return Promise.resolve(consultationReasonsResponseData.data);
        }catch(error){
            console.error('Error al obtener los motivos de consulta: ', error);
            return Promise.reject(error);
        }
    }
    
}