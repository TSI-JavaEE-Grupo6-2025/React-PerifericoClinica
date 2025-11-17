import { useState, useMemo } from "react"
import { AdminLayout } from "../../../components/admin/admin-layout"
import { Button, Input } from "../../../components/ui"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table"
import { Search, ChevronLeft, ChevronRight, UserPlus, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../routes/constants/routes"
import { useAdminUserList } from "../../../hooks/factory/useListFactory"
import type { AdminUserListResponse } from "../../../types"

export function AdminsList() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const { users, loading, error, refetch } = useAdminUserList()

  const fullName = (firstName: string, lastName: string) => {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`
    } else {
      return 'Sin nombre'
    }
  }
  // Filtrar administradores
  const filteredAdmins = useMemo(() => {
    if (!users || users.length === 0) return []

    return users.filter((admin) => {
      const searchLower = searchTerm.toLowerCase()
      const nameFull = fullName(admin.firstName, admin.lastName).toLowerCase()
      
      const matchesSearch =
        nameFull.includes(searchLower) ||
        admin.document?.toLowerCase().includes(searchLower) ||
        admin.email?.toLowerCase().includes(searchLower)

      return matchesSearch
    })
  }, [users, searchTerm])

  // Paginación
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAdmins = filteredAdmins.slice(startIndex, startIndex + itemsPerPage)



  



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
            onClick={() => navigate(ROUTES.ADMIN_REGISTER_ADMIN_USERS)}
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

          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">Error al cargar administradores</p>
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
              <p className="text-gray-500">Cargando administradores...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre completo</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Email</TableHead>

                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAdmins.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      {searchTerm
                        ? "No se encontraron administradores con los filtros aplicados"
                        : "No hay administradores registrados"}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedAdmins.map((admin: AdminUserListResponse) => {

                    return (
                      <TableRow key={admin.email}>
                        <TableCell className="font-medium">
                          {fullName(admin.firstName,admin.lastName)}
                        </TableCell>
                        <TableCell>{admin.document ? admin.document : 'N/A'}</TableCell>
                        <TableCell>{admin.email}</TableCell>
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
