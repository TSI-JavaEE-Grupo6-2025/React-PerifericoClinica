import type { ClinicHistoryResponse } from "../../../types/clinical-history";




/**
 * Tipo para el resultado de la validación
 * @property {boolean} isValid - Indica si la respuesta es válida
 * @property {string} error - Mensaje de error si la respuesta no es válida
 */
interface ValidationResult {
    isValid: boolean;
    error?: string;
}
/**
 * Mensajes de error para la validación
 * @property {string} RESPONSE_NULL - La respuesta no puede ser null o undefined
 * @property {string} XML_CONTENT_MISSING - No se puede transformar un XML vacío
 * @property {string} XML_CONTENT_INVALID_TYPE - xmlContent debe ser un string
 * @property {string} XSL_METADATA_MISSING - No se puede transformar sin metadata XSL
 * @property {string} XSL_METADATA_INVALID_TYPE - xslMetadata debe ser un objeto
 * @property {string} XSL_METADATA_NAMESPACE_MISSING - xslMetadata.namespace es requerido
 * @property {string} XSL_METADATA_TEMPLATE_IDS_MISSING - xslMetadata.templateIds es requerido
 * @property {string} XSL_METADATA_CODE_SYSTEMS_MISSING - xslMetadata.codeSystems es requerido
 */
const ERROR_MESSAGES = {
    RESPONSE_NULL: "La respuesta no puede ser null o undefined",
    XML_CONTENT_MISSING: "No se puede transformar un XML vacío",
    XML_CONTENT_INVALID_TYPE: "xmlContent debe ser un string",
    XSL_METADATA_MISSING: "No se puede transformar sin metadata XSL",
    XSL_METADATA_INVALID_TYPE: "xslMetadata debe ser un objeto",
    XSL_METADATA_NAMESPACE_MISSING: "xslMetadata.namespace es requerido",
    XSL_METADATA_TEMPLATE_IDS_MISSING: "xslMetadata.templateIds es requerido",
    XSL_METADATA_CODE_SYSTEMS_MISSING: "xslMetadata.codeSystems es requerido",
} as const;

export function validateResponse(response: ClinicHistoryResponse | null | undefined, throwOnError: boolean = false): ValidationResult | void {

    // validar que response existe
    if (response === null) {
        return errorHandler(ERROR_MESSAGES.RESPONSE_NULL, throwOnError)
    }

    // validamos el contenido del xml
    if (!response?.xmlContent) {
        return errorHandler(ERROR_MESSAGES.XML_CONTENT_MISSING, throwOnError);
    }
    if (typeof response.xmlContent !== 'string') {
        return errorHandler(ERROR_MESSAGES.XML_CONTENT_INVALID_TYPE, throwOnError);
    }
    if (response.xmlContent.trim().length === 0) {
        return errorHandler(ERROR_MESSAGES.XML_CONTENT_MISSING, throwOnError);
    }


    // validamos xsl
    if (!response.xslMetadata) {
        return errorHandler(ERROR_MESSAGES.XSL_METADATA_MISSING, throwOnError);
    }
    if(typeof response.xslMetadata !== 'object' || Array.isArray(response.xslMetadata)){
        return errorHandler(ERROR_MESSAGES.XSL_METADATA_INVALID_TYPE, throwOnError);
    }

    // validamos campos requeridos de xslMetadata (namespace, templateIds, codeSystems)
    if (!response.xslMetadata.namespace) {
        return errorHandler(ERROR_MESSAGES.XSL_METADATA_NAMESPACE_MISSING, throwOnError);
    }
    if (!response.xslMetadata.templateIds) {
        return errorHandler(ERROR_MESSAGES.XSL_METADATA_TEMPLATE_IDS_MISSING, throwOnError);
    }
    if (!response.xslMetadata.codeSystems) {
        return errorHandler(ERROR_MESSAGES.XSL_METADATA_CODE_SYSTEMS_MISSING, throwOnError);
    }

    if(throwOnError) return;
    return { isValid: true };

}


/**
 * Manejador de errores para la validación
 * @param error - Mensaje de error
 * @param throwOnError - Indica si se debe lanzar un error
 * @returns - Resultado de la validación
 */
function errorHandler(error: string, throwOnError: boolean): ValidationResult | void { 
    if (throwOnError) throw new Error(error);
    return { isValid: false, error };
}