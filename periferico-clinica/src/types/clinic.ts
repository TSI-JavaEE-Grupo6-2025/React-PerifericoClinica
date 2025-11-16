

export interface ClinicResponse {
    id: string
    tenantId: string
    name: string
    email: string
    domain: string
    logoUrl: string | null
    active: boolean
    createdAt: string
    updatedAt: string
}