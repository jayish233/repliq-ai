'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Loader2, CheckCircle2, ChevronDown, ChevronUp, Terminal as TermIcon, 
  Play, Shield, Activity, RefreshCw 
} from 'lucide-react';
import { getProject, runPipeline, Project, ProjectStatus } from '@/lib/ai/pipeline';
import { RepliqLogo } from '@/components/repliq-logo';
import { Footerdemo } from '@/components/ui/footer-section';

interface TimelineStep {
  statusKey: ProjectStatus;
  label: string;
  subText: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  { statusKey: 'QUEUED', label: 'Repo connected', subText: 'Established link to target source code files' },
  { statusKey: 'ANALYZING', label: 'Project structure analyzed', subText: 'Mapped directory folders, configs, and layout systems' },
  { statusKey: 'UNDERSTANDING', label: 'Screenshots understood', subText: 'Analyzed grid geometries and color palettes' },
  { statusKey: 'GENERATING', label: 'Mapping interface structure', subText: 'Matched layout blocks with source components' },
  { statusKey: 'BUILDING', label: 'Generating components code', subText: 'Created and injected functional React layouts' },
  { statusKey: 'FIXING', label: 'Building project & validating', subText: 'Compiling files and validating syntax integrity' }
];

export default function AnalyzingPipelinePage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const [project, setProject] = useState<Project | null>(null);
  const [terminalExpanded, setTerminalExpanded] = useState(true);
  const [pipelineStarted, setPipelineStarted] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Load project on mount
  useEffect(() => {
    if (!id) return;
    const p = getProject(id);
    if (!p) {
      router.push('/dashboard');
      return;
    }
    setProject(p);
  }, [id, router]);

  // Run pipeline simulation once loaded
  useEffect(() => {
    if (!project || pipelineStarted) return;
    if (project.status === 'READY') {
      router.push(`/workspace/${project.id}`);
      return;
    }
    
    setPipelineStarted(true);
    runPipeline(project.id, (updatedProj) => {
      setProject({ ...updatedProj });
      if (updatedProj.status === 'READY') {
        setTimeout(() => {
          router.push(`/workspace/${updatedProj.id}`);
        }, 1500); // Small pause for success visual gratification
      }
    });
  }, [project, pipelineStarted, router]);

  // Auto scroll terminal logs
  useEffect(() => {
    if (terminalExpanded && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [project?.logs, terminalExpanded]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-xs font-mono text-[#8A8A8F]">
        <Loader2 className="w-4 h-4 animate-spin text-[#8B5CF6] mr-2" />
        LOADING PIPELINE STATE...
      </div>
    );
  }

  // Determine helper index to color steps
  const getStepState = (stepIndex: number, currentStatus: ProjectStatus) => {
    const statusOrder: ProjectStatus[] = [
      'QUEUED', 'ANALYZING', 'UNDERSTANDING', 'GENERATING', 'BUILDING', 'FIXING', 'READY'
    ];
    
    const currentIdx = statusOrder.indexOf(currentStatus);
    const stepStatusOrder = statusOrder.indexOf(TIMELINE_STEPS[stepIndex].statusKey);

    if (currentStatus === 'READY') return 'completed';
    if (currentIdx > stepStatusOrder) return 'completed';
    if (currentIdx === stepStatusOrder) return 'active';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans flex flex-col justify-between">
      {/* Header */}
      <header className="h-16 border-b border-white/8 bg-[#0B0B0D] px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="shrink-0" aria-label="Repliq dashboard">
            <RepliqLogo size={24} className="h-6 w-6" />
          </Link>
          <span className="text-xs font-semibold tracking-wider font-mono text-[#8A8A8F]">
            {project.name.toUpperCase()} / PIPELINE_PIPELINE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse"></span>
          <span className="text-[10px] font-mono text-[#8A8A8F] uppercase">
            STATUS: <strong className="text-white">{project.status}</strong>
          </span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-6 md:py-12 space-y-8 flex flex-col justify-center">
        
        {/* Top visual description */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-[#8B5CF6]/5 border border-[#8B5CF6]/15 rounded-full mb-2 animate-pulse">
            <RefreshCw className="w-5 h-5 text-[#8B5CF6] animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white uppercase">RECONSTRUCTION PIPELINE ACTIVE</h1>
          <p className="text-xs text-[#8A8A8F] max-w-md mx-auto">
            Repliq is combining your repository config trees with the screenshot layouts.
          </p>
        </div>

        {/* Timeline Progress Checklist */}
        <div className="bg-[#0B0B0D] border border-white/8 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="space-y-4">
            {TIMELINE_STEPS.map((step, idx) => {
              const state = getStepState(idx, project.status);
              return (
                <div key={idx} className="flex items-start gap-4 transition-all">
                  
                  {/* Step status circle icons */}
                  <div className="pt-0.5 shrink-0">
                    {state === 'completed' ? (
                      <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    ) : state === 'active' ? (
                      <div className="w-4 h-4 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E1E0CC] animate-pulse"></span>
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-white/3 border border-white/10"></div>
                    )}
                  </div>

                  {/* Step texts */}
                  <div className="space-y-0.5">
                    <h4 className={`text-xs font-semibold tracking-wider uppercase ${
                      state === 'completed' ? 'text-white/60' : state === 'active' ? 'text-[#E1E0CC] font-bold' : 'text-[#8A8A8F]'
                    }`}>
                      {step.label}
                    </h4>
                    <p className={`text-[10px] ${state === 'active' ? 'text-[#8A8A8F]' : 'text-[#8A8A8F]/60'}`}>
                      {step.subText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Special Ready success card */}
          {project.status === 'READY' && (
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center justify-center gap-3 animate-bounce">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-mono font-bold text-white uppercase">RECONSTRUCTION COMPLETE. REDIRECTING TO WORKSPACE...</span>
            </div>
          )}
        </div>

        {/* Collapsible Activity Terminal logs */}
        <div className="border border-white/8 bg-[#101012] rounded-xl overflow-hidden">
          
          {/* Term Header */}
          <button 
            onClick={() => setTerminalExpanded(!terminalExpanded)}
            className="w-full h-10 px-4 bg-[#0B0B0D] border-b border-white/8 flex items-center justify-between select-none"
          >
            <div className="flex items-center gap-2">
              <TermIcon className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-[10px] font-mono font-semibold tracking-wider text-white">REPLIQ_PIPELINE_ACTIVITY_LOG</span>
            </div>
            {terminalExpanded ? <ChevronUp className="w-4 h-4 text-[#8A8A8F]" /> : <ChevronDown className="w-4 h-4 text-[#8A8A8F]" />}
          </button>

          {/* Term Content Terminal panel */}
          {terminalExpanded && (
            <div className="p-4 h-48 overflow-y-auto font-mono text-[9px] text-[#8A8A8F] space-y-1.5 bg-[#050505]">
              {project.logs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-white/30 shrink-0">{log.timestamp}</span>
                  <span className={`leading-normal ${
                    log.type === 'success' ? 'text-emerald-400 font-bold' : log.type === 'warn' ? 'text-amber-400' : log.type === 'error' ? 'text-rose-400' : 'text-[#8A8A8F]'
                  }`}>
                    {log.message}
                  </span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          )}
        </div>
      </main>

      <Footerdemo />
    </div>
  );
}
