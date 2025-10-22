
export const ROUTES = {
    //públicas
    HOME: '/',
    ADMIN_LOGIN: '/admin/login',
    PROFESIONAL_LOGIN: '/profesional/login',

    // privadas Admin 
    ADMIN_DASHBOARD: '/admin/dashboard',
    ADMIN_USERS: '/admin/usuarios',
    ADMIN_PROFESSIONALS: '/admin/profesionales',
    ADMIN_SETTINGS: '/admin/configuracion',
    ADMIN_CLINIC_SETTING: '/admin/configuracion/clinica',

    // privadas Profesional
    PROFESIONAL_DASHBOARD: '/profesional/dashboard',
    
} as const;