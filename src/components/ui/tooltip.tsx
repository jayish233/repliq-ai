"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TooltipContext = React.createContext<TooltipContextType | null>(null)

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function Tooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-flex">{children}</div>
    </TooltipContext.Provider>
  )
}

export function TooltipTrigger({
  children,
  asChild,
}: {
  children: React.ReactNode
  asChild?: boolean
}) {
  const ctx = React.useContext(TooltipContext)

  return (
    <div
      onMouseEnter={() => ctx?.setOpen(true)}
      onMouseLeave={() => ctx?.setOpen(false)}
      onFocus={() => ctx?.setOpen(true)}
      onBlur={() => ctx?.setOpen(false)}
      className="inline-flex"
    >
      {children}
    </div>
  )
}

export function TooltipContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ctx = React.useContext(TooltipContext)
  if (!ctx?.open) return null

  return (
    <div
      className={cn(
        "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 overflow-hidden rounded-lg border border-white/10 bg-[#0B0B0D] px-3 py-1.5 text-xs text-[#E1E0CC] shadow-xl backdrop-blur-md whitespace-nowrap animate-in fade-in zoom-in-95 pointer-events-none font-mono",
        className
      )}
    >
      {children}
    </div>
  )
}
