import { createDocument, getConsultationReasons, getProblemsStatus, getCertaintyLevels, getProfessionalInfo, getClinicalDocumentById, getPatientBasicInfo, getClinicHistoryPatientByDocumentAndSpecialty } from "../../../services/Dashboard";
import type { ClinicalDocumentResponse, SnomedCatalogListResponse, CreateClinicalDocumentRequest, ClinicalDocumentXMLResponse, PatientBasicInfo} from "../../../types/clinical-document";
import type { ProfessionalInfoResponse } from "../../../types/User";
import type { ClinicalHistoryResponse } from "../../../types/clinical-history";



// por ahora tendra campos any , luego se haran sus interfaces
export const ProfessionalDashboardAdapter = {
    createDocument: async (documentRequest: CreateClinicalDocumentRequest, accessToken: string): Promise<ClinicalDocumentResponse> => {
        try{
            const documentResponseData = await createDocument(documentRequest,accessToken);
            return documentResponseData?.data as ClinicalDocumentResponse
        }catch(error){
            console.error('Error al crear el documento: ', error);
            throw new Error('Error al crear el documento: ' + error);
        }
    },
    getConsultationReasons: async (accessToken: string, search?: string): Promise<SnomedCatalogListResponse> => {
        try{
            const consultationReasonsResponseData = await getConsultationReasons(accessToken, search);
            return consultationReasonsResponseData?.data as SnomedCatalogListResponse
        }catch(error){
            console.error('Error al obtener los motivos de consulta: ', error);
            throw new Error('Error al obtener los motivos de consulta: ' + error);
        }
    },
    getProblemsStatus: async (accessToken: string): Promise<SnomedCatalogListResponse> => {

        try{
            const problemsStatusResponseData = await getProblemsStatus(accessToken);
            return problemsStatusResponseData?.data as SnomedCatalogListResponse
        }catch(error){
            console.error('Error al obtener los problemas: ', error);
            throw new Error('Error al obtener los problemas: ' + error);
        }   
    },
    getCertaintyLevels: async (accessToken: string): Promise<SnomedCatalogListResponse> => {
        try{
            const certaintyLevelsResponseData = await getCertaintyLevels(accessToken);
            return certaintyLevelsResponseData?.data as SnomedCatalogListResponse
        }catch(error){
            console.error('Error al obtener los grados de certeza: ', error);
            throw new Error('Error al obtener los grados de certeza: ' + error);
        }
    },
    getProfessionalInfo: async (accessToken: string): Promise<ProfessionalInfoResponse> => {
        try{
            const professionalInfoResponseData = await getProfessionalInfo(accessToken);
            return professionalInfoResponseData?.data as ProfessionalInfoResponse

        }catch(error){
            console.error('Error al obtener las especialidades del professional: ', error);
            throw new Error('Error al obtener las especialidades del professional: ' + error);
        }
    },
    getPatientBasicInfo: async (documentNumber: string, accessToken: string): Promise<PatientBasicInfo> => {
        try{
            const patientBasicResponseData = await getPatientBasicInfo(documentNumber, accessToken);
            return patientBasicResponseData?.data as PatientBasicInfo
        }catch(error){
            console.error('Error al obtener la información basica del paciente: ', error);
            throw new Error('Error al obtener la información basica del paciente: ' + error);
        }
    },
    getClinicalDocumentById: async (id: string, accessToken: string): Promise<ClinicalDocumentXMLResponse| null> => {
        try{
            const clinicalDocumentResponseData = await getClinicalDocumentById(id, accessToken);
            const xmlSource = clinicalDocumentResponseData?.data

            if (typeof xmlSource !== "string") {
                return null;
            }

            const xmlDocument = new DOMParser().parseFromString(xmlSource, "application/xml");
            return xmlDocument
        }catch(error){
            console.error('Error al obtener el documento clínico: ', error);
            throw new Error('Error al obtener el documento clínico: ' + error);
        }
    },

    getClinicHistoryPatient: async (documentNumber: string, specialtyId: string, accessToken: string): Promise<ClinicalHistoryResponse> => {
        try{
            const clinicHistoryResponseData = await getClinicHistoryPatientByDocumentAndSpecialty(documentNumber,specialtyId,accessToken);
            return clinicHistoryResponseData?.data as ClinicalHistoryResponse
        }catch(error){
            console.error('Error al obtener la historia clínica por documento de paciente y especialidad de la consulta: ', error);
            throw new Error('Error al obtener la historia clínica por documento de paciente y especialidad de la consulta: ' + error);
        }
    }

    
}