// components/ui/toast.jsx
import { cn } from "@/lib/utils"
import { XIcon } from "lucide-react"

export function Toast({ 
  className, 
  children, 
  variant = "default", 
  onClose, 
  ...props 
}) {
  const variantStyles = {
    default: "bg-background border",
    success: "bg-green-600 text-white",
    error: "bg-destructive text-white",
    warning: "bg-amber-500 text-white",
    info: "bg-blue-500 text-white"
  }

  return (
    <div 
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center justify-between rounded-md px-4 py-2 shadow-lg", 
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div>{children}</div>
      {onClose && (
        <button 
          onClick={onClose} 
          className="ml-4 rounded-full p-1 text-current/80 hover:text-current"
        >
          <XIcon className="size-4" />
          <span className="sr-only">Fermer</span>
        </button>
      )}
    </div>
  )
}