import type React from "react"

import { createContext, useContext, useState, useCallback, useMemo, createElement, useRef} from "react"
import type { ToastVariant, ToastPosition } from "../components/ui/Toast"
import { markToastAsClosed, removeToast } from "./helper/toastHelper"

export interface ToastOptions {
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
  action?: React.ReactNode
  actions?: React.ReactNode[]
}

export interface ToastState extends ToastOptions {
  id: string
  open: boolean
}

type ToastContextType = "title" | "description" | "variant"

let toastCount = 0

interface ToastContextValue {
  toasts: ToastState[]
  position: ToastPosition
  duration: number
  show: (options: ToastOptions) => string
  success: (title: string, description?: string, options?: Omit<ToastOptions, ToastContextType>) => string
  error: (title: string, description?: string, options?: Omit<ToastOptions, ToastContextType>) => string
  warning: (title: string, description?: string, options?: Omit<ToastOptions, ToastContextType>) => string
  info: (title: string, description?: string, options?: Omit<ToastOptions, ToastContextType>) => string
  dismiss: (id: string) => void
  dismissAll: () => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

function useToastProvider(position: ToastPosition, duration: number): ToastContextValue {
  const [toasts, setToasts] = useState<ToastState[]>([])
  
  const toastsRef = useRef<ToastState[]>([]);


  const dismiss = useCallback((id: string) => {
    
    toastsRef.current = markToastAsClosed(toastsRef.current, id)
    setToasts([... toastsRef.current])

    // Remover del estado después de la animación
    setTimeout(() => {
      toastsRef.current = removeToast(toastsRef.current, id)
      setToasts([... toastsRef.current])
    }, 200)
  }, [])

  const dismissAll = useCallback(() => {
    setToasts((prev) => prev.map((toast) => ({ ...toast, open: false })))

    setTimeout(() => {
      setToasts([])
    }, 200)
  }, [])

  const show = useCallback(
    (options: ToastOptions) => {
      const id = `toast-${++toastCount}-${Date.now()}`
      const newToast: ToastState = {
        id,
        open: true,
        variant: options.variant || "default",
        title: options.title,
        description: options.description,
        duration: options.duration || duration,
        action: options.action,
        actions: options.actions,
      }

      setToasts((prev) => [...prev, newToast])

      // Auto-remove después de la duración especificada
      const timeoutDuration = options.duration || duration
      setTimeout(() => {
        dismiss(id)
      }, timeoutDuration)

      return id
    },
    [dismiss, duration],
  )

  const success = useCallback(
    (title: string, description?: string, options?: Omit<ToastOptions, ToastContextType>) => {
      return show({ ...options, title, description, variant: "success" })
    },
    [show],
  )

  const error = useCallback(
    (title: string, description?: string, options?: Omit<ToastOptions, ToastContextType>) => {
      return show({ ...options, title, description, variant: "error" })
    },
    [show],
  )

  const warning = useCallback(
    (title: string, description?: string, options?: Omit<ToastOptions, ToastContextType>) => {
      return show({ ...options, title, description, variant: "warning" })
    },
    [show],
  )

  const info = useCallback(
    (title: string, description?: string, options?: Omit<ToastOptions, ToastContextType>) => {
      return show({ ...options, title, description, variant: "info" })
    },
    [show],
  )

  return useMemo(
    () => ({
      toasts,
      position,
      duration,
      show,
      success,
      error,
      warning,
      info,
      dismiss,
      dismissAll,
    }),
    [toasts, position, duration, show, success, error, warning, info, dismiss, dismissAll],
  )
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
  const value = useToastProvider(position, duration)
  return createElement(ToastContext.Provider, { value }, children)
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast debe utilizarse dentro de un ToastProvider")
  }
  return context
}
