/**
 * Tipos para los estilos de la aplicación
 * 
 * Estos tipos proporcionan type safety para acceder a las propiedades
 * del objeto GlobalStyles de forma segura.
 */

import type { GlobalStyles } from "../styles/styles";

/**
 * Clave para acceder a los colores del GlobalStyles
 * 
 * @example
 * ```typescript
 * const color: ColorKey = 'primary';
 * const colorValue = GlobalStyles.colors[color];
 * ```
 */
export type ColorKey = keyof typeof GlobalStyles.colors;

/**
 * Tamaño de tipografía disponible en GlobalStyles
 * 
 * @example
 * ```typescript
 * const size: TypographySize = 'lg';
 * const fontSize = GlobalStyles.typography[size];
 * ```
 */
export type TypographySize = keyof typeof GlobalStyles.typography;

/**
 * Tamaño de espaciado disponible en GlobalStyles
 * 
 * @example
 * ```typescript
 * const spacing: SpacingSize = 'md_4';
 * const margin = GlobalStyles.spacing[spacing];
 * ```
 */
export type SpacingSize = keyof typeof GlobalStyles.spacing;

/**
 * Variante de componente button disponible
 * 
 * @example
 * ```typescript
 * const variant: ComponentVariant = 'primary';
 * const buttonStyle = GlobalStyles.components.button[variant];
 * ```
 */
export type ComponentVariant = keyof typeof GlobalStyles.components.button;

/**
 * Clave para acceder a los layouts del GlobalStyles
 * 
 * @example
 * ```typescript
 * const layout: LayoutKey = 'main';
 * const layoutStyle = GlobalStyles.layout[layout];
 * ```
 */
export type LayoutKey = keyof typeof GlobalStyles.layout;

/**
 * Clave para acceder a las animaciones del GlobalStyles
 * 
 * @example
 * ```typescript
 * const animation: AnimationKey = 'hover';
 * const animationStyle = GlobalStyles.animations[animation];
 * ```
 */
export type AnimationKey = keyof typeof GlobalStyles.animations;