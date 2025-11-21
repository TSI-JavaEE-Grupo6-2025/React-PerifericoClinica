/**
 * Interfaz base para los datos comunes de la clínica
 * @description: Contiene los campos básicos que se repiten en diferentes interfaces
 * @prop name: Nombre de la clínica
 * @prop email: Email de la clínica
 * @prop logoUrl: Logo de la clínica
 */
export interface BaseClinicData {
    name?: string
    email?: string
    logoUrl?: string | null
}

/**
 * Interfaz base para las matadata
 * @prop createdAt: Fecha de creación
 * @prop updatedAt: Fecha de actualización
 */
export interface ClinicMetadata {
    createdAt: string
    updatedAt: string
}

/**
 * Interfaz para los colores de personalización de la clínica
 * @description: Esquema de colores reutilizable
 */
export interface ClinicColors {
    background: string
    text: string
}

/**
 * Interfaz de respuesta al obtener información de la clínica
 * @description: Contiene todos los datos de la clínica retornados por el backend
 * @prop name: Nombre de la clínica
 * @prop email: Email de la clínica
 * @prop logoUrl: Logo de la clínica
 * @prop tenantId: Identificador de la clínica
 * @prop domain: Dominio de al clínica
 * @prop active: actividad de la clínica (activo-inactiva)
 * @prop colors: Colores de personalización de la clínica
 */
export interface ClinicResponse extends BaseClinicData, ClinicMetadata {
    tenantId: string
    domain: string
    active: boolean
    colors?: ClinicColors
}

/**
 * Interfaz con la información para update clínic
 * @prop name: Nombre de la clínica
 * @prop email: Email de la clínica
 * @prop logoUrl: Url del logo de la clínica
 * @prop colors: Colores de la personalización de la clínica
 * 
 * @example
 * ```typescript
 * const updateClinic: UpdateClinicRequest {
 *  name: "Clínica pepito";
 *  email: "pepito@cli-pep.com";
 *  logoUrl: "https://...."
 *  colors: {
 *      background: "#2980b9",
 *      text: "#fffff"    
 *     }
 * }
 * ```
 */
export interface UpdateClinicRequest extends BaseClinicData {
    colors?: ClinicColors
}
