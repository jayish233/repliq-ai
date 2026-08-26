"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { RepliqLogo } from "@/components/repliq-logo"
import { 
  Send, 
  Sparkles,
  ArrowUpRight,
  Terminal,
  Activity
} from "lucide-react"

const GithubIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const TwitterIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const DiscordIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
)

const LinkedinIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

function Footerdemo() {
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 3500)
      setEmail("")
    }
  }

  return (
    <footer className="relative border-t border-[rgba(240,238,230,0.12)] bg-[#050505] text-[#F5F5F5] transition-colors duration-300 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[600px] h-[300px] bg-[#E1E0CC] opacity-[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-6 sm:px-12 lg:px-20 xl:px-28 2xl:px-36 py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          
          {/* Col 1: Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <RepliqLogo size={32} className="h-8 w-8" />
              <span className="text-xl font-bold tracking-tight text-[#E8E5DC] font-sans">
                Repliq AI
              </span>
            </div>
            
            <p className="text-sm sm:text-base text-[#8C8983] max-w-md leading-relaxed font-sans">
              Rebuild the web from code & vision. An AI reconstruction engine turning repositories and screenshots into live, interactive interfaces.
            </p>

            <form onSubmit={handleSubscribe} className="relative max-w-md pt-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your developer email"
                className="pr-14 h-12 bg-[#0D0D10] border-white/10 text-sm placeholder:text-[#8C8983]/60 rounded-xl focus-visible:border-[#E1E0CC]/40 font-sans"
                required
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1.5 top-3.5 h-9 w-9 rounded-lg bg-[#E1E0CC] hover:bg-[#F0EEE6] text-black transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
              {subscribed && (
                <p className="absolute -bottom-6 left-1 text-xs text-emerald-400 font-mono animate-fade-in">
                  ✓ Subscribed for engine updates & benchmarks.
                </p>
              )}
            </form>

            <div className="flex items-center gap-3 pt-4">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-[#8C8983]">
                SYSTEM STATUS: 100% OPERATIONAL // v2.4.12
              </span>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-mono font-semibold tracking-widest text-[#8C8983] uppercase">
              Platform
            </h3>
            <nav className="flex flex-col space-y-3 text-sm font-sans">
              <Link href="/reconstruct/new" className="text-zinc-300 hover:text-[#E1E0CC] transition-colors flex items-center gap-1 group">
                Reconstruct Studio
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#E1E0CC]" />
              </Link>
              <Link href="/dashboard" className="text-zinc-300 hover:text-[#E1E0CC] transition-colors">
                Workspace Projects
              </Link>
              <a href="#engine" className="text-zinc-300 hover:text-[#E1E0CC] transition-colors">
                Pipeline Architecture
              </a>
              <a href="#comparison" className="text-zinc-300 hover:text-[#E1E0CC] transition-colors">
                Visual Comparator
              </a>
              <a href="#how-it-works" className="text-zinc-300 hover:text-[#E1E0CC] transition-colors">
                3-Stage Methodology
              </a>
            </nav>
          </div>

          {/* Col 3: Resources & Docs */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-mono font-semibold tracking-widest text-[#8C8983] uppercase">
              Resources
            </h3>
            <nav className="flex flex-col space-y-3 text-sm font-sans">
              <a href="#" className="text-zinc-300 hover:text-[#E1E0CC] transition-colors">
                Documentation
              </a>
              <a href="#" className="text-zinc-300 hover:text-[#E1E0CC] transition-colors">
                Design Presets
              </a>
              <a href="#" className="text-zinc-300 hover:text-[#E1E0CC] transition-colors">
                API Reference
              </a>
              <a href="#" className="text-zinc-300 hover:text-[#E1E0CC] transition-colors">
                Parity Benchmarks
              </a>
              <a href="#" className="text-zinc-300 hover:text-[#E1E0CC] transition-colors">
                Changelog
              </a>
            </nav>
          </div>

          {/* Col 4: Connect & Community */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-xs font-mono font-semibold tracking-widest text-[#8C8983] uppercase">
              Community & Connect
            </h3>
            <p className="text-xs sm:text-sm text-[#8C8983] leading-relaxed font-sans">
              Join the network of design engineers, architects, and product builders reconstructing precision web interfaces.
            </p>
            
            <div className="flex space-x-3 pt-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0D0D10] text-[#8C8983] hover:text-white hover:border-white/25 hover:bg-white/5 transition-all"
                    >
                      <GithubIcon className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Follow on GitHub</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0D0D10] text-[#8C8983] hover:text-white hover:border-white/25 hover:bg-white/5 transition-all"
                    >
                      <TwitterIcon className="h-3.5 w-3.5" />
                      <span className="sr-only">Twitter</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Follow on X / Twitter</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://discord.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0D0D10] text-[#8C8983] hover:text-white hover:border-white/25 hover:bg-white/5 transition-all"
                    >
                      <DiscordIcon className="h-4 w-4" />
                      <span className="sr-only">Discord</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Join Discord Community</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0D0D10] text-[#8C8983] hover:text-white hover:border-white/25 hover:bg-white/5 transition-all"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Connect on LinkedIn</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

        </div>

        {/* Bottom copyright rule */}
        <div className="mt-16 sm:mt-20 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/8 pt-8 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-[#8C8983] font-mono">
            <span>© 2026 REPLIQ AI. ALL RIGHTS RESERVED.</span>
            <span className="hidden md:inline text-white/20">•</span>
            <span className="text-[#8C8983]/60">PRECISION RECONSTRUCTION STUDIO</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#8C8983] font-mono">
            <a href="#" className="hover:text-white transition-colors">
              PRIVACY POLICY
            </a>
            <a href="#" className="hover:text-white transition-colors">
              TERMS OF SERVICE
            </a>
            <a href="#" className="hover:text-white transition-colors">
              SECURITY
            </a>
            <a href="#" className="hover:text-white transition-colors">
              SYSTEM STATUS
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
