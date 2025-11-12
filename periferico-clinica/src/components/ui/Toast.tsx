import type * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { X } from "lucide-react"

// Tipos de posición del toast
export type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"

// Variantes de estilo del toast
export type ToastVariant = "default" | "success" | "error" | "warning" | "info"

// Posiciones disponibles con sus estilos
const positionStyles: Record<ToastPosition, string> = {
  "top-left": "top-0 left-0",
  "top-center": "top-0 left-1/2 -translate-x-1/2",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-0 right-0",
}

// Variantes de color y estilo
const variantStyles: Record<ToastVariant, string> = {
  default: "bg-white border-gray-200 text-gray-900",
  success: "bg-green-50 border-green-200 text-green-900",
  error: "bg-red-50 border-red-200 text-red-900",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
  info: "bg-blue-50 border-blue-200 text-blue-900",
}

interface ToastProviderProps {
  children: React.ReactNode
  position?: ToastPosition
  duration?: number
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = "bottom-right",
  duration = 5000,
}) => {
  return (
    <ToastPrimitives.Provider swipeDirection="right" duration={duration}>
      {children}
      <ToastPrimitives.Viewport
         className={`fixed flex flex-col gap-2 w-full max-w-[420px] p-6 z-[9999] ${positionStyles[position]}`}
      />
    </ToastPrimitives.Provider>
  )
}

interface ToastProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  variant?: ToastVariant
  action?: React.ReactNode
  actions?: React.ReactNode[]
  duration?: number
  className?: string
}

export const Toast: React.FC<ToastProps> = ({
  open,
  onOpenChange,
  title,
  description,
  variant = "default",
  action,
  actions,
  duration,
  className = "",
}) => {
  return (
    <ToastPrimitives.Root
      open={open}
      onOpenChange={onOpenChange}
      duration={duration}
      className={`
        ${variantStyles[variant]}
        ${className}
        rounded-lg border shadow-lg p-4 
        data-[state=open]:animate-in data-[state=closed]:animate-out
        data-[swipe=end]:animate-out
        data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full
        data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full
      `}
    >
      <div className="flex gap-3">
        <div className="flex-1 space-y-1">
          {title && <ToastPrimitives.Title className="text-sm font-semibold">{title}</ToastPrimitives.Title>}
          {description && (
            <ToastPrimitives.Description className="text-sm opacity-90">{description}</ToastPrimitives.Description>
          )}
        </div>
        {actions && actions.length > 0 && (
          <div className="flex gap-2 items-start">
            {actions.map((actionElement, index) => (
              <ToastPrimitives.Action key={index} asChild altText={`Action ${index + 1}`}>
                {actionElement}
              </ToastPrimitives.Action>
            ))}
          </div>
        )}
        {action && !actions && (
          <ToastPrimitives.Action asChild altText="Action">
            {action}
          </ToastPrimitives.Action>
        )}
        <ToastPrimitives.Close className="rounded-md p-1 hover:bg-black/10 transition-colors">
          <X className="h-4 w-4" />
        </ToastPrimitives.Close>
      </div>
    </ToastPrimitives.Root>
  )
}

// Componente simple para el contenido del toast
interface ToastContentProps {
  title?: string
  description?: string
  variant?: ToastVariant
  action?: React.ReactNode
}

export const ToastContent: React.FC<ToastContentProps> = ({ title, description, variant = "default", action }) => {
  return (
    <div className={`rounded-lg border shadow-lg p-4 ${variantStyles[variant]}`}>
      <div className="flex gap-3">
        <div className="flex-1 space-y-1">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  )
}
