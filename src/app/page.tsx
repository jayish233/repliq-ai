'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Shield, Activity, Sparkles, Terminal, 
  Layers, Code2, Play, ChevronRight, Eye, Monitor, FileCode,
  FolderCode, Image as ImageIcon, Cpu, CheckCircle2 
} from 'lucide-react';
import { PrismaHero } from "@/components/ui/prisma-hero";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
import { RepliqLogo } from "@/components/repliq-logo";


export default function LandingPage() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


  // Before/After Drag Slider Control
  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] overflow-x-hidden font-sans dot-grid">
      {/* Centered Floating Capsule Navigation */}
      <header className={`fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-700 ease-[0.16,1,0.3,1] ${
        isScrolled ? 'top-3 scale-95' : 'top-0'
      }`}>
        <div className={`flex items-center gap-3 bg-black px-4 py-2.5 sm:gap-6 md:gap-12 md:px-10 lg:gap-14 border-x border-b border-white/5 transition-all duration-500 ease-[0.16,1,0.3,1] ${
          isScrolled ? 'rounded-2xl md:rounded-3xl shadow-2xl shadow-black/80 border-t border-white/10' : 'rounded-b-2xl md:rounded-b-3xl'
        }`}>
          <Link href="/" className="shrink-0" aria-label="Repliq home">
            <RepliqLogo size={28} priority className="h-7 w-7" />
          </Link>
          <a
            href="#how-it-works"
            className="text-[10px] transition-colors sm:text-xs md:text-sm font-sans"
            style={{ color: "rgba(225, 224, 204, 0.8)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")}
          >
            Our story
          </a>
          <a
            href="#engine"
            className="text-[10px] transition-colors sm:text-xs md:text-sm font-sans"
            style={{ color: "rgba(225, 224, 204, 0.8)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")}
          >
            Collective
          </a>
          <a
            href="#comparison"
            className="text-[10px] transition-colors sm:text-xs md:text-sm font-sans"
            style={{ color: "rgba(225, 224, 204, 0.8)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")}
          >
            Workshops
          </a>
          <Link
            href="/dashboard"
            className="text-[10px] transition-colors sm:text-xs md:text-sm font-sans"
            style={{ color: "rgba(225, 224, 204, 0.8)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")}
          >
            Programs
          </Link>
          <Link
            href="/reconstruct/new"
            className="text-[10px] transition-colors sm:text-xs md:text-sm font-sans"
            style={{ color: "rgba(225, 224, 204, 0.8)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")}
          >
            Inquiries
          </Link>
        </div>
      </header>

      {/* Parallax Hero */}
      <ParallaxComponent />

      {/* Hero Section */}
      <PrismaHero />

      {/* 01: Methodology Section */}
      <section id="how-it-works" className="py-32 bg-[#070708] border-t border-[rgba(240,238,230,0.1)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[#8C8983] uppercase">
                [ 01 / METHODOLOGY ]
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#E8E5DC] uppercase font-sans">
                Rebuilding In <br/>Three Stages
              </h2>
            </div>
            <p className="text-sm text-[#8C8983] max-w-sm leading-relaxed font-sans">
              A cinematic translation of static design details compiled dynamically into semantic React architectures.
            </p>
          </div>

          {/* Unified 3-column editorial matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-[rgba(240,238,230,0.1)] divide-y md:divide-y-0 md:divide-x divide-[rgba(240,238,230,0.1)]">
            
            {/* Stage 1 */}
            <div className="py-12 md:py-16 px-6 md:px-8 hover:bg-white/[0.015] transition-all duration-300 group">
              <span className="text-6xl md:text-7xl font-light text-[#E8E5DC]/25 font-sans block mb-8 tracking-tighter">
                01
              </span>
              <h4 className="text-lg font-bold tracking-tight text-[#E8E5DC] uppercase font-sans mb-3">
                Capture Intent
              </h4>
              <p className="text-xs text-[#8C8983] leading-relaxed font-sans mb-6">
                Ingest targets through vision models. Extract layout density, border coordinates, typography weights, and palette ratios.
              </p>
              <div className="font-mono text-[9px] text-[#8C8983]/60 uppercase tracking-wider">
                INPUT: IMAGES // BOUNDING_BOXES
              </div>
            </div>

            {/* Stage 2 */}
            <div className="py-12 md:py-16 px-6 md:px-8 hover:bg-white/[0.015] transition-all duration-300 group">
              <span className="text-6xl md:text-7xl font-light text-[#E8E5DC]/25 font-sans block mb-8 tracking-tighter">
                02
              </span>
              <h4 className="text-lg font-bold tracking-tight text-[#E8E5DC] uppercase font-sans mb-3">
                Map Taxonomy
              </h4>
              <p className="text-xs text-[#8C8983] leading-relaxed font-sans mb-6">
                Parse existing source components. Match target visual boxes with native styles, keeping imports and modular folders in place.
              </p>
              <div className="font-mono text-[9px] text-[#8C8983]/60 uppercase tracking-wider">
                COMPARE: REPO_TREE // CLASSNAMES
              </div>
            </div>

            {/* Stage 3 */}
            <div className="py-12 md:py-16 px-6 md:px-8 hover:bg-white/[0.015] transition-all duration-300 group">
              <span className="text-6xl md:text-7xl font-light text-[#E8E5DC]/25 font-sans block mb-8 tracking-tighter">
                03
              </span>
              <h4 className="text-lg font-bold tracking-tight text-[#E8E5DC] uppercase font-sans mb-3">
                Compile Replica
              </h4>
              <p className="text-xs text-[#8C8983] leading-relaxed font-sans mb-6">
                Generate clean, functional TSX code. Compile layouts inside the browser preview sandbox, running automated syntax checks.
              </p>
              <div className="font-mono text-[9px] text-[#8C8983]/60 uppercase tracking-wider">
                OUTPUT: REACT_TS // TAILWIND_V4
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 02: Pipeline Section */}
      <section id="engine" className="py-32 bg-[#0D0D10] border-b border-[rgba(240,238,230,0.1)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="mb-20 text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#8C8983] uppercase">
              ( 02 ) — WORKBENCH
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#E8E5DC] uppercase font-sans">
              Pipeline Architecture
            </h2>
            <p className="text-xs text-[#8C8983] max-w-md mx-auto leading-relaxed">
              Horizontal view of visual compilation processing repository assets through neural code mapping.
            </p>
          </div>

          {/* Cinematic Workbench Frame */}
          <div className="p-8 bg-[#070708] border border-[rgba(240,238,230,0.1)] rounded-2xl max-w-5xl mx-auto relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 relative z-10">
              
              {/* Left: Source Code Input */}
              <motion.div 
                initial={{ y: 15, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-64 p-5 bg-[#0D0D10] border border-[rgba(240,238,230,0.08)] rounded-xl space-y-3 relative overflow-hidden"
              >
                {/* Noise overlay */}
                <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay" />
                <div className="flex justify-between items-center text-[9px] font-mono text-[#8C8983]">
                  <span>REF: INPUT_TREE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8E5DC]/40 animate-pulse"></span>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <FileCode className="w-4 h-4 text-[#E8E5DC]/60" />
                    <span className="text-xs font-medium text-[#E8E5DC]">Source Files</span>
                  </div>
                  <div className="font-mono text-[9px] text-[#8C8983]/60 leading-normal space-y-1">
                    <p className="text-emerald-400/80">import &#123; Card &#125; from '@/components';</p>
                    <p>export default function Dashboard() &#123;</p>
                    <p className="pl-2">return &lt;div className="grid"&gt;...&lt;/div&gt;</p>
                    <p>&#125;</p>
                  </div>
                </div>
              </motion.div>

              {/* Connecting SVG Conduit 1 */}
              <div className="hidden lg:block flex-1 max-w-[60px] h-[2px]">
                <svg className="w-full h-full" viewBox="0 0 60 2">
                  <line x1="0" y1="1" x2="60" y2="1" stroke="rgba(240, 238, 230, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Center: Neural Transformer Node */}
              <motion.div 
                initial={{ y: 15, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-72 p-6 bg-[#0D0D10] border border-[#E8E5DC]/25 rounded-xl space-y-4 relative overflow-hidden group"
              >
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#E8E5DC]/50"></span>
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#E8E5DC]/50"></span>
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#E8E5DC]/50"></span>
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#E8E5DC]/50"></span>
                
                <div className="flex justify-between items-center text-[9px] font-mono text-[#8C8983]">
                  <span>NEURAL_TRANSFORMER</span>
                  <span className="text-[#E8E5DC] font-semibold animate-pulse">SCANNING</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#E8E5DC]/5 border border-[#E8E5DC]/15 flex items-center justify-center text-[#E8E5DC]">
                    <Cpu className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#E8E5DC] font-sans uppercase">Repliq Core</h4>
                    <p className="text-[10px] text-[#8C8983] font-mono">X_Y: 284.11 / Z: 10.9</p>
                  </div>
                </div>

                {/* Laser scanline overlay */}
                <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#E8E5DC]/30 to-transparent top-1/2 animate-pulse"></div>
              </motion.div>

              {/* Connecting SVG Conduit 2 */}
              <div className="hidden lg:block flex-1 max-w-[60px] h-[2px]">
                <svg className="w-full h-full" viewBox="0 0 60 2">
                  <line x1="0" y1="1" x2="60" y2="1" stroke="rgba(240, 238, 230, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Right: Compiled Output */}
              <motion.div 
                initial={{ y: 15, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-64 p-5 bg-[#0D0D10] border border-[rgba(240,238,230,0.08)] rounded-xl space-y-3 relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-[9px] font-mono text-[#8C8983]">
                  <span>OUT: RECONSTRUCTED</span>
                  <span className="text-[#E8E5DC] font-bold">100% OK</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#E8E5DC] font-sans uppercase">Compiled UI</h4>
                    <p className="text-[10px] text-[#8C8983] font-mono">Next.js preview ready</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>

      {/* 03: Comparator Section */}
      <section id="comparison" className="py-32 bg-[#070708] border-b border-[rgba(240,238,230,0.1)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="mb-20 text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#8C8983] uppercase">
              ( 03 ) — MONITOR
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#E8E5DC] uppercase font-sans">
              Precision Visual Slider
            </h2>
            <p className="text-xs text-[#8C8983] max-w-md mx-auto leading-relaxed">
              Slide the vertical divider to compare grayscale design blueprints against the compiled high-fidelity render.
            </p>
          </div>

          <div className="flex justify-center">
            {/* Studio Monitor Bezel Container */}
            <div 
              ref={sliderRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="w-full max-w-3xl aspect-[1.6/1] bg-[#0D0D10] border border-[rgba(240,238,230,0.1)] rounded-2xl overflow-hidden relative select-none cursor-ew-resize ring-1 ring-white/10 shadow-2xl"
            >
              {/* After: Reconstructed Side (Right background, color) */}
              <div className="absolute inset-0 bg-[#0D0D10] p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <RepliqLogo size={20} className="h-5 w-5" />
                      <span className="text-[11px] font-semibold tracking-wider text-[#E8E5DC] uppercase font-sans">Compiled Preview</span>
                    </div>
                    <span className="text-[9px] text-[#8C8983] font-mono uppercase tracking-wider">PREVIEW_RENDER_OK</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-[#070708] border border-[rgba(240,238,230,0.06)] rounded-xl space-y-2">
                      <span className="text-[9px] text-[#8C8983] block font-mono">CONVERSION</span>
                      <span className="text-xl font-bold text-[#E8E5DC] font-sans">18.4%</span>
                    </div>
                    <div className="p-4 bg-[#070708] border border-[rgba(240,238,230,0.06)] rounded-xl space-y-2">
                      <span className="text-[9px] text-[#8C8983] block font-mono">ACTIVE SESSIONS</span>
                      <span className="text-xl font-bold text-[#E8E5DC] font-sans">3,982</span>
                    </div>
                    <div className="p-4 bg-[#070708] border border-[rgba(240,238,230,0.06)] rounded-xl space-y-2">
                      <span className="text-[9px] text-[#8C8983] block font-mono">RETENTION RATE</span>
                      <span className="text-xl font-bold text-[#E8E5DC] font-sans">82.1%</span>
                    </div>
                  </div>

                  {/* Graph visual */}
                  <div className="mt-8 h-20 flex items-end gap-1.5 border-b border-white/5 pb-2">
                    {[20, 40, 35, 60, 75, 55, 90, 80, 95, 110].map((v, i) => (
                      <div key={i} className="flex-1 bg-[#E8E5DC]/25 rounded-t-sm" style={{ height: `${v}%` }}></div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center text-[9px] font-mono text-[#8C8983]">
                  <span>RESPONSIVE TSX STRUCTURE</span>
                  <span>COMPILER v2.0</span>
                </div>
              </div>

              {/* Before: Reference Screenshot (Left overlay, clipped, grayscale) */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden bg-[#18181b]"
                style={{ width: `${sliderPosition}%` }}
              >
                {/* Fixed width grid blueprint container */}
                <div className="absolute inset-y-0 left-0 w-[766px] p-8 bg-[#151516] flex flex-col justify-between select-none filter grayscale contrast-125">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center font-bold text-white text-[9px]">O</div>
                        <span className="text-[11px] font-semibold tracking-wider text-white/50 uppercase font-sans">Blueprint Reference</span>
                      </div>
                      <span className="text-[9px] text-white/40 font-mono uppercase tracking-wider">STATIC_SOURCE_GRID</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-white/5 border border-dashed border-white/10 rounded-xl space-y-2">
                        <span className="text-[9px] text-white/40 block font-mono">CONVERSION INDEX</span>
                        <span className="text-xl font-bold text-white/60 font-sans">18.4%</span>
                      </div>
                      <div className="p-4 bg-white/5 border border-dashed border-white/10 rounded-xl space-y-2">
                        <span className="text-[9px] text-white/40 block font-mono">TOTAL SESSIONS</span>
                        <span className="text-xl font-bold text-white/60 font-sans">3,982</span>
                      </div>
                      <div className="p-4 bg-white/5 border border-dashed border-white/10 rounded-xl space-y-2">
                        <span className="text-[9px] text-white/40 block font-mono">RETENTION INDEX</span>
                        <span className="text-xl font-bold text-white/60 font-sans">82.1%</span>
                      </div>
                    </div>

                    {/* Wireframe graph */}
                    <div className="mt-8 h-20 border border-dashed border-white/15 rounded-lg flex items-center justify-center text-white/40 text-[10px] font-mono">
                      [REFERENCE CHART VECTOR PLOT]
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-white/40">
                    <span>STATIC DESIGN PIXELS</span>
                    <span>COORDINATES MAP</span>
                  </div>
                </div>
              </div>

              {/* Slider Drag Handler Bar (Minimalist rule line with readout label) */}
              <div 
                className="absolute inset-y-0 w-[1px] bg-[#E8E5DC]/45 cursor-ew-resize flex items-center justify-center z-20"
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
              >
                <div className="absolute top-4 -translate-x-1/2 px-2.5 py-1 bg-[#050505] border border-[rgba(240,238,230,0.15)] text-[#E8E5DC] text-[8px] font-mono uppercase tracking-wider rounded select-none shadow-md whitespace-nowrap">
                  {Math.round(sliderPosition)}% / {Math.round(100 - sliderPosition)}% SPLIT
                </div>
                <div className="w-5 h-5 border border-[#E8E5DC]/55 bg-[#050505] text-[#E8E5DC] flex items-center justify-center text-[8px] font-mono select-none rounded shadow-md">
                  ◀▶
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 04: Audience Section */}
      <section className="py-32 bg-[#070708] border-b border-[rgba(240,238,230,0.1)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="mb-24 text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#8C8983] uppercase">
              ( 04 ) — AUDIENCE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#E8E5DC] uppercase font-sans">
              Engineered For Teams
            </h2>
            <p className="text-xs text-[#8C8983] max-w-md mx-auto leading-relaxed">
              Designed as a professional engineering suite to eliminate visual regressions and accelerate production parity.
            </p>
          </div>

          {/* Unified 4-column horizontal tape */}
          <div className="grid grid-cols-1 md:grid-cols-4 border-t border-b border-[rgba(240,238,230,0.1)] divide-y md:divide-y-0 md:divide-x divide-[rgba(240,238,230,0.1)]">
            
            {/* Role 1 */}
            <div className="py-12 px-6 hover:bg-white/[0.015] transition-all duration-300 flex flex-col justify-between h-64 group">
              <div className="space-y-3">
                <span className="text-[9px] font-mono text-[#8C8983] tracking-wider block">/ DESIGN SYSTEMS</span>
                <h4 className="text-sm font-bold text-[#E8E5DC] uppercase font-sans">For Architects</h4>
                <p className="text-xs text-[#8C8983] leading-relaxed font-sans">
                  Deploy complete design layouts with high token parity directly matching references.
                </p>
              </div>
              <span className="text-[9px] font-mono text-[#8C8983]/30 uppercase tracking-widest">01 / ARCHITECTURE</span>
            </div>

            {/* Role 2 */}
            <div className="py-12 px-6 hover:bg-white/[0.015] transition-all duration-300 flex flex-col justify-between h-64 group">
              <div className="space-y-3">
                <span className="text-[9px] font-mono text-[#8C8983] tracking-wider block">/ PRODUCT CYCLE</span>
                <h4 className="text-sm font-bold text-[#E8E5DC] uppercase font-sans">For Product Teams</h4>
                <p className="text-xs text-[#8C8983] leading-relaxed font-sans">
                  Review visual iterations instantly, keeping product features aligned with original designs.
                </p>
              </div>
              <span className="text-[9px] font-mono text-[#8C8983]/30 uppercase tracking-widest">02 / INTERACTION</span>
            </div>

            {/* Role 3 */}
            <div className="py-12 px-6 hover:bg-white/[0.015] transition-all duration-300 flex flex-col justify-between h-64 group">
              <div className="space-y-3">
                <span className="text-[9px] font-mono text-[#8C8983] tracking-wider block">/ REFACTOR CODE</span>
                <h4 className="text-sm font-bold text-[#E8E5DC] uppercase font-sans">For Design Engineers</h4>
                <p className="text-xs text-[#8C8983] leading-relaxed font-sans">
                  Generate semantic TSX layout code and Tailwind components matching spec classes.
                </p>
              </div>
              <span className="text-[9px] font-mono text-[#8C8983]/30 uppercase tracking-widest">03 / PARITY</span>
            </div>

            {/* Role 4 */}
            <div className="py-12 px-6 hover:bg-white/[0.015] transition-all duration-300 flex flex-col justify-between h-64 group">
              <div className="space-y-3">
                <span className="text-[9px] font-mono text-[#8C8983] tracking-wider block">/ COMPILATION</span>
                <h4 className="text-sm font-bold text-[#E8E5DC] uppercase font-sans">For Creatives</h4>
                <p className="text-xs text-[#8C8983] leading-relaxed font-sans">
                  Reconstruct and preview experimental visuals in real-time browser sandbox.
                </p>
              </div>
              <span className="text-[9px] font-mono text-[#8C8983]/30 uppercase tracking-widest">04 / CREATIVE</span>
            </div>

          </div>
        </div>
      </section>

      {/* 05: Final CTA Section */}
      <section className="py-36 text-center bg-[#0D0D10] border-t border-[rgba(240,238,230,0.1)] relative overflow-hidden">
        {/* Soft, warm atmospheric radial glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E8E5DC] opacity-[0.02] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 space-y-8 z-10 relative">
          <span className="text-[10px] font-mono tracking-widest text-[#8C8983] uppercase">
            [ 05 / ENTRY ]
          </span>
          <h3 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#E8E5DC] leading-none font-sans uppercase">
            Your next interface <br/>starts with a reference.
          </h3>
          <p className="text-xs text-[#8C8983] max-w-sm mx-auto leading-relaxed font-sans">
            Verify the compiler. Try one of our design preset templates or link a custom repository.
          </p>
          <div className="pt-4 flex justify-center">
            <Link 
              href="/reconstruct/new" 
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#E8E5DC] hover:bg-[#F0EEE6] py-2 pl-6 pr-2 text-xs font-semibold text-black transition-all duration-300 hover:scale-105 font-sans"
            >
              Start Reconstructing
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-105">
                <ArrowRight className="h-3 w-3" style={{ color: "#E8E5DC" }} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/8 bg-[#050505] px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-[#8A8A8F] font-mono gap-4">
        <span>© 2026 REPLIQ AI. ALL RIGHTS RESERVED. HACKATHON MVP BUILD.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">/GITHUB</a>
          <a href="#" className="hover:text-white transition-colors">/DOCUMENTATION</a>
          <a href="#" className="hover:text-white transition-colors">/API</a>
        </div>
      </footer>
    </div>
  );
}
