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
 * @prop secondary: Color secundario
 * @prop background: Color de fondo
 * @prop text: Color del texto
 */
export interface ClinicColors {
    sidebar: string
    primary: string
    secondary: string
    background: string
    text: string
}

/**
 * Interfaz de respuesta al obtener información de la clínica
 * @description: Contiene todos los datos de la clínica retornados por el backend
 * @prop id: ID único de la clínica
 * @prop name: Nombre de la clínica
 * @prop email: Email de la clínica
 * @prop logoBase64: Logo de la clínica en formato base64
 * @prop tenantId: Identificador de la clínica
 * @prop domain: Dominio de al clínica
 * @prop active: actividad de la clínica (activo-inactiva)
 * @prop colors: Colores de personalización de la clínica
 */
export interface ClinicResponse extends BaseClinicData, ClinicMetadata {
    id: string
    tenantId: string
    domain: string
    active: boolean
    colors?: ClinicColors
    logoBase64?: string | null
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
 *      secondary: "#.."
 *      text: "#fffff",
 *      background: "#..."
 *          
 *     }
 * }
 * ```
 */
export interface UpdateClinicRequest extends BaseClinicData {
    colors?: ClinicColors
    logoFile?: File
}
