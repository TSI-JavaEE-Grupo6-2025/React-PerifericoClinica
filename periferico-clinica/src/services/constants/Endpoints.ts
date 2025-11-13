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
            GET_PROFESIONALS: '/', // listar profesionales de salud
            GET_HEALTH_USERS: '/health-users', // listar usuarios de salud

            // GET SPECIALTIES
            GET_SPECIALTIES: '/specialties',

            UPDATE_CLINIC: '/clinics/:tenantId', // actualiza datos de la clínica
            
        },
        PROFESIONAL: {
            // POST
            CREATE_DOCUMENT: '/documents',

           
            // GET
            GET_DOCUMENTS: '',
            // todos los motivos de consulta
            GET_CONSULTATION_REASONS: '/snomed/consultation-reasons',
            //snomed/consultation-reasons?search={search}
            GET_ESPECIFIC_CONSULTATION_REASON: '/snomed/consultation-reasons?search=:search',

            GET_PROFESSIONAL_INFO: '/health-professionals',
            // obtener información basica de un pacienti
            GET_PATIENT_BASIC_INFO:'/health-users/by-document/:documentNumber',

            // todos los problemas
            GET_PROBLEMS_STATUS: '/snomed/problem-status',
            // todos los grado de certeza
            GET_CERTAINTY_LEVEL: '/snomed/certainty-levels',

            // Obtiene el documento clínico por su ID
            GET_CLINIC_DOCUMENT: '/documents/:id',
            VIEW_CLINIC_DOCUMENT: '/documents/view/:id',
            //obtiene la historia clínica por id del paciente
            GET_CLINIC_HISTORY:'/documents/history/:patientDocumentNumber/:specialtyId',

            
        },
        
    },
    TENANT: {
        GET_BY_DOMAIN: 'clinics/by-domain/:domain'
    }

}

// colocar las rutas correctas de cada servicio