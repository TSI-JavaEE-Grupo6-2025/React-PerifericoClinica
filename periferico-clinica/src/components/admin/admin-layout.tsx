import type React from "react"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../utils"
import { Button } from "../ui"
import { LayoutDashboard, Users, UserCog, Settings, LogOut, Menu, X, Building2, Stethoscope } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Usuarios de Salud", href: "/admin/usuarios-salud/lista", icon: Users },
  { name: "Profesionales", href: "/admin/profesionales", icon: Stethoscope },
  { name: "Administradores", href: "/admin/administradores/lista", icon: UserCog },
  { name: "Clínica", href: "/", icon: Building2 },
  { name: "Configuración", href: "/admin/configuracion/clinica", icon: Settings },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const pathname = location.pathname
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f4f7fa]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-[#2c3e50] transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-[#34495e]">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-[#ecf0f1]" />
              <span className="text-xl font-bold text-[#ecf0f1]">Clínica Admin</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-[#ecf0f1] hover:bg-[#34495e]"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-[#ecf0f1] transition-colors",
                    isActive ? "bg-[#34495e] font-medium" : "hover:bg-[#34495e]",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-[#34495e]">
            <Button variant="ghost" className="w-full justify-start text-[#ecf0f1] hover:bg-[#34495e]">
              <LogOut className="w-5 h-5 mr-3" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        {/* Page content */}
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
