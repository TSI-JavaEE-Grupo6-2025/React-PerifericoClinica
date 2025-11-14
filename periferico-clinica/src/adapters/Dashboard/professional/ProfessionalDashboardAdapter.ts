import { createDocument, getConsultationReasons, getProblemsStatus, getCertaintyLevels, getProfessionalInfo, getClinicalDocumentById, getPatientBasicInfo, getClinicHistoryPatientByDocumentAndSpecialty } from "../../../services/Dashboard";
import type { ClinicalDocumentResponse, SnomedCatalogListResponse, CreateClinicalDocumentRequest, ClinicalDocumentXMLResponse, PatientBasicInfo } from "../../../types/clinical-document";
import type { ProfessionalInfoResponse } from "../../../types/User";
import type { ClinicalHistoryResponse } from "../../../types/clinical-history";

import { handleServiceCall } from "../../helper/handleservice";


// por ahora tendra campos any , luego se haran sus interfaces
export const ProfessionalDashboardAdapter = {
    createDocument: async (documentRequest: CreateClinicalDocumentRequest, accessToken: string): Promise<ClinicalDocumentResponse> => {
        return handleServiceCall({
            serviceFunction: createDocument,
            errorMessage: 'Error al crear el documento',
            params: [documentRequest, accessToken],
        })
    },
    getConsultationReasons: async (accessToken: string, search?: string): Promise<SnomedCatalogListResponse> => {
        return handleServiceCall({
            serviceFunction: getConsultationReasons,
            errorMessage: 'Error al obtener los motivos de consulta',
            params: [accessToken, search],
        })
    },
    getProblemsStatus: async (accessToken: string): Promise<SnomedCatalogListResponse> => {
        return handleServiceCall({
            serviceFunction: getProblemsStatus,
            errorMessage: 'Error al obtener los problemas',
            params: [accessToken],
        })
    },
    getCertaintyLevels: async (accessToken: string): Promise<SnomedCatalogListResponse> => {
        return handleServiceCall({
            serviceFunction: getCertaintyLevels,
            errorMessage: 'Error al obtener los grados de certeza',
            params: [accessToken],
        })
    },
    getProfessionalInfo: async (accessToken: string): Promise<ProfessionalInfoResponse> => {
        return handleServiceCall({
            serviceFunction: getProfessionalInfo,
            errorMessage: 'Error al obtener las especialidades del professional',
            params: [accessToken],
        })
    },
    getPatientBasicInfo: async (documentNumber: string, accessToken: string): Promise<PatientBasicInfo> => {
        return handleServiceCall({
            serviceFunction: getPatientBasicInfo,
            errorMessage: 'Error al obtener la información basica del paciente',
            params: [documentNumber, accessToken],
        })
    },
    getClinicalDocumentById: async (id: string, accessToken: string): Promise<ClinicalDocumentXMLResponse | null> => {
        try {
            const clinicalDocumentResponseData = await getClinicalDocumentById(id, accessToken);
            const xmlSource = clinicalDocumentResponseData?.data

            if (typeof xmlSource !== "string") {
                return null;
            }

            const xmlDocument = new DOMParser().parseFromString(xmlSource, "application/xml");
            return xmlDocument
        } catch (error) {
            console.error('Error al obtener el documento clínico: ', error);
            throw new Error('Error al obtener el documento clínico: ' + error);
        }
    },

    getClinicHistoryPatient: async (documentNumber: string, specialtyId: string, accessToken: string): Promise<ClinicalHistoryResponse> => {
        return handleServiceCall({
            serviceFunction: getClinicHistoryPatientByDocumentAndSpecialty,
            errorMessage: 'Error al obtener la historia clínica del paciente',
            params: [documentNumber, specialtyId, accessToken],
        })
    }


}