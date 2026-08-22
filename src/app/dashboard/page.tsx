'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  CheckCircle2,
  Trash2,
  RefreshCcw,
  LayoutDashboard,
  Clock,
  CreditCard,
  ChevronRight,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Home,
  Sparkles,
  Wallet,
  Star,
  Target,
  Crown,
} from 'lucide-react';
import { getProjects, deleteProject, getCredits, resetCredits, Project } from '@/lib/ai/pipeline';
import { RepliqLogo } from '@/components/repliq-logo';
import { AuthUserChip } from '@/components/auth-user-chip';
import { useAuth } from '@/lib/auth/use-auth';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-1 flex-col items-center justify-center cursor-default transition-transform hover:-translate-y-1">
    <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
    <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 sm:text-xs">{label}</span>
  </div>
);

function greetingForHour(hour: number) {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

function repoLabel(url: string) {
  return url.replace('https://github.com/', '').replace(/\/$/, '');
}

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [credits, setCredits] = useState(100);
  const [isScrolled, setIsScrolled] = useState(false);
  const [greeting, setGreeting] = useState('Welcome back');

  const loadData = () => {
    setProjects(getProjects());
    setCredits(getCredits());
  };

  useEffect(() => {
    loadData();
    setGreeting(greetingForHour(new Date().getHours()));
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this reconstruction?')) {
      deleteProject(id);
      loadData();
    }
  };

  const handleResetCredits = () => {
    const nextVal = resetCredits();
    setCredits(nextVal);
  };

  const handleCardClick = (p: Project) => {
    if (p.status === 'READY') {
      router.push(`/workspace/${p.id}`);
    } else {
      router.push(`/reconstruct/${p.id}/analyzing`);
    }
  };

  const readyCount = projects.filter((p) => p.status === 'READY').length;
  const runningCount = projects.filter((p) => p.status !== 'READY' && p.status !== 'FAILED').length;
  const creditPercent = Math.min(100, Math.round((credits / 100) * 100));
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <div className="relative flex min-h-dvh w-full flex-col overflow-x-hidden bg-[#0a0a0a] font-sans text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-[#1c1c1c] via-[#111111] to-black" />
        <div
          className="absolute inset-0 bg-[url(https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=2000&q=80)] bg-cover bg-center opacity-30"
          style={{
            maskImage: 'linear-gradient(180deg, transparent, black 8%, black 72%, transparent)',
            WebkitMaskImage: 'linear-gradient(180deg, transparent, black 8%, black 72%, transparent)',
          }}
        />
        <div className="absolute left-1/2 top-0 h-120 w-180 -translate-x-1/2 rounded-full bg-[#3a3a3a]/35 blur-[120px]" />
        <div className="absolute -left-16 top-1/3 h-72 w-72 rounded-full bg-[#2a2a2a]/40 blur-[100px]" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#404040]/20 blur-[110px]" />
      </div>

      <header className={`fixed left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 transition-all duration-500 ease-[0.16,1,0.3,1] sm:w-[calc(100%-3rem)] ${
        isScrolled ? 'top-3' : 'top-5 sm:top-6'
      }`}>
        <div className="flex h-14 items-center justify-between gap-3 rounded-full border border-white/10 bg-black/40 px-2 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-2xl sm:h-16 sm:px-3">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Back to home"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label="Repliq home">
              <RepliqLogo size={32} priority className="h-8 w-8" />
              <span className="hidden truncate text-sm font-medium tracking-wide text-white sm:block">
                Repliq
              </span>
            </Link>
          </div>

          <nav className="hidden items-center rounded-full border border-white/10 bg-white/5 p-1 md:flex">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
            >
              <Home className="h-3.5 w-3.5" />
              Home
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-zinc-950">
              <LayoutDashboard className="h-3.5 w-3.5" />
              Dashboard
            </span>
            <Link
              href="/reconstruct/new"
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Reconstruct
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md sm:inline-flex">
              <Wallet className="h-3.5 w-3.5 text-zinc-300" />
              <span className="hidden text-xs text-zinc-400 lg:inline">Wallet</span>
              <strong className="text-sm font-semibold text-white">{credits}</strong>
            </div>
            <AuthUserChip />
          </div>
        </div>
      </header>

      <main className="relative z-10 flex w-full flex-1 flex-col">
        <section className="flex min-h-dvh w-full items-center px-6 py-24 sm:px-8 lg:px-12">
          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="flex flex-col justify-center space-y-8 lg:col-span-7">
              <div className="animate-fade-in delay-100">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md transition-colors hover:bg-white/10">
                  <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-300 sm:text-xs">
                    Repliq workspace
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  </span>
                </div>
              </div>

              <h1
                className="animate-fade-in delay-200 text-5xl font-medium leading-[0.9] tracking-tighter sm:text-6xl lg:text-7xl"
                style={{
                  maskImage: 'linear-gradient(180deg, black 0%, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(180deg, black 0%, black 80%, transparent 100%)',
                }}
              >
                {greeting},<br />
                <span className="bg-linear-to-br from-white via-white to-[#ffcd75] bg-clip-text text-transparent">
                  {firstName}
                </span>
              </h1>

              <p className="animate-fade-in delay-300 max-w-xl text-lg leading-relaxed text-zinc-400">
                Welcome back to your workspace. Resume a previous reconstruction or start a new visual build.
              </p>

              <div className="animate-fade-in delay-400 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/reconstruct/new"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-all hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98]"
                >
                  <Plus className="h-4 w-4" />
                  New reconstruction
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  type="button"
                  onClick={handleResetCredits}
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Reset credits
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
                <div className="pointer-events-none absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold tracking-tight text-white">{credits}</div>
                      <div className="text-sm text-zinc-400">Credits available</div>
                    </div>
                  </div>

                  <div className="mb-8 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Wallet balance</span>
                      <span className="font-medium text-white">{creditPercent}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/50">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-white to-zinc-400"
                        style={{ width: `${creditPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="mb-6 h-px w-full bg-white/10" />

                  <div className="flex items-stretch justify-between gap-2 text-center">
                    <StatItem value={`${projects.length}`} label="Projects" />
                    <div className="w-px bg-white/10" />
                    <StatItem value={`${readyCount}`} label="Ready" />
                    <div className="w-px bg-white/10" />
                    <StatItem value={`${runningCount}`} label="Running" />
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </span>
                      LIVE
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                      <Crown className="h-3 w-3 text-yellow-500" />
                      STUDIO
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full px-6 pb-16 sm:px-8 lg:px-12">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">01</p>
              <h2 className="text-lg font-medium tracking-tight text-white">Recent reconstructions</h2>
              <p className="mt-1 text-sm text-zinc-500">Open a project to resume the pipeline or enter the workspace.</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-zinc-300">
              {projects.length} {projects.length === 1 ? 'project' : 'projects'}
            </span>
          </div>

          {projects.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 px-6 py-16 text-center backdrop-blur-xl">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <h3 className="mb-1 text-base font-medium text-white">No reconstructions yet</h3>
              <p className="mx-auto mb-6 max-w-sm text-sm text-zinc-500">
                Your first visual reconstruction is waiting. Create it now to test the engine.
              </p>
              <Link
                href="/reconstruct/new"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-all hover:scale-[1.02] hover:bg-zinc-200"
              >
                <Plus className="h-4 w-4" />
                Create first reconstruction
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleCardClick(p)}
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                >
                  <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

                  <div className="relative mb-4 flex items-start justify-between gap-3">
                    {p.status === 'READY' ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium tracking-wide text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        READY
                      </span>
                    ) : p.status === 'FAILED' ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-[10px] font-medium tracking-wide text-rose-400">
                        FAILED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        {p.status}
                      </span>
                    )}

                    <button
                      onClick={(e) => handleDelete(e, p.id)}
                      className="rounded-lg border border-white/10 bg-black/40 p-1.5 text-zinc-400 opacity-0 transition-all group-hover:opacity-100 hover:border-rose-500/30 hover:bg-rose-500 hover:text-white"
                      title="Delete reconstruction"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <h3 className="relative mb-4 text-lg font-medium tracking-tight text-white">
                    {p.name}
                  </h3>

                  <div
                    className="relative mb-4 aspect-[1.8/1] w-full rounded-2xl border border-white/5 bg-cover bg-center opacity-80 transition-opacity group-hover:opacity-100"
                    style={{ backgroundImage: `url(${p.screenshots[0]?.url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'})` }}
                  />

                  <div className="relative mt-auto space-y-2 border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between text-sm text-zinc-400">
                      <span className="flex min-w-0 items-center gap-1.5">
                        <GithubIcon className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{repoLabel(p.repositoryUrl)}</span>
                      </span>
                      <span className="shrink-0 text-zinc-500">{p.branch}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(p.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CreditCard className="h-3.5 w-3.5" />
                        {p.creditsUsed} credits
                      </span>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute right-5 bottom-5 flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-950 opacity-0 transition-all group-hover:opacity-100">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="relative z-10 w-full border-t border-white/10 bg-white/5 py-6 text-center backdrop-blur-xl">
        <p className="text-sm tracking-wide text-zinc-500">
          Repliq Engine v1.0 · Workspace history
        </p>
      </footer>
    </div>
  );
}
