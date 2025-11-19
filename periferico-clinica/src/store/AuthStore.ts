import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserRole, User } from '../types';




interface AuthState {
  // Estado actual
  accessToken: string | null;           // JWT token de autenticación
  tenantId: string | null;        // ID del tenant (clínica)
  user: User | null;              // Datos del usuario logueado (incluye username, email, role)
  isAuthenticated: boolean;       // Si está autenticado o no
  
  // Acciones
  login: (accessToken: string, tenantId: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  hasRole: (role: UserRole) => boolean;
}

// Store de autenticación con persistencia en localStorage
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      accessToken: null,
      tenantId: null,
      user: null,
      isAuthenticated: false,
      
      // Acción: Login
      login: (accessToken, tenantId, user) =>
        set({
          accessToken: accessToken,
          tenantId,
          user,
          isAuthenticated: true,
        }),
      
      /**
       * Cierra la sesión del usuario y limpia todos los estados  de los stores
       */
      logout: () => {
        set({
          accessToken: null,
          tenantId: null,
          user: null,
          isAuthenticated: false,
        });
        
        // Limpiar todas las claves específicas de los stores
        localStorage.removeItem('tenant-storage');
        localStorage.removeItem('snomed-catalog-storage');
        localStorage.removeItem('professional-specialties-storage');
        localStorage.removeItem('specialties_cache');
        sessionStorage.removeItem('auth-storage');
        
        // Limpiar completamente localStorage y sessionStorage como respaldo
        localStorage.clear();
        sessionStorage.clear();
      },
      
      // Acción: Actualizar usuario
      setUser: (user) =>
        set({ user }),
      
      // Acción: Verificar rol
      hasRole: (requiredRole: UserRole) => {
        const currentUser = get().user;
        if (!currentUser) return false;
        return currentUser.role === requiredRole;
      },
    }),
    {
      name: 'auth-storage', 
      storage: createJSONStorage(() => sessionStorage), // Se borra al cerrar el navegador
    }
  )
);