import { useState, useMemo, useEffect } from "react"
import { useTenantStore } from "../../../store/TenantStore"
import { AdminLayout } from "../../../components/admin/admin-layout"
import { Button, Input, Badge } from "../../../components/ui"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table"
import { Search, ChevronLeft, ChevronRight, UserPlus,  AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../routes/constants/routes"
import { useHealthProfessionalList } from "../../../hooks/factory/useListFactory"
import type { SpecialityState, SpecialtyValues } from "../../../types/Specialty"

/**
 * Convierte las especialidades a un array de strings (nombres)
 * Maneja tanto el formato array de objetos {id, name} como SpecialityState
 * @param specialties - Especialidades del profesional (puede ser array de objetos o SpecialityState)
 * @returns Array de nombres de especialidades
 */
const getSpecialtiesArray = (specialties: SpecialityState): string[] => {
    if (!specialties) return []
    
    // Si es un array (formato del backend: [{id, name}, ...])
    if (Array.isArray(specialties)) {
        return specialties
            .map((spec: unknown) => {
                if (spec && typeof spec === 'object' && 'name' in spec) {
                    return String(spec.name)
                }
                return null
            })
            .filter((name): name is string => name !== null && name !== undefined)
    }
    
    // Si es un objeto (SpecialityState - formato antiguo)
    if (typeof specialties === 'object') {
        return Object.values(specialties)
            .filter((value): value is SpecialtyValues => value !== undefined && typeof value === 'string')
    }
    
    return []
}

export function HealthProfessionalList() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
    const itemsPerPage = 10

    const { users, loading, error, refetch } = useHealthProfessionalList()
    const { tenant } = useTenantStore();

    // Obtener colores dinámicos del tenant
    const tenantData = useMemo(() => {
        if (!tenant) return null;
        return {
            colors: tenant.colors
        }
    }, [tenant]);

    const primaryColor = tenantData?.colors?.primary || '#2980b9';
    const textButtonColor = tenantData?.colors?.text || '#ffffff';

    // Aplicar colores dinámicos mediante CSS variables
    useEffect(() => {
        document.documentElement.style.setProperty('--clinic-primary', primaryColor);
        document.documentElement.style.setProperty('--clinic-text-button', textButtonColor);
    }, [primaryColor, textButtonColor]);

    // Filtrar profesionales
    const filteredProfessionals = useMemo(() => {
        if (!users || users.length === 0) return []

        return users.filter((professional) => {
            const specialtiesArray = getSpecialtiesArray(professional.specialties)
            const specialtiesText = specialtiesArray.join(" ").toLowerCase()

            const matchesSearch =
                professional.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                professional.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                professional.document.includes(searchTerm) ||
                professional.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                specialtiesText.includes(searchTerm.toLowerCase())

            const matchesStatus =
                statusFilter === "all" || (statusFilter === "active" ? professional.active : !professional.active)

            return matchesSearch && matchesStatus
        })
    }, [users, searchTerm, statusFilter])

    // Paginación
    const totalPages = Math.ceil(filteredProfessionals.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedProfessionals = filteredProfessionals.slice(startIndex, startIndex + itemsPerPage)

    // Formatear fecha
    const formatDate = (dateString: string): string => {
        try {
            const date = new Date(dateString)
            return date.toLocaleDateString("es-UY")
        } catch {
            return dateString
        }
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Profesionales de Salud</h1>
                        <p className="text-gray-600 mt-1">Gestiona los profesionales de salud de la clínica</p>
                    </div>
                    <Button
                        onClick={() => navigate(ROUTES.ADMIN_REGISTER_PROFESSIONALS)}
                        className="hover:opacity-90 cursor-pointer"
                        style={{ backgroundColor: 'var(--clinic-primary)', color: 'var(--clinic-text-button)' }}
                    >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Nuevo Profesional
                    </Button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Buscar por nombre, documento, email o especialidad..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 focus-visible:ring-[var(--clinic-primary)]/50 focus-visible:border-[var(--clinic-primary)]"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex gap-2">
                            <Button
                                variant={statusFilter === "all" ? "default" : "outline"}
                                onClick={() => setStatusFilter("all")}
                                style={statusFilter === "all" ? { backgroundColor: 'var(--clinic-primary)', color: 'var(--clinic-text-button)' } : {}}
                                className={statusFilter === "all" ? "hover:opacity-90 cursor-pointer" : ""}
                            >
                                Todos
                            </Button>
                            <Button
                                variant={statusFilter === "active" ? "default" : "outline"}
                                onClick={() => setStatusFilter("active")}
                                style={statusFilter === "active" ? { backgroundColor: 'var(--clinic-primary)', color: 'var(--clinic-text-button)' } : {}}
                                className={statusFilter === "active" ? "hover:opacity-90 cursor-pointer" : ""}
                            >
                                Activos
                            </Button>
                            <Button
                                variant={statusFilter === "inactive" ? "default" : "outline"}
                                onClick={() => setStatusFilter("inactive")}
                                style={statusFilter === "inactive" ? { backgroundColor: 'var(--clinic-primary)', color: 'var(--clinic-text-button)' } : {}}
                                className={statusFilter === "inactive" ? "hover:opacity-90 cursor-pointer" : ""}
                            >
                                Inactivos
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-red-800">Error al cargar profesionales</p>
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => refetch()}
                            className="border-red-300 text-red-700 hover:bg-red-100"
                        >
                            Reintentar
                        </Button>
                    </div>
                )}

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    {loading ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-500">Cargando profesionales...</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Documento</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Especialidades</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Fecha de Registro</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedProfessionals.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                            {searchTerm || statusFilter !== "all"
                                                ? "No se encontraron profesionales con los filtros aplicados"
                                                : "No hay profesionales registrados"}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedProfessionals.map((professional) => {
                                        const specialtiesArray = getSpecialtiesArray(professional.specialties)
                                        return (
                                            <TableRow key={professional.id}>
                                                <TableCell className="font-medium">
                                                    {professional.firstName} {professional.lastName}
                                                </TableCell>
                                                <TableCell>{professional.document}</TableCell>
                                                <TableCell>{professional.email}</TableCell>
                                                <TableCell>
                                                    {specialtiesArray.length > 0 ? (
                                                        <div className="flex flex-wrap gap-1">
                                                            {specialtiesArray.map((specialty) => (
                                                                <Badge
                                                                    key={specialty}
                                                                    variant="outline"
                                                                    className="text-xs"
                                                                >
                                                                    {specialty}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400 text-sm">Sin especialidades</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={professional.active ? "default" : "secondary"}>
                                                        {professional.active ? "Activo" : "Inactivo"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{formatDate(professional.createdAt)}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                )}
                            </TableBody>
                        </Table>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                            <div className="text-sm text-gray-600">
                                Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredProfessionals.length)} de{" "}
                                {filteredProfessionals.length} profesionales
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <Button
                                            key={page}
                                            variant={currentPage === page ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setCurrentPage(page)}
                                            style={currentPage === page ? { backgroundColor: 'var(--clinic-primary)', color: 'var(--clinic-text-button)' } : {}}
                                            className={currentPage === page ? "hover:opacity-90" : ""}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}
