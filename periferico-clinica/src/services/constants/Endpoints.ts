//src/services/constants/Endpoints.ts

//   colocar las rutas correctas acordarse.

/**
 * Endpoints de los servicios 
 * @description: Endpoints de los servicios de la aplicación.
 * @property: AUTH: Endpoints de autenticación.
 * @property: DASHBOARD: Endpoints de dashboard.
 * @property: ADMIN: Endpoints de dashboard administrativo.
 * @property: PROFESIONAL: Endpoints de dashboard profesional.
 * @returns: Endpoints de los servicios de la aplicación.
 */

export const ENDPOINTS_SERVICES = {
    AUTH: {
        LOGIN: '/auth/login', // ✅
        LOGOUT: '/auth/logout', // 
    },
    DASHBOARD: {
        ADMIN: {
            // PUT
            CREATE_ADMIN_USER: '/admin-users',
            CREATE_PROFESIONAL: '/health-professionals', // crea profesional de salud
            CREATE_HEALTH_USER: '/health-users',// alta de usuarios de salud 
            // GET
            GET_USERS: '/admin-users', 
            GET_PROFESIONALS: '/health-professionals', // listar profesionales de salud
            GET_HEALTH_USERS: '/health-users', // listar usuarios de salud

            // GET SPECIALTIES
            GET_SPECIALTIES: '/specialties',

            UPDATE_CLINIC: '/clinics/:tenantId', // actualiza datos de la clínica
            
        },
        PROFESIONAL: {

            CREATE_DOCUMENT: '',
           
            // GET
            GET_DOCUMENTS: '',
            UPDATE_DOCUMENT: '',
            DELETE_DOCUMENT: '',
        },
        
    },
    TENANT: {
        GET_BY_DOMAIN: 'clinics/by-domain/:domain'
    }

}

// colocar las rutas correctas de cada servicio