/**
 * Diccionario de estilos globales para la aplicación HCEN Periférico Clínica
 * 
 * Centraliza todos los estilos de la aplicación para facilitar mantenimiento,
 * escalabilidad y consistencia visual en toda la plataforma.
 * 
 * @example
 * ```typescript
 * // Usar colores
 * className={`bg-[${GlobalStyles.colors.primary}]`}
 * 
 * // Usar tipografía
 * className={`${GlobalStyles.typography['2xl']} ${GlobalStyles.typography.bold}`}
 * 
 * // Usar componentes
 * className={GlobalStyles.components.button.primary}
 * ```
 * 
 * @version 1.0.0
 * @since 2025-01-XX
 */
export const GlobalStyles = {

    /**
     * Paleta de colores de la aplicación
     * 
     * Define todos los colores utilizados en la interfaz, organizados por categorías
     * para facilitar el mantenimiento y la consistencia visual.
     * 
     * @example
     * ```typescript
     * // Colores primarios
     * GlobalStyles.colors.primary        // #2980b9
     * GlobalStyles.colors.primaryDark    // #2471a3
     * 
     * // Colores del sidebar
     * GlobalStyles.colors.sidebarBg    // #2c3e50
     * GlobalStyles.colors.sidebarText  // #ecf0f1
     * ```
     */
    colors: {
        /** Color primario de la aplicación - azul claro para botones y elementos principales */
        primary: "#2980b9",
        /** Color primario oscuro - para estados hover y elementos activos */
        primaryDark: "#2471a3",

        /** Color de fondo del sidebar - azul oscuro */
        sidebarBg: "#2c3e50",
        /** Color de hover del sidebar - azul oscuro más claro */
        sidebarHover: "#34495e",
        /** Color de texto del sidebar - blanco/gris claro */
        sidebarText: "#ecf0f1",

        /** Color de fondo del body - azul muy claro */
        bodyBg: "#f4f7fa",
        /** Color de texto del body - azul claro */
        bodyText: "#2980b9",

        /** Color blanco puro */
        white: "#ffffff",
        /** Color negro puro */
        black: "#000000",
    },
    /**
     * Sistema tipográfico de la aplicación
     * 
     * Define tamaños, pesos y alturas de línea para mantener consistencia
     * en todos los textos de la interfaz.
     * 
     * @example
     * ```typescript
     * // Títulos principales
     * className={`${GlobalStyles.typography['4xl']} ${GlobalStyles.typography.bold}`}
     * 
     * // Texto de descripción
     * className={`${GlobalStyles.typography.sm} text-gray-600`}
     * ```
     */
    typography: {
        /** Texto muy pequeño - 12px - para labels y texto secundario */
        xs: 'text-xs',
        /** Texto pequeño - 14px - para descripciones y labels */
        sm: 'text-sm',
        /** Texto base - 16px - para inputs y texto normal */
        base: 'text-base',
        /** Texto grande - 18px - para párrafos importantes */
        lg: 'text-lg',
        /** Texto extra grande - 20px - para subtítulos */
        xl: 'text-xl',
        /** Texto 2xl - 24px - para títulos de sección */
        '2xl': 'text-2xl',
        /** Texto 4xl - 36px - para títulos principales */
        '4xl': 'text-4xl',

        /** Peso de fuente medio - 500 - para labels y botones */
        medium: 'font-medium',
        /** Peso de fuente semi-negrita - 600 - para títulos de card */
        semibold: 'font-semibold',
        /** Peso de fuente negrita - 700 - para títulos principales */
        bold: 'font-bold',

        /** Altura de línea compacta - 1.25 - para títulos */
        tight: 'leading-tight',
        /** Altura de línea normal - 1.5 - para texto normal */
        normal: 'leading-normal',
        /** Sin espacio entre líneas - 1 - para títulos de card */
        none: 'leading-none',
    },
    /**
     * Sistema de espaciado de la aplicación
     * 
     * Define padding, margin y espaciado entre elementos para mantener
     * consistencia visual y jerarquía en la interfaz.
     * 
     * @example
     * ```typescript
     * // Padding general
     * className={GlobalStyles.spacing.md_4}  // p-4
     * 
     * // Padding específico
     * className={GlobalStyles.spacing.px.lg_6}  // px-6
     * 
     * // Espaciado entre elementos
     * className={GlobalStyles.spacing.space.md_4}  // space-y-4
     * ```
     */
    spacing: {
        /** Padding medio - 16px - para contenedores principales */
        md_4: "p-4",
        /** Padding grande - 32px - para secciones amplias */
        md_8: "p-8",
        /** Padding grande - 24px - para cards y componentes */
        lg_6: "p-6",
        /** Padding extra grande - 32px - para layouts principales */
        lg_8: "p-8",

        /** Padding horizontal específico */
        px: {
            /** Padding horizontal pequeño - 12px */
            sm_3: "px-3",
            /** Padding horizontal medio - 16px */
            md_4: "px-4",
            /** Padding horizontal grande - 24px */
            lg_6: "px-6",
            /** Padding horizontal extra grande - 32px */
            xl_8: "px-8",
        },
        /** Padding vertical específico */
        py: {
            /** Padding vertical pequeño - 4px */
            sm_1: "py-1",
            /** Padding vertical medio - 8px */
            md_2: "py-2",
            /** Padding vertical grande - 24px */
            lg_6: "py-6",
        },

        /** Espaciado vertical entre elementos hijos */
        space: {
            /** Espaciado muy pequeño - 4px */
            xs_1: "space-y-1",
            /** Espaciado pequeño - 8px */
            sm_2: "space-y-2",
            /** Espaciado medio - 16px */
            md_4: "space-y-4",
            /** Espaciado grande - 24px */
            lg_6: "space-y-6",
            /** Espaciado extra grande - 32px */
            xl_8: "space-y-8",
        },

        /** Gap en grids y flexbox */
        gap: {
            /** Gap pequeño - 8px */
            sm_1: "gap-2",
            /** Gap medio - 16px */
            md_4: "gap-4",
            /** Gap grande - 24px */
            lg_6: "gap-6",
        },

        /** Margins específicos */
        margin: {
            /** Margin bottom pequeño - 16px */
            sm_4: "mb-4",
            /** Margin bottom medio - 8px */
            md_2: "mb-2",
            /** Margin bottom automático */
            lg_auto: "mb-auto",
        },
    },
    /**
     * Estilos de componentes reutilizables
     * 
     * Define las variantes y estilos base para todos los componentes
     * de la interfaz, asegurando consistencia visual.
     * 
     * @example
     * ```typescript
     * // Botón primario
     * className={GlobalStyles.components.button.primary}
     * 
     * // Card con hover
     * className={`${GlobalStyles.components.card.base} ${GlobalStyles.components.card.hover}`}
     * ```
     */
    components: {
        /** Estilos para el sidebar (pendiente de implementación) */
        sidebar: {
            // ...
        },
        /** Estilos para botones */
        button: {
            /** Estilos base para todos los botones */
            base: "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            /** Variante primaria - azul con hover */
            primary: "bg-[#2980b9] text-white hover:bg-[#2471a3]",
            /** Variante secundaria - gris claro */
            secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
            /** Variante outline - borde con fondo transparente */
            outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
            /** Variante ghost - solo hover */
            ghost: "hover:bg-gray-100",
            /** Tamaños de botones */
            sizes: {
                /** Tamaño por defecto - altura 40px */
                default: "h-10 px-4 py-2",
                /** Tamaño pequeño - altura 36px */
                sm: "h-9 rounded-md px-3",
                /** Tamaño grande - altura 44px */
                lg: "h-11 rounded-md px-8",
            },
            /** Variantes de botones (duplicado para compatibilidad) */
            variants: {
                /** Variante por defecto */
                default: 'bg-[#2980b9] text-white hover:bg-[#2471a3]',
                /** Variante secundaria */
                secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
                /** Variante outline */
                outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
                /** Variante ghost */
                ghost: 'hover:bg-gray-100'
            }
        },
        /** Estilos para cards */
        card: {
            /** Estilos base para todas las cards */
            base: 'bg-white text-gray-900 flex flex-col gap-6 rounded-2xl border border-gray-100/50 py-6 shadow-lg shadow-gray-100/50',
            /** Efecto hover para cards */
            hover: 'hover:shadow-2xl hover:shadow-gray-200/60',
            /** Estilos para el header de la card */
            header: '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
            /** Estilos para el título de la card */
            title: 'leading-none font-semibold',
            /** Estilos para la descripción de la card */
            description: 'text-muted-foreground text-sm',
            /** Estilos para el contenido de la card */
            content: 'px-6',
            /** Estilos para el footer de la card */
            footer: 'flex items-center px-6 [.border-t]:pt-6',
            /** Estilos para acciones en la card */
            action: 'col-start-2 row-span-2 row-start-1 self-start justify-self-end'
        },
        /** Estilos para inputs */
        input: {
            /** Estilos base para todos los inputs */
            base: 'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            /** Estilos para estado focus */
            focus: 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            /** Estilos para estado de error */
            error: 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            /** Estilos para estado deshabilitado */
            disabled: 'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        },
        /** Estilos para labels */
        label: {
            /** Estilos base para todos los labels */
            base: 'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        },
    },
    /**
     * Layouts y contenedores
     * 
     * Define estilos para layouts principales y contenedores
     * de la aplicación.
     * 
     * @example
     * ```typescript
     * // Layout principal
     * className={GlobalStyles.layout.main}
     * 
     * // Contenedor centrado
     * className={GlobalStyles.layout.container}
     * ```
     */
    layout: {
        /** Layout principal de la aplicación - pantalla completa centrada */
        main: 'min-h-screen bg-[#f4f7fa] flex items-center justify-center p-4',
        /** Contenedor principal - ancho máximo con espaciado */
        container: 'max-w-4xl w-full space-y-8',
        /** Grid de 2 columnas para cards - responsive */
        grid: 'grid gap-6 md:grid-cols-2 md:items-strech',
        /** Items stretch para alineación de altura */
        itemsStretch: 'md:items-strech',
        /** Centrado de elementos */
        center: 'items-center',
        /** Posición absoluta top-left con padding */
        absolute_tl_4: 'absolute top-4 left-4',
    },
    /**
     * Animaciones y transiciones
     * 
     * Define efectos de animación y transiciones para mejorar
     * la experiencia de usuario.
     * 
     * @example
     * ```typescript
     * // Transición suave
     * className={GlobalStyles.animations.transition}
     * 
     * // Efecto hover
     * className={GlobalStyles.animations.hover}
     * ```
     */
    animations: {
        /** Transición suave para todos los elementos */
        transition: 'transition-all duration-300 ease-out',
        /** Efecto hover de elevación */
        hover: 'hover:-translate-y-1',
        /** Efecto focus con ring azul */
        focus: 'focus-visible:ring-2 focus-visible:ring-[#2980b9] focus-visible:border-[#2980b9]',
    }
} as const;

/**
 * Tipos TypeScript para autocompletado y type safety
 * 
 * Proporciona tipos para todas las propiedades del objeto GlobalStyles,
 * permitiendo autocompletado en el IDE y verificación de tipos en tiempo de compilación.
 * 
 * @example
 * ```typescript
 * // Autocompletado disponible
 * const color: ColorKey = 'primary'; // ✅ Válido
 * const invalidColor: ColorKey = 'invalid'; // ❌ Error de TypeScript
 * 
 * // Uso en componentes
 * const buttonClass: ComponentVariant = 'primary'; // ✅ Válido
 * ```
 */
export type ColorKey = keyof typeof GlobalStyles.colors;
export type TypographySize = keyof typeof GlobalStyles.typography;
export type SpacingSize = keyof typeof GlobalStyles.spacing;
export type ComponentVariant = keyof typeof GlobalStyles.components.button;
export type LayoutKey = keyof typeof GlobalStyles.layout;
export type AnimationKey = keyof typeof GlobalStyles.animations;