'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Upload, X, ArrowRight, Loader2, 
  CheckCircle2, Plus, MoveLeft, MoveRight, Layers, FileCode2 
} from 'lucide-react';
import { createProject, PRESETS, getCredits } from '@/lib/ai/pipeline';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ScreenshotFile {
  id: string;
  name: string;
  url: string; // Base64 or object URL
  size: string;
  dimensions: string;
}

export default function NewReconstructionPage() {
  const router = useRouter();
  
  // States
  const [repoUrl, setRepoUrl] = useState('');
  const [branch, setBranch] = useState('main');
  const [isValidatingRepo, setIsValidatingRepo] = useState(false);
  const [repoValidationSummary, setRepoValidationSummary] = useState<{
    success: boolean;
    framework: string;
    lang: string;
    files: number;
    components: number;
  } | null>(null);

  const [screenshots, setScreenshots] = useState<ScreenshotFile[]>([]);
  const [credits, setCredits] = useState(100);

  useEffect(() => {
    setCredits(getCredits());
  }, []);

  // Preset repo click handler
  const handleApplyPreset = (key: 'saas' | 'portfolio') => {
    const preset = PRESETS[key];
    setRepoUrl(preset.repositoryUrl);
    setBranch(preset.branch);
    
    // Simulate screenshot uploads
    const presetScreenshots = preset.screenshots.map((s, idx) => ({
      id: `preset-${key}-${idx}`,
      name: s.name,
      url: s.url,
      size: s.size,
      dimensions: s.dimensions
    }));
    setScreenshots(presetScreenshots);

    // Run simulated validation
    validateRepo(preset.repositoryUrl);
  };

  // Simulate repository structure validation
  const validateRepo = (urlStr: string) => {
    if (!urlStr || !urlStr.startsWith('http')) return;
    setIsValidatingRepo(true);
    setRepoValidationSummary(null);

    setTimeout(() => {
      setIsValidatingRepo(false);
      const isPortfolio = urlStr.includes('portfolio') || urlStr.includes('hugo');
      setRepoValidationSummary({
        success: true,
        framework: 'Next.js (App Router)',
        lang: isPortfolio ? 'TypeScript' : 'TypeScript & PostCSS',
        files: isPortfolio ? 84 : 127,
        components: isPortfolio ? 12 : 18
      });
    }, 1500);
  };

  // Drag and drop controls
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImg: ScreenshotFile = {
          id: `${Date.now()}-${index}`,
          name: file.name,
          url: event.target?.result as string,
          size: `${Math.round(file.size / 1024)} KB`,
          dimensions: '1440 × 900' // Default simulation
        };
        setScreenshots(prev => [...prev, newImg].slice(0, 5)); // Cap at 5
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove Screenshot
  const handleRemoveScreenshot = (id: string) => {
    setScreenshots(prev => prev.filter(s => s.id !== id));
  };

  // Reorder controls
  const handleMoveScreenshot = (idx: number, direction: 'left' | 'right') => {
    const nextIdx = direction === 'left' ? idx - 1 : idx + 1;
    if (nextIdx < 0 || nextIdx >= screenshots.length) return;

    const list = [...screenshots];
    const temp = list[idx];
    list[idx] = list[nextIdx];
    list[nextIdx] = temp;
    setScreenshots(list);
  };

  // Submit Reconstruction
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) return;

    // Detect if matching presets
    let presetKey: string | undefined;
    if (repoUrl.includes('apex-analytics')) presetKey = 'saas';
    else if (repoUrl.includes('portfolio') || repoUrl.includes('hugo-dev')) presetKey = 'portfolio';

    const p = createProject(
      presetKey === 'saas' ? 'Apex SaaS Analytics' : presetKey === 'portfolio' ? 'Hugo Developer Portfolio' : 'Custom Reconstruction',
      repoUrl,
      branch,
      screenshots.map(s => ({ id: s.id, url: s.url, name: s.name, size: s.size, dimensions: s.dimensions })),
      presetKey
    );

    // Route to PIPELINE visualizer
    router.push(`/reconstruct/${p.id}/analyzing`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans flex flex-col justify-between">
      {/* Header */}
      <header className="h-16 border-b border-white/8 bg-[#0B0B0D] px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1 text-[#8A8A8F] hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-xs font-semibold tracking-wider font-mono text-[#8A8A8F]">/NEW_RECONSTRUCTION</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-[#8A8A8F]">
            Wallet: <strong className="text-white">{credits} Credits</strong>
          </span>
        </div>
      </header>

      {/* Content Form Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:py-12 space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase">RECONSTRUCT AN INTERFACE</h1>
          <p className="text-xs text-[#8A8A8F]">
            Provide a GitHub repository, upload screenshots, and config your reconstruction.
          </p>
        </div>

        {/* 1-Click Starter presets */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold font-mono tracking-widest text-[#8B5CF6] uppercase">01_STARTER PRESETS (1-CLICK RUNS)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => handleApplyPreset('saas')}
              className="p-5 text-left bg-[#101012] border border-white/8 hover:border-[#8B5CF6]/40 hover:bg-[#8B5CF6]/5 transition-all rounded-xl space-y-2 group"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-white group-hover:text-[#8B5CF6]">SaaS Analytics Dashboard</span>
                <span className="text-[10px] text-[#8B5CF6] font-mono uppercase bg-[#8B5CF6]/10 px-1.5 py-0.5 rounded">Select Demo</span>
              </div>
              <p className="text-[11px] text-[#8A8A8F] leading-relaxed">
                Full-featured obsidian theme dashboard with live metrics, sidebar navigations, responsive layouts, and charts.
              </p>
              <div className="text-[9px] font-mono text-[#8A8A8F] flex gap-3 pt-1">
                <span>Next.js</span>
                <span>·</span>
                <span>Tailwind v4</span>
                <span>·</span>
                <span>2 Screenshots loaded</span>
              </div>
            </button>

            <button 
              onClick={() => handleApplyPreset('portfolio')}
              className="p-5 text-left bg-[#101012] border border-white/8 hover:border-[#8B5CF6]/40 hover:bg-[#8B5CF6]/5 transition-all rounded-xl space-y-2 group"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-white group-hover:text-[#8B5CF6]">Modern Developer Portfolio</span>
                <span className="text-[10px] text-[#8B5CF6] font-mono uppercase bg-[#8B5CF6]/10 px-1.5 py-0.5 rounded">Select Demo</span>
              </div>
              <p className="text-[11px] text-[#8A8A8F] leading-relaxed">
                Centered grid layout containing micro-chips, rust/wasm project descriptions, and interactive contact buttons.
              </p>
              <div className="text-[9px] font-mono text-[#8A8A8F] flex gap-3 pt-1">
                <span>React</span>
                <span>·</span>
                <span>Tailwind CSS</span>
                <span>·</span>
                <span>1 Screenshot loaded</span>
              </div>
            </button>
          </div>
        </section>

        {/* Main Config Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-[#0B0B0D] border border-white/8 rounded-2xl p-6 md:p-8">
          
          {/* GitHub Input */}
          <div className="space-y-3">
            <label className="text-xs font-bold font-mono tracking-wider text-[#8A8A8F] uppercase block">
              02_CONNECT GITHUB REPOSITORY
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <GithubIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A8F]" />
                <input 
                  type="url" 
                  value={repoUrl}
                  onChange={(e) => {
                    setRepoUrl(e.target.value);
                    if (e.target.value.endsWith('.git') || e.target.value.length > 20) {
                      validateRepo(e.target.value);
                    }
                  }}
                  onBlur={() => validateRepo(repoUrl)}
                  placeholder="https://github.com/username/project-repository"
                  className="w-full bg-[#101012] border border-white/8 rounded-lg pl-9 pr-3 py-2 text-xs text-[#F5F5F5] placeholder-[#8A8A8F] focus:outline-none focus:border-[#8B5CF6] transition-all"
                  required
                />
              </div>
              
              <div className="w-full sm:w-36">
                <input 
                  type="text" 
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  placeholder="branch (main)"
                  className="w-full bg-[#101012] border border-white/8 rounded-lg px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#8B5CF6] transition-all"
                />
              </div>
            </div>

            {/* Validation indicators */}
            {isValidatingRepo && (
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#8B5CF6]">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Reading Git trees and configurations...</span>
              </div>
            )}

            {repoValidationSummary && repoValidationSummary.success && (
              <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg flex items-start gap-2.5 text-[11px]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div className="space-y-1 font-mono text-[#8A8A8F]">
                  <p className="text-white font-medium">REPOSITORY VALIDATED SUCCESSFULLY</p>
                  <p>Framework: {repoValidationSummary.framework} · Language: {repoValidationSummary.lang}</p>
                  <p>Structure: {repoValidationSummary.files} files, {repoValidationSummary.components} components detected</p>
                </div>
              </div>
            )}
          </div>

          {/* Screenshot Dropzone */}
          <div className="space-y-3">
            <label className="text-xs font-bold font-mono tracking-wider text-[#8A8A8F] uppercase block">
              03_UPLOAD TARGET SCREENSHOTS ({screenshots.length} / 5)
            </label>

            {/* Drag & Drop Visual Zone */}
            <div className="border border-dashed border-white/10 hover:border-[#8B5CF6]/30 bg-[#101012] hover:bg-[#8B5CF6]/3 rounded-xl p-8 text-center relative transition-all cursor-pointer">
              <input 
                type="file" 
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-[#8A8A8F] mx-auto mb-3" />
              <p className="text-xs font-semibold text-white uppercase mb-1">Drag screenshots here</p>
              <p className="text-[10px] text-[#8A8A8F] font-mono">Supports PNG, JPG, WEBP (Max 5 images)</p>
            </div>

            {/* Screenshots Preview Cards Grid */}
            {screenshots.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                {screenshots.map((s, idx) => (
                  <div key={s.id} className="bg-[#101012] border border-white/8 rounded-lg p-2.5 space-y-2 relative group">
                    
                    {/* Thumbnail preview */}
                    <div 
                      className="aspect-square w-full rounded bg-cover bg-center border border-white/5" 
                      style={{ backgroundImage: `url(${s.url})` }}
                    />
                    
                    {/* Text metadata */}
                    <div className="text-[9px] font-mono leading-tight space-y-0.5">
                      <p className="text-white truncate" title={s.name}>{s.name}</p>
                      <p className="text-[#8A8A8F]">{s.dimensions}</p>
                      <p className="text-[#8A8A8F]/70">{s.size}</p>
                    </div>

                    {/* Order controls */}
                    <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {idx > 0 && (
                        <button 
                          type="button"
                          onClick={() => handleMoveScreenshot(idx, 'left')}
                          className="p-1 bg-black/80 hover:bg-black border border-white/10 rounded text-[#8A8A8F] hover:text-white"
                        >
                          <MoveLeft className="w-2.5 h-2.5" />
                        </button>
                      )}
                      {idx < screenshots.length - 1 && (
                        <button 
                          type="button"
                          onClick={() => handleMoveScreenshot(idx, 'right')}
                          className="p-1 bg-black/80 hover:bg-black border border-white/10 rounded text-[#8A8A8F] hover:text-white"
                        >
                          <MoveRight className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>

                    {/* Remove control */}
                    <button 
                      type="button"
                      onClick={() => handleRemoveScreenshot(s.id)}
                      className="absolute top-2 right-2 p-1 bg-black/80 hover:bg-rose-500 border border-white/10 hover:border-rose-500/20 rounded text-[#8A8A8F] hover:text-white transition-colors"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Credits indicator & start */}
          <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left font-mono text-[11px] text-[#8A8A8F] space-y-0.5">
              <p>Reconstruction Estimate: <strong className="text-white">{repoUrl.includes('apex') || repoUrl.includes('portfolio') ? '45' : '30'} Credits</strong></p>
              <p className="text-[10px]">Your balance will be deducted upon generation pipeline trigger.</p>
            </div>
            
            <button 
              type="submit"
              disabled={!repoUrl || screenshots.length === 0}
              className="w-full sm:w-auto px-6 py-3 bg-[#8B5CF6] hover:bg-[#7c3aed] disabled:bg-[#101012] disabled:text-[#8A8A8F] disabled:border-white/5 disabled:border font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[#8B5CF6]/20"
            >
              Start Reconstruction
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/8 bg-[#050505] text-center text-[10px] text-[#8A8A8F] font-mono">
        <span>REPLIQ ENGINE v1.0. PIPELINE VALIDATION INTERFACE.</span>
      </footer>
    </div>
  );
}
