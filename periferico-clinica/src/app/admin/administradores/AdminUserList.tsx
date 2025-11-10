import { useState } from "react"
import { AdminLayout } from "../../../components/admin/admin-layout"
import { Button, Input, Badge } from "../../../components/ui"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table"
import { DropdownMenu, DropdownMenuItem } from "../../../components/ui/DropdownMenu"
import { Search, ChevronLeft, ChevronRight, UserPlus, MoreVertical, Eye, Edit, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../routes/constants/routes"

// Mock data - reemplazar con datos reales del backend
const mockAdmins = [
  {
    id: "1",
    firstName: "Admin",
    lastName: "Principal",
    document: "11111111",
    email: "admin@clinica.com",
    active: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    firstName: "Laura",
    lastName: "Méndez",
    document: "22222222",
    email: "laura.mendez@clinica.com",
    active: true,
    createdAt: new Date("2024-02-01"),
  },
]

export function AdminsList() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const itemsPerPage = 10

  // Filtrar administradores
  const filteredAdmins = mockAdmins.filter((admin) => {
    const matchesSearch =
      admin.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.document.includes(searchTerm) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || (statusFilter === "active" ? admin.active : !admin.active)

    return matchesSearch && matchesStatus
  })

  // Paginación
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAdmins = filteredAdmins.slice(startIndex, startIndex + itemsPerPage)

  // Action handlers for view, edit, and delete
  const handleViewDetails = (id: string) => {
    alert(`[👁️] Ver detalle del administrador con id: ${id}`)
    
  }

  const handleEdit = (id: string) => {
    alert(`[✏️] Editar administrador con id: ${id}`)
  }

  const handleDelete = (id: string) => {
    alert(`[❌] Eliminar administrador con id: ${id}`)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Administradores</h1>
            <p className="text-gray-600 mt-1">Gestiona los administradores de la clínica</p>
          </div>
          <Button
            onClick={() => navigate(ROUTES.ADMIN_ADMIN_USER_LIST)}
            className="bg-[#2980b9] hover:bg-[#21618c] text-white"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Nuevo Administrador
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
                placeholder="Buscar por nombre, documento o email..."
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
                className={statusFilter === "all" ? "bg-[#2980b9] hover:bg-[#21618c]" : ""}
              >
                Todos
              </Button>
              <Button
                variant={statusFilter === "active" ? "default" : "outline"}
                onClick={() => setStatusFilter("active")}
                className={statusFilter === "active" ? "bg-[#2980b9] hover:bg-[#21618c]" : ""}
              >
                Activos
              </Button>
              <Button
                variant={statusFilter === "inactive" ? "default" : "outline"}
                onClick={() => setStatusFilter("inactive")}
                className={statusFilter === "inactive" ? "bg-[#2980b9] hover:bg-[#21618c]" : ""}
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
                <TableHead>Estado</TableHead>
                <TableHead>Fecha de Registro</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAdmins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No se encontraron administradores
                  </TableCell>
                </TableRow>
              ) : (
                paginatedAdmins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">
                      {admin.firstName} {admin.lastName}
                    </TableCell>
                    <TableCell>{admin.document}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <Badge variant={admin.active ? "default" : "secondary"}>
                        {admin.active ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell>{admin.createdAt.toLocaleDateString("es-UY")}</TableCell>
                    <TableCell>
                      <DropdownMenu
                        trigger={
                          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>
                        }
                      >
                        <DropdownMenuItem icon={<Eye />} onClick={() => handleViewDetails(admin.id)}>
                          Ver Detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem icon={<Edit />} onClick={() => handleEdit(admin.id)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem icon={<Trash2 />} variant="danger" onClick={() => handleDelete(admin.id)}>
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
                Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredAdmins.length)} de{" "}
                {filteredAdmins.length} administradores
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
