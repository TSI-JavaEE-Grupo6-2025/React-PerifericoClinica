
import type React from "react"
import { ToastProvider as RadixToastProvider, Toast } from "./Toast"
import { useToast } from "../../hooks/use-toast"
import type { ToastPosition } from "./Toast"

interface ToasterProps {
  position?: ToastPosition
  duration?: number
}

export const Toaster: React.FC<ToasterProps> = ({ position, duration }) => {
  const { toasts, dismiss, position: contextPosition, duration: contextDuration } = useToast()

  const resolvedPosition = position ?? contextPosition ?? "bottom-right"
  const resolvedDuration = duration ?? contextDuration ?? 5000

  return (
    <RadixToastProvider position={resolvedPosition} duration={resolvedDuration}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          open={toast.open}
          onOpenChange={(open) => {
            if (!open) dismiss(toast.id)
          }}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          action={toast.action}
          actions={toast.actions}
          duration={toast.duration}
        />
      ))}
    </RadixToastProvider>
  )
}
