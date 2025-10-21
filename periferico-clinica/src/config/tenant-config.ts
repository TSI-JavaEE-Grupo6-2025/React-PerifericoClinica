

export const TENANT_CONFIG = {
    development: {
        isSubdomain: false,
        fallbackForLocalhost: 'dev-tenant',
        // Configuración para dominios locales de desarrollo
        localDomains: {
            'localhost': 'dev-tenant',
            'clinica-a.local': 'tenant-clinica-a',
            'clinica-b.local': 'tenant-clinica-b',
            'clinica-c.local': 'tenant-clinica-c',
            'admin.clinica-a.local': 'tenant-clinica-a',
            'admin.clinica-b.local': 'tenant-clinica-b'
        }
    },
    production: {
        isSubdomain: true,
        subdomainIndex: 0,
    }
}