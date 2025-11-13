import type { CreateClinicalDocumentRequest } from '../../../types/clinical-document';
import API from '../../constants/Api';
import { ENDPOINTS_SERVICES } from '../../constants/Endpoints';


/**
 * Servicio para crear un documento clínico
 * @description: Realiza una solicitud para crear un documento clínico en el backend.
 * @param documentRequest: Datos del documento clínico.
 * @param accessToken: Token de autenticación.
 * @returns: Promise que resuelve con la respuesta del servidor o rechaza con el error
 * @example: 
 * ```typescript
 * const documentRequest = {
 *   title: 'Consulta médica',
 *   consultationDate: '30/10/2025',
 *   patientId: '1234567890',
 *   professionalId: '1234567890',
 *   tenantId: '1234567890',
 *   consultationReasons: [{ code: '1234567890', displayName: 'Consulta médica' }],
 *   diagnoses: [{ code: '1234567890', displayName: 'Consulta médica', startDate: '30/10/2025', problemStatus: 'ACTIVO', certaintyLevel: 'CONFIRMADO', notes: 'Notas de la consulta' }],
 *   followUpInstructions: { nextConsultationDate: '30/10/2025', nextConsultationDescription: 'Consulta médica', referralInstructions: 'Instrucciones de seguimiento', additionalNotes: 'Notas adicionales' },
 *   clinicalNotes: 'Notas clínicas',
 *   physicalExamination: 'Examen físico',
 *   vitalSigns: { bloodPressure: '120/80', heartRate: 70, temperature: 37, weight: 70, height: 170 },
 *   status: 'DRAFT'
 * }
 * const accessToken = '1234567890';
 * const response = await createDocument(documentRequest, accessToken);
 * console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
 * ```  
 */
export const createDocument = async (documentRequest: CreateClinicalDocumentRequest, accessToken: string) => {

    try {
        console.log('Datos del documento enviados al backend: ', JSON.stringify(documentRequest, null, 2));
        const response = await API.post(ENDPOINTS_SERVICES.DASHBOARD.PROFESIONAL.CREATE_DOCUMENT, documentRequest, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
        return response

    } catch (error) {
        console.error('Error al crear el documento: ', error);
        throw new Error('Error al crear el documento: ' + error)
    }

}

/**
 * Servicio para obtener los motivos de consulta
 * @description: Realiza una solicitud para obtener los motivos de consulta en el backend.
 * @param accessToken: Token de autenticación.
 * @param search: Búsqueda opcional para filtrar los motivos de consulta.
 * @returns: Promise que resuelve con la respuesta del servidor o rechaza con el error
 * @example: 
 * ```typescript
 * const accessToken = '1234567890';
 * const search = 'Consulta médica';
 * const response = await getConsultationReasons(accessToken, search);
 * 
 * console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
 * ``` 
 * 
 * ```typescript
 * // si se desea obtener todos los motivos de consulta, se puede hacer de la siguiente manera:
 * const response = await getConsultationReasons(accessToken);
 * console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
 * 
 * ```
 */
export const getConsultationReasons = async (accessToken: string, search?: string) => {

    try {
        const url = search ? ENDPOINTS_SERVICES.DASHBOARD.PROFESIONAL.GET_ESPECIFIC_CONSULTATION_REASON.replace(':search', search)
            : ENDPOINTS_SERVICES.DASHBOARD.PROFESIONAL.GET_CONSULTATION_REASONS;

        const response = await API.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        console.log('Vino a buscar los motivos de consulta')
        return response
    } catch (error) {
        console.error('Error al obtener los motivos de consulta: ', error);
        throw new Error('Error al obtener los motivos de consulta: ' + error)
    }
}

/**
 * 
 * @param accessToken: Token de autenticación.
 * @returns: Promise que resuelve con la respuesta del servidor o rechaza con el error
 * @example: 
 * ```typescript
 * const accessToken = '1234567890';
 * const response = await getProblemsStatus(accessToken);
 * console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
 * ```  
 */
export const getProblemsStatus = async (accessToken: string) => {
    try {
        const response = await API.get(ENDPOINTS_SERVICES.DASHBOARD.PROFESIONAL.GET_PROBLEMS_STATUS, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        console.log('Vino a buscar los problemas')
        return response
    } catch (error) {
        console.error('Error al obtener los problemas: ', error);
        throw new Error('Error al obtener los problemas: ' + error)
    }
}

/**
 * Servicio para obtener los grados de certeza
 * @description: Realiza una solicitud para obtener los grados de certeza en el backend.
 * @param accessToken: Token de autenticación.
 * @returns: Promise que resuelve con la respuesta del servidor o rechaza con el error
 * @example: 
 * ```typescript
 * const accessToken = '1234567890';
 * const response = await getCertaintyLevels(accessToken);
 * console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
 * ```  
 */
export const getCertaintyLevels = async (accessToken: string) => {
    try {
        const response = await API.get(ENDPOINTS_SERVICES.DASHBOARD.PROFESIONAL.GET_CERTAINTY_LEVEL, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        return response
    }
    catch (error) {
        console.error('Error al obtener los grados de certeza: ', error);
        throw new Error('Error al obtener los grados de certeza: ' + error)
    }
}


// obtener las especialidades del professional

export const getProfessionalInfo = async (accessToken: string) => {
    try {
        const response = await API.get(ENDPOINTS_SERVICES.DASHBOARD.PROFESIONAL.GET_PROFESSIONAL_INFO, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        return response
    } catch (error) {
        console.error('Error al obtener las especialidades del professional: ', error);
        throw new Error('Error al obtener las especialidades del professional: ' + error)
    }

}

// obtiene la información  de un paciente por su documento
export const getPatientBasicInfo = async (documentNumber: string, accessToken: string) => {
    try {
        const response = await API.get(ENDPOINTS_SERVICES.DASHBOARD.PROFESIONAL.GET_PATIENT_BASIC_INFO.replace(":documentNumber", documentNumber), {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        return response
    } catch (error) {
        console.error('Error al obtener la información basica del paciente: ', error);
        throw new Error('Error al obtener la información basica del paciente: ' + error)
    }
}


// obtiene el documento clínico por su ID -> XML
export const getClinicalDocumentById = async (id: string, accessToken: string) => {
    try {
        const develop: boolean = true;
        const url = develop ? ENDPOINTS_SERVICES.DASHBOARD.PROFESIONAL.GET_CLINIC_DOCUMENT.replace(':id', id)// /documents/:id
            : ENDPOINTS_SERVICES.DASHBOARD.PROFESIONAL.VIEW_CLINIC_DOCUMENT.replace(':id', id) // /documents/view/:id

        const response = await API.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            responseType: "text",
            transformResponse: [(data) => data],
        });
        return response
    } catch (error) {
        console.error('Error al obtener el documento clínico: ', error);
        throw new Error('Error al obtener el documento clínico: ' + error)
    }
}


// obtiene la historia clínica por documento de paciente y especialidad de la consulta
export const getClinicHistoryPatientByDocumentAndSpecialty = async (documentNumber: string, specialtyId: string, accessToken: string) => {
    try {
        const url = ENDPOINTS_SERVICES.DASHBOARD.PROFESIONAL.GET_CLINIC_HISTORY.
            replace(':patientDocumentNumber', documentNumber).
            replace(':specialtyId', specialtyId)
        const response = await API.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        return response

    } catch (error) {
        console.error('Error al obtener la historia clínica por documento de paciente y especialidad de la consulta: ', error);
        throw new Error('Error al obtener la historia clínica por documento de paciente y especialidad de la consulta: ' + error)
    }
}