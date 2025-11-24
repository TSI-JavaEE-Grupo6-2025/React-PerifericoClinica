/**
 * Tipos para el tenant
 * 
 * Tenant: Datos del tenant
 */



/**
 * Interfaz de respuesta del adapter de tenant get by domain
 * 
 * @property {string} tenantId - ID del tenant
 * @property {string} name - Nombre del tenant
 * @property {string} domain - Dominio del tenant
 * @property {string} logoBase64 - Logo del tenant en formato base64
 * @property {object} color - Color del tenant (opcional)
 * @property {string} color.sidebar - Color de la barra lateral
 * @property {string} color.primary - Color primario 
 * @property {string} color.secondary - Color secundario
 * @property {string} color.background - Color de fondo del tenant
 * @property {string} color.text - Color de texto del tenant
 * 
 * @example
 * ```typescript
 * const tenant = {
 *   tenantId: '1234567890',
 *   name: 'Clínica A',
 *   domain: 'www.clinicaa.miapp.com',
 *   logoBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
 *   color: {
 *     sidebar: '#2c3e50
 *     primary: '#2980b9',
 *     secondary: "#eeeee",
 *     background: "#fffff",
 *     text: '#ffffff'
 *   }
 * }
 * ```
 */
export interface TenantResponse { // respuesta del backend en get by domain
    tenantId: string;
    name: string; 
    domain: string;
    logoBase64?: string;
    color?: {
        sidebar: string;
        primary: string;
        secondary: string;
        background: string;
        text: string;
    }
}