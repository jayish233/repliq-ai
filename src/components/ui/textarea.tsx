import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-xl border border-white/10 bg-[#0D0D10] px-4 py-3 text-sm text-white ring-offset-black placeholder:text-[#8C8983]/60 focus-visible:outline-none focus-visible:border-[#E1E0CC]/40 focus-visible:ring-1 focus-visible:ring-[#E1E0CC]/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-sans",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
