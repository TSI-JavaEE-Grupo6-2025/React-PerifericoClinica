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
 * @property {string} logo - Logo del tenant
 * @property {object} color - Color del tenant (opcional)
 * @property {string} color.background - Color de fondo del tenant (opcional)
 * @property {string} color.text - Color de texto del tenant (opcional)
 * 
 * @example
 * ```typescript
 * const tenant = {
 *   tenantId: '1234567890',
 *   name: 'Clínica A',
 *   domain: 'www.clinicaa.miapp.com',
 *   logo: 'https://clinicaa.saludportal.com/logo.png',
 *   color: {
 *     background: '#2980b9',
 *     text: '#ffffff'
 *   }
 * }
 * ```
 */
export interface TenantResponse { // respuesta del backend en get by domain
    tenantId: string;
    name: string; 
    domain: string;
    logo?: string;
    color?: {
        background: string;
        text: string;
    }
}