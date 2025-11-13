
/**
 * Interfaz para la respuesta de la historia clínica por documento de paciente y especialidad de la consulta
 * @property {number} id - ID de la historia clínica
 * @property {string} fechaCreacion - Fecha de creación de la historia clínica
 * @property {string} nombrePrestador - Nombre del prestador
 * @property {string} nombreProfesional - Nombre del profesional
 * @property {number} nroCajaProfesional - Número de caja profesional
 * @property {string} nombrePaciente - Nombre del paciente
 * @property {number} nroDocumentoPaciente - Número de documento de paciente
 * @property {string} descripcion - Descripción de la historia clínica
 * @property {string} evento - Evento de la historia clínica
 * @property {string} documentId - ID del documento
 * @property {string} documentType - Tipo de documento
 * @property {string} consultationDate - Fecha de la consulta
 * @property {string} consultationSpecialityId - ID de la especialidad de la consulta
 * @property {string} tenantId - ID del tenant
 * @property {string} createdAt - Fecha de creación de la historia clínica
 * 
 * @example
 * ```typescript
 * const clinicalHistoryResponse = {
 *   id: 123,
 *   fechaCreacion: '2025-01-15T10:30:00',
 *   nombrePrestador: 'Clinica Braian',
 *   nombreProfesional: 'Dr. Juan Pérez',
 *   nroCajaProfesional: 12345,
 *   nombrePaciente: 'María González',
 *   nroDocumentoPaciente: 49057587,
 *   descripcion: 'Consulta por dolor de cabeza',
 *   evento: 'CONSULTATION',
 *   documentId: '69111a3f913299bb14b57915',
 *   documentType: 'CONSULTATION',
 *   consultationDate: '2025-01-15',
 *   consultationSpecialityId: 'NEU',
 *   tenantId: 'clinica-braian',
 *   createdAt: '2025-01-15T10:30:00'
 * }
 * ```
 */

export interface ClinicalHistoryResponse {
        id: number,
        fechaCreacion: string,
        nombrePrestador: string,
        nombreProfesional: string,
        nroCajaProfesional: number,
        nombrePaciente: string,
        nroDocumentoPaciente: number,
        descripcion: string,
        evento: string,
        documentId: string,
        documentType: string,
        consultationDate: string,
        consultationSpecialityId: string,
        tenantId: string,
        createdAt: string   
}