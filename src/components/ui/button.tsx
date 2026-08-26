import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const variantClasses = {
      default: "bg-[#E1E0CC] text-black hover:bg-[#F0EEE6] font-semibold",
      destructive: "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20",
      outline: "border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20",
      secondary: "bg-white/10 text-white hover:bg-white/15",
      ghost: "hover:bg-white/5 hover:text-white text-[#8C8983]",
      link: "text-[#E1E0CC] underline-offset-4 hover:underline",
    }[variant]

    const sizeClasses = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-9 rounded-md px-3 text-xs",
      lg: "h-12 rounded-xl px-8 text-base",
      icon: "h-10 w-10 p-0",
    }[size]

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          variantClasses,
          sizeClasses,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
