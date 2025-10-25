
export const ROUTES = {
    //públicas
    HOME: '/',
    ADMIN_LOGIN: '/admin/login',
    PROFESIONAL_LOGIN: '/profesional/login',

    // privadas Admin 
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_REGISTER_USERS: '/admin/usuarios/alta',
    ADMIN_REGISTER_ADMIN_USERS: '/admin/administradores/alta',
    ADMIN_REGISTER_PROFESSIONALS: '/admin/profesionales/alta',
    ADMIN_SETTINGS: '/admin/configuracion',
    ADMIN_CLINIC_SETTING: '/admin/configuracion/clinica',
    ADMIN_PROFESSIONAL_LIST: '/admin/profesionales',
    ADMIN_HEALTH_USER_LIST: '/admin/usuarios-salud/lista',
    ADMIN_ADMIN_USER_LIST: '/admin/administradores/lista',
    ADMIN_CLINIC_DETAILS: '/admin/clinica/detalle',

    // privadas Profesional
    PROFESIONAL_DASHBOARD: '/profesional/dashboard',
    
} as const;