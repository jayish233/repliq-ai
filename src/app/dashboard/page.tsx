'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Plus, Calendar, CheckCircle2, AlertTriangle, 
  Trash2, RefreshCcw, LayoutGrid, Clock, CreditCard, ChevronRight, Loader2 
} from 'lucide-react';
import { getProjects, deleteProject, getCredits, resetCredits, Project } from '@/lib/ai/pipeline';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [credits, setCredits] = useState(100);

  // Load history data
  const loadData = () => {
    setProjects(getProjects());
    setCredits(getCredits());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Delete project
  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this reconstruction?')) {
      deleteProject(id);
      loadData();
    }
  };

  // Reset wallet credits
  const handleResetCredits = () => {
    const nextVal = resetCredits();
    setCredits(nextVal);
    alert('Wallet credits reset to 100!');
  };

  // Click card router navigation
  const handleCardClick = (p: Project) => {
    if (p.status === 'READY') {
      router.push(`/workspace/${p.id}`);
    } else {
      router.push(`/reconstruct/${p.id}/analyzing`);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans flex flex-col justify-between dot-grid">
      
      {/* Header */}
      <header className="h-16 border-b border-white/8 bg-[#0B0B0D] px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-7 h-7 bg-[#8B5CF6] rounded flex items-center justify-center font-bold text-white tracking-widest text-xs">
            R
          </Link>
          <span className="font-bold tracking-tight text-sm text-[#F5F5F5] uppercase">REPLIQ AI</span>
        </div>

        <nav className="flex items-center gap-4">
          <button 
            onClick={handleResetCredits}
            className="text-[10px] font-mono text-[#8A8A8F] hover:text-white transition-colors flex items-center gap-1.5"
            title="Reset Free Credits to 100"
          >
            <RefreshCcw className="w-3 h-3" />
            Reset Credits
          </button>
        </nav>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:py-12 space-y-8">
        
        {/* User profile & stats panel */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#0B0B0D] border border-white/8 rounded-2xl p-6 md:p-8">
          <div className="space-y-1.5">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase">GOOD EVENING, RUDAR</h1>
            <p className="text-xs text-[#8A8A8F]">Welcome back to your workspace. Start a new build or resume previous iterations.</p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <div className="text-left font-mono text-xs space-y-1 border-r border-white/10 pr-6">
              <span className="text-[#8A8A8F] block uppercase text-[10px] tracking-wider">AVAILABLE WALLET</span>
              <strong className="text-white text-base">{credits} / 100 Credits</strong>
            </div>

            <Link 
              href="/reconstruct/new" 
              className="px-4 py-2.5 bg-[#8B5CF6] hover:bg-[#7c3aed] text-white font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-lg shadow-[#8B5CF6]/10"
            >
              <Plus className="w-4 h-4" />
              New Reconstruction
            </Link>
          </div>
        </section>

        {/* History Grids */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/8 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold font-mono tracking-widest text-[#8A8A8F] uppercase">
              <LayoutGrid className="w-4 h-4" />
              <span>RECENT_RECONSTRUCTIONS</span>
            </div>
            <span className="text-[10px] font-mono text-[#8A8A8F]">{projects.length} PROJECTS TOTAL</span>
          </div>

          {projects.length === 0 ? (
            /* Empty State */
            <div className="py-20 text-center bg-[#0B0B0D] border border-dashed border-white/10 rounded-2xl space-y-5">
              <div className="w-12 h-12 bg-white/3 border border-white/8 rounded-xl mx-auto flex items-center justify-center text-[#8A8A8F]">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold font-mono tracking-widest text-white uppercase">NO RECONSTRUCTIONS YET</h3>
                <p className="text-[11px] text-[#8A8A8F] max-w-xs mx-auto">Your first visual project reconstruction is waiting. Create it now to test the engine.</p>
              </div>
              <div className="pt-2">
                <Link 
                  href="/reconstruct/new" 
                  className="px-4 py-2 border border-white/8 hover:border-[#8B5CF6]/30 bg-[#101012] hover:bg-[#8B5CF6]/5 transition-all text-xs font-semibold rounded-lg text-white inline-flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Create First Reconstruction
                </Link>
              </div>
            </div>
          ) : (
            /* Projects Grid List */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => handleCardClick(p)}
                  className="bg-[#0B0B0D] border border-white/8 hover:border-[#8B5CF6]/30 transition-all rounded-xl p-5 space-y-4 flex flex-col justify-between relative group cursor-pointer"
                >
                  
                  {/* Card Header */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      {/* Status Pills */}
                      {p.status === 'READY' ? (
                        <span className="text-[9px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          ● READY
                        </span>
                      ) : p.status === 'FAILED' ? (
                        <span className="text-[9px] font-mono font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          ● FAILED
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono font-semibold text-[#8B5CF6] bg-[#8B5CF6]/10 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                          <Loader2 className="w-2.5 h-2.5 animate-spin" />
                          {p.status}
                        </span>
                      )}

                      {/* Delete action button */}
                      <button 
                        onClick={(e) => handleDelete(e, p.id)}
                        className="p-1 text-[#8A8A8F] hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all rounded hover:bg-white/4"
                        title="Delete Reconstruction"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="text-sm font-semibold tracking-tight text-white group-hover:text-[#8B5CF6] transition-colors uppercase">
                      {p.name}
                    </h3>
                  </div>

                  {/* Card Image preview wrapper */}
                  <div 
                    className="w-full aspect-[1.8/1] rounded-lg bg-cover bg-center border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity" 
                    style={{ backgroundImage: `url(${p.screenshots[0]?.url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80'})` }}
                  />

                  {/* Card Metadata info */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex justify-between items-center text-[10px] font-mono text-[#8A8A8F]">
                      <span className="flex items-center gap-1">
                        <GithubIcon className="w-3 h-3" />
                        {p.repositoryUrl.replace('https://github.com/', '').substring(0, 18)}...
                      </span>
                      <span>{p.branch}</span>
                    </div>

                    <div className="flex justify-between items-center text-[9px] font-mono text-[#8A8A8F]/70">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(p.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <CreditCard className="w-3 h-3" />
                        {p.creditsUsed} Credits
                      </span>
                    </div>
                  </div>

                  {/* Go Arrow indicator */}
                  <div className="absolute bottom-5 right-5 p-1 bg-[#8B5CF6] text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100 pointer-events-none">
                    <ChevronRight className="w-4.5 h-4.5" />
                  </div>

                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/8 bg-[#050505] text-center text-[10px] text-[#8A8A8F] font-mono">
        <span>REPLIQ HISTORY MANAGER ENGINE.</span>
      </footer>
    </div>
  );
}
