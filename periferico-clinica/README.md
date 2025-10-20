# 🏥 Periférico Clínica - Sistema HCEN

Sistema periférico de clínica integrado con Historia Clínica Electrónica Nacional (HCEN). Portal administrativo y profesional para gestión clínica multi-tenant.

## 🚀 Tech Stack

- **Bundler**: Vite
- **Lenguaje**: TypeScript + SWC
- **Framework**: React 18
- **Estilos**: TailwindCSS
- **Routing**: React Router v6
- **Estado Global**: Zustand
- **UI Components**: Radix UI
- **Utilities**: clsx, tailwind-merge, class-variance-authority
- **Linter**: ESLint + Prettier
- **Gestor de paquetes**: pnpm

## 📁 Estructura del Proyecto (Clean Architecture)

```
src/
├── app/                          # Features organizadas por rol
│   ├── admin/
│   │   └── login/
│   │       └── Page.tsx          # Login de administrador
│   └── profesional/
│       └── login/
│           └── Page.tsx          # Login de profesional
│
├── components/                   # Componentes reutilizables
│   ├── ui/                       # Componentes UI base
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Label.tsx
│   │   └── index.ts
│   └── icons/                    # Iconos SVG
│       └── index.tsx
│
├── pages/                        # Páginas principales
│   ├── Home/
│   │   └── HomePage.tsx          # Página de inicio con portales
│   ├── Admin/
│   │   └── AdminLoginPage.tsx
│   ├── Profesional/
│   │   └── ProfesionalLoginPage.tsx
│   └── index.ts
│
├── routes/                       # Configuración de rutas
│   ├── admin/
│   │   └── AdminRoutes.tsx       # Rutas específicas de admin
│   ├── profesional/
│   │   └── ProfesionalRoutes.tsx # Rutas específicas de profesional
│   ├── protectedRoute/
│   │   └── ProtectedRoute.tsx    # HOC para rutas protegidas
│   ├── constants/
│   │   └── routes.ts             # Constantes de rutas
│   └── index.tsx                 # Router principal
│
├── store/                        # Estado global (Zustand)
│   └── AuthStore.ts              # Store de autenticación
│
├── services/                     # Servicios de API
│   └── AuthService/
│       └── AuthService.ts        # Servicio de autenticación
│
├── adapters/                     # Adaptadores de datos
│   └── Auth/
│       └── AuthAdapter.ts        # Adaptador de autenticación
│
├── value-objects/                # Value Objects (DDD)
│   ├── Email.ts                  # Validación de email corporativo
│   ├── Password.ts               # Validación de contraseña
│   └── UserCredentials.ts        # Credenciales del usuario
│
├── types/                        # Tipos TypeScript
│   └── userHcen.ts               # Interface de usuario HCEN
│
├── utils/                        # Utilidades
│   └── cn.ts                     # Helper para clsx + tailwind-merge
│
├── App.tsx                       # Componente principal
└── main.tsx                      # Entry point

```

## ✨ Características Implementadas

### 🏠 **HomePage**
- Portal de selección (Administrativo / Profesional)
- Diseño moderno con Cards interactivas
- Navegación mediante React Router
- Indicador de estado de integración con HCEN

### 🔐 **Sistema de Autenticación**
- **Login Admin**: Portal administrativo
- **Login Profesional**: Portal de profesionales de salud
- **Value Objects**: Validación de credenciales en el dominio
- **Multi-tenant**: Captura automática del dominio de la clínica
- **SessionStorage**: Sesiones independientes por pestaña (seguridad médica)

### 🎨 **Componentes UI**
- **Button**: Variantes (default, secondary, outline, ghost)
- **Card**: Sistema modular (Header, Content, Footer, etc.)
- **Input**: Campos de formulario con focus personalizado
- **Label**: Etiquetas accesibles con Radix UI
- **Icons**: Iconos SVG personalizados

### 🛡️ **Rutas Protegidas**
- **ProtectedRoute HOC**: Validación de autenticación y roles
- **Role-based access**: Admin vs Profesional
- **Redirección automática**: Según rol del usuario
- **React Router v6**: Configuración con `createBrowserRouter`

### 🗄️ **Estado Global (Zustand)**
- **AuthStore**: Gestión centralizada de autenticación
  - `token`: JWT token
  - `tenantId`: ID de la clínica (multi-tenant)
  - `user`: Datos del usuario logueado
  - `isAuthenticated`: Estado de sesión
  - `hasRole()`: Verificación de roles
  - **Persistencia**: sessionStorage (seguridad médica)

### 🏗️ **Clean Architecture**
- **Value Objects**: Validación en la capa de dominio
- **Services**: Lógica de negocio
- **Adapters**: Transformación de datos API
- **Separation of Concerns**: Cada capa con responsabilidad única

## 🎯 Casos de Uso Implementados

### ✅ **Fase 1 (Completada)**
- [x] Estructura base del proyecto
- [x] Componentes UI base (Button, Card, Input, Label)
- [x] HomePage con portales
- [x] Páginas de login (Admin y Profesional)
- [x] Sistema de rutas con React Router
- [x] Rutas protegidas con validación de roles
- [x] AuthStore con Zustand + sessionStorage
- [x] Value Objects para validación de credenciales
- [x] Estructura de servicios y adapters

### 🔄 **Próximos Pasos**
- [ ] Integración con backend HCEN
- [ ] Dashboard de administrador
- [ ] Dashboard de profesional
- [ ] Gestión de usuarios
- [ ] Gestión de profesionales
- [ ] Historia clínica electrónica
- [ ] Sincronización con INUS y RNDC

## 🚦 Scripts

```bash
# Desarrollo
pnpm dev

# Build de producción
pnpm build

# Preview de producción
pnpm preview

# Linting
pnpm lint

# Formateo
pnpm format
```

## 🎨 Paleta de Colores

```css
/* Primarios */
--primary: #2980b9      /* Azul principal */
--primary-dark: #2471a3 /* Azul oscuro (hover) */
--text: #2c3e50         /* Texto principal */
--background: #f4f7fa   /* Fondo principal */

/* Grises */
--gray-100: #f7fafc
--gray-200: #edf2f7
--gray-600: #718096
```

## 🔒 Seguridad

- **SessionStorage**: Sesiones independientes por pestaña
- **Value Objects**: Validación de dominio
- **Email Corporativo**: Bloqueo de dominios públicos (gmail, hotmail, etc.)
- **Multi-tenant**: Aislamiento por clínica
- **Protected Routes**: Validación de autenticación y roles

## 📝 Convenciones

- **TypeScript**: Strict mode habilitado
- **Componentes**: PascalCase (ej: `Button.tsx`)
- **Hooks**: camelCase con prefijo `use` (ej: `useAuthStore`)
- **Constants**: UPPER_SNAKE_CASE (ej: `ROUTES`)
- **Exports**: Named exports para componentes
- **Imports**: Paths absolutos desde `src/`

## 🤝 Equipo

Desarrollado siguiendo las especificaciones del obligatorio TSE 2025.

---

Generado con StackForge CLI 🚀



