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

## 🚀 Instalación y Configuración Local

### 📋 Prerrequisitos
- Node.js 18+ 
- pnpm (recomendado) o npm
- Git

### 🔧 Pasos para levantar el frontend

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd periferico-clinica
```

2. **Instalar dependencias**
```bash
pnpm install
```

3. **Levantar el servidor de desarrollo**
```bash
pnpm dev
```

4. **Acceder a la aplicación**
- Abrir navegador en: `http://localhost`
- La aplicación estará disponible en modo desarrollo
- **Nota**: El puerto 5173 se maneja automáticamente por Vite

### 🏗️ Scripts Disponibles

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

## 🌐 Configuración Multi-Tenant para Desarrollo Local

### 🎯 Objetivo
Configurar el sistema para que detecte diferentes dominios de clínicas desde localhost durante las pruebas, simulando el comportamiento de producción donde cada clínica tiene su propio dominio.

### 📝 Configuración del Sistema de Archivos Hosts

1. **Editar archivo hosts del sistema**
```bash
# En macOS/Linux
sudo nano /etc/hosts

# En Windows (como administrador)
notepad C:\Windows\System32\drivers\etc\hosts
```

2. **Agregar entradas para clínicas de prueba**
```bash
# Agregar al final del archivo hosts:
127.0.0.1 localhost
127.0.0.1 clinica-a.localhost
127.0.0.1 clinica-b.localhost
127.0.0.1 clinica-c.localhost
127.0.0.1 admin.clinica-a.localhost
127.0.0.1 admin.clinica-b.localhost
255.255.255.255 broadcasthost
```

3. **Configurar Vite para múltiples dominios**
```bash
# En el archivo vite.config.ts, debe tener:
server: {
  host: true,        // Escuchar en todas las interfaces
  port: 5173,        // Puerto único
  strictPort: true,  // Forzar el puerto 5173
}
```

### 🔄 Flujo de Pruebas Multi-Tenant

1. **Crear clínica desde Panel Admin HCEN**
   - Acceder al panel administrativo HCEN
   - Crear nueva clínica (ej: "Clínica A")
   - El sistema genera URL: `clinica-a.localhost`

2. **Probar detección de dominio**
   - Navegar a: `http://clinica-a.localhost`
   - El sistema debe detectar automáticamente el dominio
   - Mostrar logo/configuración específica de "Clínica A"

3. **Verificar aislamiento de datos**
   - Crear otra clínica: "Clínica B"
   - Navegar a: `http://clinica-b.localhost`
   - Verificar que los datos están aislados por clínica

### 🛠️ Configuración de Desarrollo

1. **Variables de entorno**
```bash
# Crear archivo .env.local
VITE_API_BASE_URL=http://localhost:3000/api
VITE_TENANT_SERVICE_URL=http://localhost:3000/api/tenant
```

2. **Configuración de tenant para desarrollo**
```typescript
// En src/config/tenant-config.ts
export const TENANT_CONFIG = {
  development: {
    isSubdomain: false,
    fallbackForLocalhost: 'dev-tenant',
    // Configuración para dominios locales
    localDomains: {
      'localhost': 'dev-tenant',
      'clinica-a.localhost': 'tenant-clinica-a',
      'clinica-b.localhost': 'tenant-clinica-b',
      'clinica-c.localhost': 'tenant-clinica-c',
      'admin.clinica-a.localhost': 'tenant-clinica-a',
      'admin.clinica-b.localhost': 'tenant-clinica-b'
    }
  }
}
```

### 🧪 Casos de Prueba

1. **Prueba básica de dominio**
   - `http://localhost` → Debe usar tenant por defecto
   - `http://clinica-a.localhost` → Debe detectar "Clínica A"

2. **Prueba de login multi-tenant**
   - Login en `clinica-a.localhost` → Usuario debe estar asociado a Clínica A
   - Login en `clinica-b.localhost` → Usuario debe estar asociado a Clínica B

3. **Prueba de aislamiento**
   - Datos de Clínica A no deben aparecer en Clínica B
   - Sesiones independientes por dominio

### ⚠️ Notas Importantes

- **Solo para desarrollo**: Esta configuración es únicamente para pruebas locales
- **Producción**: En producción cada clínica tendrá su dominio real
- **Backend**: Asegurar que el backend esté configurado para manejar múltiples tenants
- **SSL**: En producción se requerirá HTTPS para dominios personalizados

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



