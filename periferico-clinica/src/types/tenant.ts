/**
 * Tipos para el tenant
 * 
 * Tenant: Datos del tenant
 */



/**
 * Interfaz de respuesta del adapter de tenant get by domain
 * 
 * @property {string} id - ID único del tenant
 * @property {string} tenantId - ID del tenant (identificador único)
 * @property {string} name - Nombre del tenant
 * @property {string} email - Email del tenant
 * @property {string} domain - Dominio del tenant
 * @property {string} logoBase64 - Logo del tenant en formato base64
 * @property {object} colors - Colores del tenant (opcional)
 * @property {string} colors.sidebar - Color de la barra lateral
 * @property {string} colors.primary - Color primario 
 * @property {string} colors.secondary - Color secundario
 * @property {string} colors.background - Color de fondo del tenant
 * @property {string} colors.text - Color de texto del tenant
 * @property {boolean} active - Estado activo del tenant
 * @property {string} createdAt - Fecha de creación
 * @property {string} updatedAt - Fecha de actualización
 * 
 * @example
 * ```typescript
 * const tenant = {
 *   id: '68f6c6b584e4debe1f5f41c5',
 *   tenantId: 'cli-clinica-braian',
 *   name: 'Clinica Braian',
 *   email: 'braian@clinica.com',
 *   domain: 'www.braian.com',
 *   logoBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
 *   colors: {
 *     sidebar: '#2980b9',
 *     primary: '#3498db',
 *     secondary: '#2ecc71',
 *     background: '#ecf0f1',
 *     text: '#ffffff'
 *   },
 *   active: true,
 *   createdAt: '2025-01-15T10:30:00Z',
 *   updatedAt: '2025-01-15T10:30:00Z'
 * }
 * ```
 */
export interface TenantResponse { // respuesta del backend en get by domain
    id: string;
    tenantId: string;
    name: string; 
    email?: string;
    domain: string;
    logoBase64?: string;
    colors?: {
        sidebar: string;
        primary: string;
        secondary: string;
        background: string;
        text: string;
    };
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
}