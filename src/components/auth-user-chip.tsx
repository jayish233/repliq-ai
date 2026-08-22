"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutDashboard, LogOut, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth/use-auth";
import type { AuthUser } from "@/lib/auth/types";
import { cn } from "@/lib/utils";

type AuthUserChipProps = {
  variant?: "landing" | "app";
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 1).toUpperCase() || "R";
}

function providerLabel(provider: AuthUser["provider"]) {
  if (provider === "google") return "Google";
  return "Email";
}

function Avatar({
  user,
  size,
}: {
  user: AuthUser;
  size: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-7 w-7 text-[10px]" : "h-11 w-11 text-sm";

  if (user.picture) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.picture}
        alt=""
        className={cn(dim, "rounded-full object-cover ring-1 ring-white/15")}
      />
    );
  }

  return (
    <span
      className={cn(
        dim,
        "flex items-center justify-center rounded-full bg-[#E1E0CC] font-semibold tracking-tight text-black ring-1 ring-white/15"
      )}
    >
      {initials(user.name)}
    </span>
  );
}

export function AuthUserChip({ variant = "app" }: AuthUserChipProps) {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const landing = variant === "landing";

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (loading) {
    return (
      <div
        className={cn(
          "animate-pulse rounded-full",
          landing ? "h-8 w-24 bg-white/10" : "h-10 w-36 border border-white/10 bg-white/5"
        )}
      />
    );
  }

  if (!user) {
    if (landing) {
      return (
        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] text-[#E1E0CC]/80 transition-colors hover:border-white/40 hover:text-[#E1E0CC] sm:text-xs"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-[#E1E0CC] px-3 py-1.5 text-[10px] font-semibold text-black transition-colors hover:bg-[#F0EEE6] sm:text-xs"
          >
            Sign up
          </Link>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
        >
          Sign up
        </Link>
      </div>
    );
  }

  const firstName = user.name.split(" ")[0] || user.name;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "group flex items-center gap-2 rounded-full border transition-colors",
          landing
            ? "border-white/15 bg-white/5 py-0.5 pr-2 pl-0.5 hover:border-white/30"
            : "border-white/10 bg-white/5 py-1 pr-2.5 pl-1 hover:border-white/25 hover:bg-white/10"
        )}
      >
        <Avatar user={user} size="sm" />
        <span
          className={cn(
            "hidden max-w-28 truncate font-medium sm:block",
            landing ? "text-[11px] text-[#E1E0CC]" : "text-xs text-white"
          )}
        >
          {firstName}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            landing ? "text-[#E1E0CC]/70" : "text-zinc-400",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+10px)] z-[80] w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c]/95 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 px-3.5 py-3.5">
            <Avatar user={user} size="md" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <p className="truncate text-xs text-zinc-500">{user.email}</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-600">
                {providerLabel(user.provider)}
              </p>
            </div>
          </div>

          <div className="h-px bg-white/8" />

          <div className="p-1.5">
            <Link
              href="/dashboard"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/8 hover:text-white"
            >
              <LayoutDashboard className="h-4 w-4 text-zinc-500" />
              Dashboard
            </Link>
            <Link
              href="/reconstruct/new"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/8 hover:text-white"
            >
              <Sparkles className="h-4 w-4 text-zinc-500" />
              New reconstruction
            </Link>
          </div>

          <div className="h-px bg-white/8" />

          <div className="p-1.5">
            <button
              type="button"
              role="menuitem"
              onClick={() => void logout()}
              className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm text-zinc-400 transition-colors hover:bg-rose-500/10 hover:text-rose-300"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
