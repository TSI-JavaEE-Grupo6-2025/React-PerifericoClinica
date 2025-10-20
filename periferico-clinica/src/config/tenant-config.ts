

export const TENANT_CONFIG ={
    development: {
        isSubdomain: false,
        FallbackForLocalhost: 'dev-tenant'
    },
    production: {
        isSubdomain: true,
        subdomainIndex: 0,
    }
}