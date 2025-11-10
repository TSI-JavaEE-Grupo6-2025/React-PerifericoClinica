
import type React from "react"
import { cn } from "../../utils/cn"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface DialogContentProps {
  children: React.ReactNode
  className?: string
}

interface DialogHeaderProps {
  children: React.ReactNode
  className?: string
}

interface DialogTitleProps {
  children: React.ReactNode
  className?: string
}

interface DialogDescriptionProps {
  children: React.ReactNode
  className?: string
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null


  const handleClose = () => {
    onOpenChange(false)
  }
 
//   TODO: Corregir los warnings de sonarQube

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      {/* Dialog Content */}
      {children}
    </div>
  )
}

export const DialogContent: React.FC<DialogContentProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative z-50 w-full max-w-lg bg-white rounded-lg shadow-lg p-6",
        "animate-in fade-in-0 zoom-in-95",
        className,
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)}>{children}</div>
}

export const DialogTitle: React.FC<DialogTitleProps> = ({ children, className }) => {
  return <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>{children}</h2>
}

export const DialogDescription: React.FC<DialogDescriptionProps> = ({ children, className }) => {
  return <p className={cn("text-sm text-gray-500", className)}>{children}</p>
}
