import * as React from "react"
import { cn } from "../../utils"

interface DropdownMenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "start" | "end"
}

export function DropdownMenu({ trigger, children, align = "end" }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          <div className="py-1" onClick={() => setIsOpen(false)}>
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
