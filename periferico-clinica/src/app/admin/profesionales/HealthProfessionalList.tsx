import { useState } from "react"
import { AdminLayout } from "../../../components/admin/admin-layout"
import { Button, Input, Badge, DropdownMenu, DropdownMenuItem } from "../../../components/ui"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table"
import { Search, ChevronLeft, ChevronRight, UserPlus, MoreVertical, Edit, Trash } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../routes/constants/routes"

// Mock data - reemplazar con datos reales del backend
const mockProfessionals = [
    {
        id: "1",
        firstName: "Dr. Roberto",
        lastName: "Martínez",
        document: "98765432",
        email: "roberto.martinez@clinica.com",
        specialty: "Cardiología",
        active: true,
        createdAt: new Date("2024-01-10"),
    },
    {
        id: "2",
        firstName: "Dra. Ana",
        lastName: "Silva",
        document: "45678912",
        email: "ana.silva@clinica.com",
        specialty: "Pediatría",
        active: true,
        createdAt: new Date("2024-02-15"),
    },
    {
        id: "3",
        firstName: "Dr. Luis",
        lastName: "Fernández",
        document: "78912345",
        email: "luis.fernandez@clinica.com",
        specialty: "Traumatología",
        active: false,
        createdAt: new Date("2024-03-20"),
    },
]

export function HealthProfessionalList() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
    const itemsPerPage = 2

    // Filtrar profesionales
    const filteredProfessionals = mockProfessionals.filter((professional) => {
        const matchesSearch =
            professional.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            professional.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            professional.document.includes(searchTerm) ||
            professional.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            professional.specialty.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus =
            statusFilter === "all" || (statusFilter === "active" ? professional.active : !professional.active)

        return matchesSearch && matchesStatus
    })

    // Paginación
    const totalPages = Math.ceil(filteredProfessionals.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedProfessionals = filteredProfessionals.slice(startIndex, startIndex + itemsPerPage)

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
                        onClick={() => navigate(ROUTES.ADMIN_PROFESSIONAL_LIST)}
                        className="bg-[#2980b9] hover:bg-[#21618c] text-white cursor-pointer"
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
                                className="pl-10 focus-visible:ring-[#2980b9]/50 focus-visible:border-[#2980b9]"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex gap-2">
                            <Button
                                variant={statusFilter === "all" ? "default" : "outline"}
                                onClick={() => setStatusFilter("all")}
                                className={statusFilter === "all" ? "bg-[#2980b9] hover:bg-[#21618c] cursor-pointer" : ""}
                            >
                                Todos
                            </Button>
                            <Button
                                variant={statusFilter === "active" ? "default" : "outline"}
                                onClick={() => setStatusFilter("active")}
                                className={statusFilter === "active" ? "bg-[#2980b9] hover:bg-[#21618c] cursor-pointer" : ""}
                            >
                                Activos
                            </Button>
                            <Button
                                variant={statusFilter === "inactive" ? "default" : "outline"}
                                onClick={() => setStatusFilter("inactive")}
                                className={statusFilter === "inactive" ? "bg-[#2980b9] hover:bg-[#21618c] cursor-pointer" : ""}
                            >
                                Inactivos
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Documento</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Especialidad</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Fecha de Registro</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedProfessionals.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                        No se encontraron profesionales
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedProfessionals.map((professional) => (
                                    <TableRow key={professional.id}>
                                        <TableCell className="font-medium">
                                            {professional.firstName} {professional.lastName}
                                        </TableCell>
                                        <TableCell>{professional.document}</TableCell>
                                        <TableCell>{professional.email}</TableCell>
                                        <TableCell>{professional.specialty}</TableCell>
                                        <TableCell>
                                            <Badge variant={professional.active ? "default" : "secondary"}>
                                                {professional.active ? "Activo" : "Inactivo"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{professional.createdAt.toLocaleDateString("es-UY")}</TableCell>
                                        {/* dropdown menu */}
                                        <TableCell>
                                            <DropdownMenu
                                                trigger={
                                                    <button className="p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
                                                        <MoreVertical className="w-4 h-4 text-gray-600" />
                                                    </button>
                                                }
                                            >
                                                <DropdownMenuItem
                                                    icon={<Edit/>}
                                                    className="cursor-pointer"
                                                >
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    icon={<Trash/>}
                                                    className="cursor-pointer"
                                                >
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenu>

                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

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
                                            className={currentPage === page ? "bg-[#2980b9] hover:bg-[#21618c]" : ""}
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
