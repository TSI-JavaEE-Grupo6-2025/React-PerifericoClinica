import { useState } from "react"
import { AdminLayout } from "../../../components/admin/admin-layout"
import { Button, Input, Badge } from "../../../components/ui"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table"
import { DropdownMenu, DropdownMenuItem } from "../../../components/ui/DropdownMenu"
import { Search, ChevronLeft, ChevronRight, UserPlus, MoreVertical, Eye, Edit, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../routes/constants/routes"

// Mock data - reemplazar con datos reales del backend
const mockHealthUsers = [
  {
    id: "1",
    firstName: "Juan",
    lastName: "Pérez",
    document: "12345678",
    email: "juan.perez@email.com",
    phone: "099123456",
    birthDate: "1990-05-15",
    active: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    firstName: "María",
    lastName: "González",
    document: "87654321",
    email: "maria.gonzalez@email.com",
    phone: "099654321",
    birthDate: "1985-08-22",
    active: true,
    createdAt: new Date("2024-02-10"),
  },
  {
    id: "3",
    firstName: "Carlos",
    lastName: "Rodríguez",
    document: "11223344",
    email: "carlos.rodriguez@email.com",
    phone: "099112233",
    birthDate: "1992-11-30",
    active: false,
    createdAt: new Date("2024-03-05"),
  },
]

export function HealthUsersList() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const itemsPerPage = 2

  // Filtrar usuarios
  const filteredUsers = mockHealthUsers.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.document.includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || (statusFilter === "active" ? user.active : !user.active)

    return matchesSearch && matchesStatus
  })

  // Paginación
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  const handleViewDetails = (id: string) => {
    alert(`[👁️] Ver detalle del usuario de salud con id: ${id}`)
    
  }

  const handleEdit = (id: string) => {
    alert(`[✏️] Editar usuario de salud con id: ${id}`)

  }

  const handleDelete = (id: string) => {
    alert(`[❌] Eliminar usuario de salud con id: ${id}`)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Usuarios de Salud</h1>
            <p className="text-gray-600 mt-1">Gestiona los usuarios de salud de la clínica</p>
          </div>
          <Button
            onClick={() => navigate(ROUTES.ADMIN_REGISTER_USERS)}
            className="bg-[#2980b9] hover:bg-[#21618c] text-white"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Nuevo Usuario
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
                <TableHead>Teléfono</TableHead>
                <TableHead>Fecha de Nacimiento</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha de Registro</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No se encontraron usuarios
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.document}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{new Date(user.birthDate).toLocaleDateString("es-UY")}</TableCell>
                    <TableCell>
                      <Badge variant={user.active ? "default" : "secondary"}>
                        {user.active ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.createdAt.toLocaleDateString("es-UY")}</TableCell>
                    <TableCell>
                      <DropdownMenu
                        trigger={
                          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>
                        }
                      >
                        <DropdownMenuItem icon={<Eye />} onClick={() => handleViewDetails(user.id)}>
                          Ver Detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem icon={<Edit />} onClick={() => handleEdit(user.id)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem icon={<Trash2 />} variant="danger" onClick={() => handleDelete(user.id)}>
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
                Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredUsers.length)} de{" "}
                {filteredUsers.length} usuarios
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
