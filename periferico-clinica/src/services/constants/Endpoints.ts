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
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
    },
    DASHBOARD: {
        ADMIN: {
            // PUT
            CREATE_ADMIN_USER: '/admin/users/create',
            CREATE_PROFESIONAL: '/admin/professionals/create',
            CREATE_HEALTH_USER: '/admin/health-users/create',
            // GET
            GET_USERS: '/admin/users/get',
            GET_PROFESIONALS: '/admin/professionals/get',
            GET_HEALTH_USERS: '/admin/health-users/get',
            
        },
        PROFESIONAL: {

            CREATE_DOCUMENT: '/profesional/documents/create',
           
            // GET
            GET_DOCUMENTS: '/profesional/documents/get',
            UPDATE_DOCUMENT: '/profesional/documents/update',
            DELETE_DOCUMENT: '/profesional/documents/delete',
        },
        
    },
    TENANT: {
        GET_BY_DOMAIN: '/tenant/get-by-domain'
    }

}

// colocar las rutas correctas de cada servicio