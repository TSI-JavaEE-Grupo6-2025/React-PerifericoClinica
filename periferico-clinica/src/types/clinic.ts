/**
 * Interfaz base para los datos comunes de la clínica
 * @description: Contiene los campos básicos que se repiten en diferentes interfaces
 * @prop name: Nombre de la clínica
 * @prop email: Email de la clínica
 */
export interface BaseClinicData {
    name?: string
    email?: string
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
 * @prop sidebar: Color de la barra lateral izquierda (menú de opciones)
 * @prop primary: Color primario, utilizado en botones
 * @prop text: Color del texto
 */
export interface ClinicColors {
    sidebar: string
    primary: string
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
    logoUrl?: string | null
}

/**
 * Interfaz con la información para update clínic
 * @prop name: Nombre de la clínica
 * @prop email: Email de la clínica
 * @prop logoFile: Logo de la clínica (tipo File)
 * @prop colors: Colores de la personalización de la clínica
 * 
 * @example
 * ```typescript
 * const updateClinic: UpdateClinicRequest {
 *  name: "Clínica pepito";
 *  email: "pepito@cli-pep.com";
 *  logoFile: imagen.png
 *  colors: {
 *      sidebar: "#2c3e50",
 *      primary: "#2980b9"
 *      text: "#fffff"    
 *     }
 * }
 * ```
 */
export interface UpdateClinicRequest extends BaseClinicData {
    colors?: ClinicColors
    logoFile?: File
}
