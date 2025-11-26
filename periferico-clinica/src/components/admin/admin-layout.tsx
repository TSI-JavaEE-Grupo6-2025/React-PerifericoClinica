import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../utils"
import { Button } from "../ui"
import { LayoutDashboard, Users, UserCog, Settings, LogOut, Menu, X, Building2, Stethoscope, Loader2 } from "lucide-react"
import { useLogout } from "../../hooks/use-logout"
import { useTenantStore } from "../../store/TenantStore"
import { useDocumentTitle } from "../../hooks/use-documentTitle"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Usuarios de Salud", href: "/admin/usuarios-salud/lista", icon: Users },
  { name: "Profesionales", href: "/admin/profesionales", icon: Stethoscope },
  { name: "Administradores", href: "/admin/administradores/lista", icon: UserCog },
  { name: "Clínica", href: "/admin/clinica/detalle", icon: Building2 },
  { name: "Configuración", href: "/admin/configuracion/clinica", icon: Settings },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const pathname = location.pathname
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { handleLogout: handleLogoutHook , loading: loadingLogout } = useLogout();
  const { tenant } = useTenantStore();

  // Actualizar título global con nombre del tenant
  const clinicName = useTenantStore(s => s.tenant?.name ?? "Clínica")
  useDocumentTitle(clinicName, "Admin")

  // Obtener colores dinámicos del tenant
  const tenantData = useMemo(() => {
    if (!tenant) return null;
    return {
      colors: tenant.colors,
      logoBase64: tenant.logoBase64
    }
  }, [tenant]);

  const sidebarColor = tenantData?.colors?.sidebar || '#2c3e50';
  const primaryColor = tenantData?.colors?.primary || '#2980b9';
  const textButtonColor = tenantData?.colors?.text || '#ffffff';

  // Aplicar colores dinámicos mediante CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--clinic-sidebar', sidebarColor);
    document.documentElement.style.setProperty('--clinic-primary', primaryColor);
    document.documentElement.style.setProperty('--clinic-text-button', textButtonColor);
  }, [sidebarColor, primaryColor, textButtonColor]);

  const handleLogout = () => {
    // usamos useLogout para eliminar el session storage
    handleLogoutHook();
  }

  return (
    <div className="min-h-screen bg-[#f4f7fa]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-[var(--clinic-sidebar)] transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: `${sidebarColor}80` }}>
            <div className="flex items-center gap-3">
              {tenantData?.logoBase64 ? (
                <img
                  src={tenantData.logoBase64}
                  alt="Logo de la clínica"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <Building2 className="w-8 h-8 text-[var(--clinic-text-button)]" />
              )}
              <span className="text-xl font-bold text-[var(--clinic-text-button)]">Clínica Admin</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-[var(--clinic-text-button)]"
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${sidebarColor}80`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--clinic-text-button)] transition-colors",
                  )}
                  style={{
                    backgroundColor: isActive ? `${sidebarColor}80` : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = `${sidebarColor}80`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t" style={{ borderColor: `${sidebarColor}80` }}>
            <Button 
              className="w-full justify-start cursor-pointer" 
              style={{ 
                backgroundColor: 'var(--clinic-primary)', 
                color: 'var(--clinic-text-button)' 
              }}
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Cerrar Sesión
              {loadingLogout && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
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
