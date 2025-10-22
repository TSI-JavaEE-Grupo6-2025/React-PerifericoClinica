import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserRole, User } from '../types';




interface AuthState {
  // Estado actual
  token: string | null;           // JWT token de autenticación
  tenantId: string | null;        // ID del tenant (clínica)
  user: User | null;              // Datos del usuario logueado (incluye username, email, role)
  isAuthenticated: boolean;       // Si está autenticado o no
  
  // Acciones
  login: (token: string, tenantId: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  hasRole: (role: UserRole) => boolean;
}

// Store de autenticación con persistencia en localStorage
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      token: null,
      tenantId: null,
      user: null,
      isAuthenticated: false,
      
      // Acción: Login
      login: (token, tenantId, user) =>
        set({
          token,
          tenantId,
          user,
          isAuthenticated: true,
        }),
      
      // Acción: Logout
      logout: () =>
        set({
          token: null,
          tenantId: null,
          user: null,
          isAuthenticated: false,
        }),
      
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