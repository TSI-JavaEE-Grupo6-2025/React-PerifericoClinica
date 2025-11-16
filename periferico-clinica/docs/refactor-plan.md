## Plan de Refactor - Periférico Clínica

Objetivo: reducir duplicación, mejorar consistencia de tipos, habilitar mejor tree-shaking y bajar el tamaño del bundle (estimado: 15–30% del JS, mayor impacto en el entry con code splitting).

### 1) Tipos y Modelos

- Archivo: `src/types/User.ts`
  - Extraer interfaces base y unificar tipos:
    - `BasePerson`: `{ firstName: string; lastName: string }`
    - `BaseContact`: `{ email: string; phone?: string; address?: string }`
    - `BaseDocument`: `{ document: string }`
    - `BasePatientDocument`: `{ documentType: string; documentNumber: string }`
    - `BaseEntity`: `{ id: string }`
    - `BaseTenantScoped`: `{ tenantId: string }`
    - `BaseTimestamps`: `{ createdAt: string; updatedAt: string }` (unificar a ISO string)
  - Alinear `document` vs `documentType + documentNumber` (mantener una estrategia clara por entidad/request).
  - Alinear `createdAt/updatedAt` a `string` (ISO) en todas las responses.
  - Reaplicar estas bases a: `HealthProfessionalRequest`, `HealthUserRequest`, `AdminUserRequest`, `AdminUserListResponse`, `HealthUserListResponse`, `AdminUserRegisterResponse`, `ProfessionalInfoResponse`.

- Archivos: `src/types/tenant.ts`, `src/types/clinic.ts`
  - Confirmar `logo`/`logoUrl` opcional y timestamps a `string` ISO.
  - Documentar opcionales y defaults.

### 2) Hooks de Listas y Duplicación

- Archivo: `src/hooks/use-healthUser.ts`
  - Eliminar lógica de listado de usuarios.
  - Mantener solo funciones de paciente: `getPatientBasicInfo`, `clearPatient`, estados relacionados.
  - Actualizar usos que aún apunten a `useHealthUsers` para listados.

- Archivo: `src/hooks/list/use-user-list.ts`
  - Mantener como base única para listados (genérico).
  - Validar que los logs/console no queden en build (remover o proteger por env).

- Archivo: `src/hooks/factory/useListFactory.ts`
  - Verificar exports usados realmente y facilitar tree-shaking.
  - Confirmar que `fetchFunctions` no importe adapters innecesarios si no se usan.

### 3) Tenant y Branding (Título y Logo)

- Archivo: `src/store/TenantStore.ts`
  - Agregar (o consolidar) normalización del logo en un selector/helper (`effectiveLogoUrl()`), con fallback a logo por defecto y cache-busting opcional (`?v=updatedAt`).
  - Agregar `setTenantFromResponse(resp)` que normalice y setee en un único punto.

- Archivo: `src/hooks/use-tenant.ts`
  - Mantener `useTenantFetcher` como punto único del fetch por dominio.
  - (Opcional) Exponer `getTenantLogo({ withVersion?: boolean })` como helper.

- Archivos de UI:
  - `src/components/admin/admin-layout.tsx`: ya integra `useDocumentTitle`; cuando se defina `effectiveLogoUrl`, considerar integrar `use-favicon`.
  - `src/app/admin/clinica/ClinicaDetail.tsx`: usar `effectiveLogoUrl` para mostrar logo (con `onError` fallback).

### 4) Páginas y Componentes (listas y accesibilidad)

- Archivos:
  - `src/app/admin/usuarios/HealthUserList.tsx`
  - `src/app/admin/administradores/AdminUserList.tsx`
  - `src/app/admin/profesionales/HealthProfessionalList.tsx`
  - Acciones:
    - Migrar a `useListFactory/useUserList` donde aplique.
    - Quitar lógica duplicada de filtrado/paginación si hay utilidades comunes.
    - Revisar imports de iconos para no traer más de lo necesario.

- Archivo: `src/components/admin/admin-layout.tsx`
  - Resolver avisos de accesibilidad donde aplique (elementos clickeables no nativos, handlers de teclado si corresponde).
  - Marcar props como `readonly` donde lo pida el linter.

### 5) Adapters y Services (consistencia y limpieza)

- Archivos:
  - `src/adapters/Dashboard/Admin/AdminDashboardAdapter.ts`
  - `src/adapters/TenantAdapter.ts`
  - `src/services/**`
  - Acciones:
    - Alinear firmas de métodos a tipos base unificados.
    - Eliminar imports no usados y comentarios obsoletos.
    - Asegurar que no haya ramas muertas que impidan tree-shaking.

### 6) Iconos y UI (peso del bundle)

- Reglas:
  - Importar iconos de `lucide-react` por nombre, solo en archivos que los usen.
  - Evitar barrels que re-exporten colecciones grandes de componentes.

### 7) Ruteo y Code Splitting

- Archivos de rutas y páginas principales (Home, Dashboard, secciones Admin/Profesional):
  - Aplicar `React.lazy` y `Suspense` para cargar por ruta.
  - Considerar `manualChunks` en Vite si fuera necesario.

### 8) Utilidades

- `src/utils/document.ts` y `src/hooks/use-documentTitle.ts`
  - A futuro: fusionar en un único hook utilitario (p. ej. `useDocumentBranding`) que maneje título + favicon.

### 9) Limpieza de Consolas y Logs

- Buscar y eliminar `console.*` en producción, o protegerlos por `import.meta.env.DEV`.

---

## Orden sugerido de ejecución

1. Tipos base (`src/types/User.ts`) y ajustes en adapters/services.
2. Hooks: consolidar `useUserList` y simplificar `useHealthUsers` (solo paciente).
3. Tenant: normalización de logo (`TenantStore`) y helpers (`use-tenant`).
4. Páginas de listas: migración a factory + limpieza de imports.
5. Accesibilidad y pequeños lints en `admin-layout` y otros.
6. Code splitting por rutas.
7. Limpieza de logs y utilidades duplicadas.

---

## Impacto esperado en el bundle

- Eliminación de duplicaciones y limpieza de imports: 5–10%.
- Iconos/UI importados con precisión: 5–8%.
- Limpieza de helpers/logs no usados: 2–4%.
- Code splitting en páginas: 10–20% menos en el chunk inicial (mejor TTI).

Estimación total de reducción: 15–30% del JS final (mayor impacto percibido en el entry con split por rutas).


