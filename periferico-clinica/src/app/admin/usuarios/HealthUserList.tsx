import { useState, useMemo, useEffect } from "react"
import { AdminLayout } from "../../../components/admin/admin-layout"
import { Button, Input } from "../../../components/ui"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table"
import { DropdownMenu, DropdownMenuItem } from "../../../components/ui/DropdownMenu"
import { Search, ChevronLeft, ChevronRight, UserPlus, MoreVertical, Edit, Trash2, RefreshCw, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../routes/constants/routes"
import { useHealthUsers } from "../../../hooks/use-healthUser"
import type { HealthUserListResponse } from "../../../types/User"

export function HealthUsersList() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 1

  // Hook para obtener usuarios de salud
  const { healthUsers: users, loading, error, refetch } = useHealthUsers({
    autoFetch: true,
    refetchOnMount: false
  })

  // Filtrar usuarios de forma escalable
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users

    const searchLower = searchTerm.toLowerCase()
    return users.filter((user: HealthUserListResponse) => {
      return (
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      )
    })
  }, [users, searchTerm])

  // Paginación
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  // Reset página cuando cambia el filtro
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  

  const handleEdit = (email: string) => {
    alert(`[✏️] Editar usuario de salud con email: ${email}`)
  }

  const handleDelete = (email: string) => {
    alert(`[❌] Eliminar usuario de salud con email: ${email}`)
  }

  const handleRefresh = () => {
    refetch()
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Usuarios de Salud</h1>
            <p className="text-gray-600 mt-1">
              Gestiona los usuarios de salud de la clínica
              {users.length > 0 && ` (${users.length} usuarios)`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleRefresh}
              variant="outline"
              disabled={loading}
              className="flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''} ` } />
              Actualizar
            </Button>
            <Button
              onClick={() => navigate(ROUTES.ADMIN_REGISTER_USERS)}
              className="bg-[#2980b9] hover:bg-[#21618c] text-white cursor-pointer"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Nuevo Usuario
            </Button>
          </div>
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

           
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-red-800 font-medium">Error al cargar usuarios</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="ml-auto"
            >
              Reintentar
            </Button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-center">
              <RefreshCw className="w-6 h-6 animate-spin text-[#2980b9] mr-3" />
              <span className="text-gray-600">Cargando usuarios...</span>
            </div>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-visible  ">
            <Table className="overflow-visible">
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                      {searchTerm ? 'No se encontraron usuarios con ese criterio de búsqueda' : 'No hay usuarios registrados'}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedUsers.map((user: HealthUserListResponse) => (
                    <TableRow key={user.email}>
                      <TableCell className="font-medium">
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <DropdownMenu
                          trigger={
                            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                              <MoreVertical className="w-4 h-4 text-gray-600" />
                            </button>
                          }
                        >
                          <DropdownMenuItem icon={<Edit />} onClick={() => handleEdit(user.email)}>
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem icon={<Trash2 />} variant="danger" onClick={() => handleDelete(user.email)}>
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
        )}
      </div>
    </AdminLayout>
  )
}
