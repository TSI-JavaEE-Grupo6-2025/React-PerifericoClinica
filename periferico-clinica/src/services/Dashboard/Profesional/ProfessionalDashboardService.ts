import type { CreateClinicalDocumentRequest } from '../../../types/clinical-document';
import API from '../../constants/Api';
import { ENDPOINTS_SERVICES } from '../../constants/Endpoints';
import type { AxiosResponse } from 'axios';

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
export const createDocument = async(documentRequest: CreateClinicalDocumentRequest, accessToken: string): Promise<AxiosResponse> => {

    try{
        console.log('Datos del documento enviados al backend: ', JSON.stringify(documentRequest, null, 2));
        const response = await API.post(ENDPOINTS_SERVICES.DASHBOARD.PROFESIONAL.CREATE_DOCUMENT, documentRequest, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
        return Promise.resolve(response);

    }catch(error){
        console.error('Error al crear el documento: ', error);
        return Promise.reject(error);
    }

}

/**
 * Servicio para obtener los motivos de consulta
 * @description: Realiza una solicitud para obtener los motivos de consulta en el backend.
 * @param accessToken: Token de autenticación.
 * @returns: Promise que resuelve con la respuesta del servidor o rechaza con el error
 * @example: 
 * ```typescript
 * const accessToken = '1234567890';
 * const response = await getConsultationReasons(accessToken);
 * console.log('Respuesta del servidor: ', JSON.stringify(response.data, null, 2));
 * ```  
 */
export const getConsultationReasons = async (accessToken: string): Promise<AxiosResponse> => {
    try{
        const response = await API.get(ENDPOINTS_SERVICES.DASHBOARD.PROFESIONAL.GET_CONSULTATION_REASONS,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        return Promise.resolve(response);
    }catch(error){
        console.error('Error al obtener los motivos de consulta: ', error);
        return Promise.reject(error);
    }
}