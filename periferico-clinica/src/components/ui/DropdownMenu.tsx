import * as React from "react"
import { cn } from "../../utils"

interface DropdownMenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "start" | "end"
}

export function DropdownMenu({ trigger, children, align = "end" }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [position, setPosition] = React.useState({ top: 0, left: 0 })
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Calcular posición cuando se abre
      if (dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect()
        setPosition({
          top: rect.bottom + window.scrollY + 8,
          left: align === "end" ? rect.right - 192 : rect.left
        })
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, align])

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className="fixed z-[9999] -mt-10 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          style={{
            top: position.top,
            left: position.left
          }}
        >
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  variant?: "default" | "danger"
}

export function DropdownMenuItem({ icon, children, variant = "default", className, ...props }: DropdownMenuItemProps) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 px-4 py-2 text-sm text-left transition-colors",
        variant === "default" && "text-gray-700 hover:bg-gray-100",
        variant === "danger" && "text-red-600 hover:bg-red-50",
        className,
      )}
      {...props}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </button>
  )
}
