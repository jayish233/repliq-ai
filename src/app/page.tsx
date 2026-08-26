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
import { AuthUserChip } from "@/components/auth-user-chip";
import { Footerdemo } from "@/components/ui/footer-section";


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
      <header className={`fixed inset-x-0 z-50 flex justify-center px-3 transition-all duration-700 ease-[0.16,1,0.3,1] ${
        isScrolled ? 'top-3' : 'top-0'
      }`}>
        <div className={`flex w-max max-w-full items-center gap-3 bg-black px-4 py-2.5 sm:gap-5 md:gap-8 md:px-8 lg:gap-10 lg:px-10 border-x border-b border-white/5 transition-all duration-500 ease-[0.16,1,0.3,1] ${
          isScrolled ? 'scale-95 rounded-2xl md:rounded-3xl shadow-2xl shadow-black/80 border-t border-white/10' : 'rounded-b-2xl md:rounded-b-3xl'
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
          <div className="ml-1 flex shrink-0 items-center border-l border-white/10 pl-3 pr-0.5 md:ml-2 md:pl-5">
            <AuthUserChip variant="landing" />
          </div>
        </div>
      </header>

      {/* Parallax Hero */}
      <ParallaxComponent />

      {/* Hero Section */}
      <PrismaHero />

      {/* 01: Methodology Section */}
      <section id="how-it-works" className="py-36 md:py-48 bg-[#070708] border-t border-[rgba(240,238,230,0.12)]">
        <div className="w-full px-6 sm:px-12 lg:px-20 xl:px-28 2xl:px-36">
          
          <div className="mb-28 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="space-y-5 max-w-4xl">
              <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#8C8983] uppercase">
                [ 01 / METHODOLOGY ]
              </span>
              <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-[#E8E5DC] uppercase leading-[0.9]">
                Rebuilding In <br/>Three Stages
              </h2>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#8C8983] max-w-xl leading-relaxed">
              A cinematic translation of static design details compiled dynamically into semantic React architectures.
            </p>
          </div>

          {/* Full-width 3-column editorial matrix */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 border-t border-b border-[rgba(240,238,230,0.12)] divide-y lg:divide-y-0 lg:divide-x divide-[rgba(240,238,230,0.12)]">
            
            {/* Stage 1 */}
            <div className="py-16 lg:py-24 px-8 lg:px-14 hover:bg-white/[0.015] transition-all duration-300 group flex flex-col justify-between min-h-[460px]">
              <div>
                <span className="text-8xl sm:text-9xl lg:text-[10rem] font-light text-[#E8E5DC]/15 block mb-10 tracking-tighter">
                  01
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#E8E5DC] uppercase mb-5">
                  Capture Intent
                </h3>
                <p className="text-base sm:text-lg text-[#8C8983] leading-relaxed mb-10">
                  Ingest targets through vision models. Extract layout density, border coordinates, typography weights, and palette ratios.
                </p>
              </div>
              <div className="font-mono text-xs sm:text-sm text-[#8C8983]/70 uppercase tracking-widest pt-4">
                INPUT: IMAGES // BOUNDING_BOXES
              </div>
            </div>

            {/* Stage 2 */}
            <div className="py-16 lg:py-24 px-8 lg:px-14 hover:bg-white/[0.015] transition-all duration-300 group flex flex-col justify-between min-h-[460px]">
              <div>
                <span className="text-8xl sm:text-9xl lg:text-[10rem] font-light text-[#E8E5DC]/15 block mb-10 tracking-tighter">
                  02
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#E8E5DC] uppercase mb-5">
                  Map Taxonomy
                </h3>
                <p className="text-base sm:text-lg text-[#8C8983] leading-relaxed mb-10">
                  Parse existing source components. Match target visual boxes with native styles, keeping imports and modular folders in place.
                </p>
              </div>
              <div className="font-mono text-xs sm:text-sm text-[#8C8983]/70 uppercase tracking-widest pt-4">
                COMPARE: REPO_TREE // CLASSNAMES
              </div>
            </div>

            {/* Stage 3 */}
            <div className="py-16 lg:py-24 px-8 lg:px-14 hover:bg-white/[0.015] transition-all duration-300 group flex flex-col justify-between min-h-[460px]">
              <div>
                <span className="text-8xl sm:text-9xl lg:text-[10rem] font-light text-[#E8E5DC]/15 block mb-10 tracking-tighter">
                  03
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#E8E5DC] uppercase mb-5">
                  Compile Replica
                </h3>
                <p className="text-base sm:text-lg text-[#8C8983] leading-relaxed mb-10">
                  Generate clean, functional TSX code. Compile layouts inside the browser preview sandbox, running automated syntax checks.
                </p>
              </div>
              <div className="font-mono text-xs sm:text-sm text-[#8C8983]/70 uppercase tracking-widest pt-4">
                OUTPUT: REACT_TS // TAILWIND_V4
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 02: Pipeline Section */}
      <section id="engine" className="py-36 md:py-48 bg-[#0D0D10] border-b border-[rgba(240,238,230,0.12)]">
        <div className="w-full px-6 sm:px-12 lg:px-20 xl:px-28 2xl:px-36">
          
          <div className="mb-24 text-center max-w-4xl mx-auto space-y-6">
            <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#8C8983] uppercase">
              ( 02 ) — WORKBENCH
            </span>
            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-[#E8E5DC] uppercase leading-[0.9]">
              Pipeline Architecture
            </h2>
            <p className="text-lg sm:text-2xl text-[#8C8983] max-w-2xl mx-auto leading-relaxed">
              Horizontal view of visual compilation processing repository assets through neural code mapping.
            </p>
          </div>

          {/* Cinematic Workbench Frame - Full Size */}
          <div className="w-full p-8 sm:p-12 lg:p-16 bg-[#070708] border border-[rgba(240,238,230,0.12)] rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8 lg:gap-6 relative z-10">
              
              {/* Left: Source Code Input */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 p-8 bg-[#0D0D10] border border-[rgba(240,238,230,0.1)] rounded-2xl space-y-5 relative overflow-hidden"
              >
                {/* Noise overlay */}
                <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay" />
                <div className="flex justify-between items-center text-xs sm:text-sm font-mono text-[#8C8983]">
                  <span>REF: INPUT_TREE</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8E5DC]/50 animate-pulse"></span>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3 items-center">
                    <FileCode className="w-6 h-6 text-[#E8E5DC]/80" />
                    <span className="text-base sm:text-lg font-semibold text-[#E8E5DC]">Source Files</span>
                  </div>
                  <div className="font-mono text-xs sm:text-sm text-[#8C8983]/80 leading-relaxed space-y-1.5 bg-black/60 p-4 rounded-xl border border-white/5">
                    <p className="text-emerald-400">import &#123; Card &#125; from '@/components';</p>
                    <p>export default function Dashboard() &#123;</p>
                    <p className="pl-3">return &lt;div className="grid"&gt;...&lt;/div&gt;</p>
                    <p>&#125;</p>
                  </div>
                </div>
              </motion.div>

              {/* Connecting SVG Conduit 1 */}
              <div className="hidden lg:block w-16 h-[2px]">
                <svg className="w-full h-full" viewBox="0 0 64 2">
                  <line x1="0" y1="1" x2="64" y2="1" stroke="rgba(240, 238, 230, 0.3)" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Center: Neural Transformer Node */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 p-8 bg-[#0D0D10] border border-[#E8E5DC]/35 rounded-2xl space-y-5 relative overflow-hidden group shadow-2xl"
              >
                <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E8E5DC]/70"></span>
                <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#E8E5DC]/70"></span>
                <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#E8E5DC]/70"></span>
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E8E5DC]/70"></span>
                
                <div className="flex justify-between items-center text-xs sm:text-sm font-mono text-[#8C8983]">
                  <span>NEURAL_TRANSFORMER</span>
                  <span className="text-[#E8E5DC] font-semibold animate-pulse">SCANNING</span>
                </div>
                
                <div className="flex items-center gap-4 py-2">
                  <div className="w-14 h-14 rounded-2xl bg-[#E8E5DC]/10 border border-[#E8E5DC]/30 flex items-center justify-center text-[#E8E5DC] shrink-0">
                    <Cpu className="w-7 h-7 animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-[#E8E5DC] uppercase">Repliq Core</h4>
                    <p className="text-xs sm:text-sm text-[#8C8983] font-mono mt-0.5">X_Y: 284.11 / Z: 10.9</p>
                  </div>
                </div>

                {/* Laser scanline overlay */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8E5DC]/50 to-transparent top-1/2 animate-pulse"></div>
              </motion.div>

              {/* Connecting SVG Conduit 2 */}
              <div className="hidden lg:block w-16 h-[2px]">
                <svg className="w-full h-full" viewBox="0 0 64 2">
                  <line x1="0" y1="1" x2="64" y2="1" stroke="rgba(240, 238, 230, 0.3)" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>

              {/* Right: Compiled Output */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 p-8 bg-[#0D0D10] border border-[rgba(240,238,230,0.1)] rounded-2xl space-y-5 relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-xs sm:text-sm font-mono text-[#8C8983]">
                  <span>OUT: RECONSTRUCTED</span>
                  <span className="text-[#E8E5DC] font-bold">100% OK</span>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-[#E8E5DC] uppercase">Compiled UI</h4>
                    <p className="text-xs sm:text-sm text-[#8C8983] font-mono mt-0.5">Next.js preview ready</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>

      {/* 03: Comparator Section */}
      <section id="comparison" className="py-36 md:py-48 bg-[#070708] border-b border-[rgba(240,238,230,0.12)]">
        <div className="w-full px-6 sm:px-12 lg:px-20 xl:px-28 2xl:px-36">
          
          <div className="mb-24 text-center max-w-4xl mx-auto space-y-6">
            <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#8C8983] uppercase">
              ( 03 ) — MONITOR
            </span>
            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-[#E8E5DC] uppercase leading-[0.9]">
              Precision Visual Slider
            </h2>
            <p className="text-lg sm:text-2xl text-[#8C8983] max-w-2xl mx-auto leading-relaxed">
              Slide the vertical divider to compare grayscale design blueprints against the compiled high-fidelity render.
            </p>
          </div>

          <div className="w-full flex justify-center">
            {/* Studio Monitor Bezel Container - Full Size */}
            <div 
              ref={sliderRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="w-full max-w-[1600px] aspect-[16/9] md:aspect-[2.1/1] min-h-[520px] md:min-h-[640px] bg-[#0D0D10] border border-[rgba(240,238,230,0.15)] rounded-3xl overflow-hidden relative select-none cursor-ew-resize ring-1 ring-white/10 shadow-2xl"
            >
              {/* After: Reconstructed Side (Right background, color) */}
              <div className="absolute inset-0 bg-[#0D0D10] p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-3">
                      <RepliqLogo size={28} className="h-7 w-7" />
                      <span className="text-base sm:text-lg font-semibold tracking-wider text-[#E8E5DC] uppercase">Compiled Preview</span>
                    </div>
                    <span className="text-xs sm:text-sm text-[#8C8983] font-mono uppercase tracking-wider">PREVIEW_RENDER_OK</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="p-6 bg-[#070708] border border-[rgba(240,238,230,0.08)] rounded-2xl space-y-3">
                      <span className="text-xs sm:text-sm text-[#8C8983] block font-mono">CONVERSION</span>
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8E5DC]">18.4%</span>
                    </div>
                    <div className="p-6 bg-[#070708] border border-[rgba(240,238,230,0.08)] rounded-2xl space-y-3">
                      <span className="text-xs sm:text-sm text-[#8C8983] block font-mono">ACTIVE SESSIONS</span>
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8E5DC]">3,982</span>
                    </div>
                    <div className="p-6 bg-[#070708] border border-[rgba(240,238,230,0.08)] rounded-2xl space-y-3">
                      <span className="text-xs sm:text-sm text-[#8C8983] block font-mono">RETENTION RATE</span>
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E8E5DC]">82.1%</span>
                    </div>
                  </div>

                  {/* Graph visual */}
                  <div className="mt-10 h-32 flex items-end gap-3 border-b border-white/10 pb-3">
                    {[20, 40, 35, 60, 75, 55, 90, 80, 95, 110, 85, 100, 115, 95].map((v, i) => (
                      <div key={i} className="flex-1 bg-[#E8E5DC]/35 rounded-t-sm" style={{ height: `${v}%` }}></div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm font-mono text-[#8C8983] pt-6">
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
                <div className="absolute inset-y-0 left-0 w-[1600px] p-8 sm:p-12 lg:p-16 bg-[#151516] flex flex-col justify-between select-none filter grayscale contrast-125">
                  <div>
                    <div className="flex justify-between items-center mb-10">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center font-bold text-white text-xs">O</div>
                        <span className="text-base sm:text-lg font-semibold tracking-wider text-white/50 uppercase">Blueprint Reference</span>
                      </div>
                      <span className="text-xs sm:text-sm text-white/40 font-mono uppercase tracking-wider">STATIC_SOURCE_GRID</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="p-6 bg-white/5 border border-dashed border-white/10 rounded-2xl space-y-3">
                        <span className="text-xs sm:text-sm text-white/40 block font-mono">CONVERSION INDEX</span>
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white/60">18.4%</span>
                      </div>
                      <div className="p-6 bg-white/5 border border-dashed border-white/10 rounded-2xl space-y-3">
                        <span className="text-xs sm:text-sm text-white/40 block font-mono">TOTAL SESSIONS</span>
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white/60">3,982</span>
                      </div>
                      <div className="p-6 bg-white/5 border border-dashed border-white/10 rounded-2xl space-y-3">
                        <span className="text-xs sm:text-sm text-white/40 block font-mono">RETENTION INDEX</span>
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white/60">82.1%</span>
                      </div>
                    </div>

                    {/* Wireframe graph */}
                    <div className="mt-10 h-32 border border-dashed border-white/20 rounded-xl flex items-center justify-center text-white/40 text-xs sm:text-sm font-mono">
                      [REFERENCE CHART VECTOR PLOT]
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs sm:text-sm font-mono text-white/40 pt-6">
                    <span>STATIC DESIGN PIXELS</span>
                    <span>COORDINATES MAP</span>
                  </div>
                </div>
              </div>

              {/* Slider Drag Handler Bar */}
              <div 
                className="absolute inset-y-0 w-[2px] bg-[#E8E5DC]/60 cursor-ew-resize flex items-center justify-center z-20"
                style={{ left: `${sliderPosition}%` }}
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
              >
                <div className="absolute top-6 -translate-x-1/2 px-4 py-1.5 bg-[#050505] border border-[rgba(240,238,230,0.25)] text-[#E8E5DC] text-xs font-mono uppercase tracking-wider rounded-lg select-none shadow-2xl whitespace-nowrap">
                  {Math.round(sliderPosition)}% / {Math.round(100 - sliderPosition)}% SPLIT
                </div>
                <div className="w-8 h-8 border border-[#E8E5DC]/70 bg-[#050505] text-[#E8E5DC] flex items-center justify-center text-xs font-mono select-none rounded-lg shadow-2xl">
                  ◀▶
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 04: Audience Section */}
      <section className="py-36 md:py-48 bg-[#070708] border-b border-[rgba(240,238,230,0.12)]">
        <div className="w-full px-6 sm:px-12 lg:px-20 xl:px-28 2xl:px-36">
          
          <div className="mb-28 text-center max-w-4xl mx-auto space-y-6">
            <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#8C8983] uppercase">
              ( 04 ) — AUDIENCE
            </span>
            <h2 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-[#E8E5DC] uppercase leading-[0.9]">
              Engineered For Teams
            </h2>
            <p className="text-lg sm:text-2xl text-[#8C8983] max-w-2xl mx-auto leading-relaxed">
              Designed as a professional engineering suite to eliminate visual regressions and accelerate production parity.
            </p>
          </div>

          {/* Full-width 4-column horizontal tape */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b border-[rgba(240,238,230,0.12)] divide-y sm:divide-y-0 sm:divide-x divide-[rgba(240,238,230,0.12)]">
            
            {/* Role 1 */}
            <div className="py-16 lg:py-24 px-8 lg:px-12 hover:bg-white/[0.015] transition-all duration-300 flex flex-col justify-between min-h-[380px] group">
              <div className="space-y-5">
                <span className="text-xs sm:text-sm font-mono text-[#8C8983] tracking-widest block">/ DESIGN SYSTEMS</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#E8E5DC] uppercase">For Architects</h3>
                <p className="text-base sm:text-lg text-[#8C8983] leading-relaxed">
                  Deploy complete design layouts with high token parity directly matching references.
                </p>
              </div>
              <span className="text-xs sm:text-sm font-mono text-[#8C8983]/40 uppercase tracking-widest pt-8">01 / ARCHITECTURE</span>
            </div>

            {/* Role 2 */}
            <div className="py-16 lg:py-24 px-8 lg:px-12 hover:bg-white/[0.015] transition-all duration-300 flex flex-col justify-between min-h-[380px] group">
              <div className="space-y-5">
                <span className="text-xs sm:text-sm font-mono text-[#8C8983] tracking-widest block">/ PRODUCT CYCLE</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#E8E5DC] uppercase">For Product Teams</h3>
                <p className="text-base sm:text-lg text-[#8C8983] leading-relaxed">
                  Review visual iterations instantly, keeping product features aligned with original designs.
                </p>
              </div>
              <span className="text-xs sm:text-sm font-mono text-[#8C8983]/40 uppercase tracking-widest pt-8">02 / INTERACTION</span>
            </div>

            {/* Role 3 */}
            <div className="py-16 lg:py-24 px-8 lg:px-12 hover:bg-white/[0.015] transition-all duration-300 flex flex-col justify-between min-h-[380px] group">
              <div className="space-y-5">
                <span className="text-xs sm:text-sm font-mono text-[#8C8983] tracking-widest block">/ REFACTOR CODE</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#E8E5DC] uppercase">For Design Engineers</h3>
                <p className="text-base sm:text-lg text-[#8C8983] leading-relaxed">
                  Generate semantic TSX layout code and Tailwind components matching spec classes.
                </p>
              </div>
              <span className="text-xs sm:text-sm font-mono text-[#8C8983]/40 uppercase tracking-widest pt-8">03 / PARITY</span>
            </div>

            {/* Role 4 */}
            <div className="py-16 lg:py-24 px-8 lg:px-12 hover:bg-white/[0.015] transition-all duration-300 flex flex-col justify-between min-h-[380px] group">
              <div className="space-y-5">
                <span className="text-xs sm:text-sm font-mono text-[#8C8983] tracking-widest block">/ COMPILATION</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#E8E5DC] uppercase">For Creatives</h3>
                <p className="text-base sm:text-lg text-[#8C8983] leading-relaxed">
                  Reconstruct and preview experimental visuals in real-time browser sandbox.
                </p>
              </div>
              <span className="text-xs sm:text-sm font-mono text-[#8C8983]/40 uppercase tracking-widest pt-8">04 / CREATIVE</span>
            </div>

          </div>
        </div>
      </section>

      {/* 05: Final CTA Section */}
      <section className="py-44 md:py-60 text-center bg-[#0D0D10] border-t border-[rgba(240,238,230,0.12)] relative overflow-hidden">
        {/* Soft, warm atmospheric radial glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E8E5DC] opacity-[0.035] rounded-full blur-[180px] pointer-events-none" />
        
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 space-y-12 z-10 relative">
          <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#8C8983] uppercase">
            [ 05 / ENTRY ]
          </span>
          <h2 className="text-6xl sm:text-8xl lg:text-9xl xl:text-[10rem] font-bold tracking-tight text-[#E8E5DC] leading-[0.88] uppercase">
            Your next interface <br/>starts with a reference.
          </h2>
          <p className="text-lg sm:text-2xl text-[#8C8983] max-w-2xl mx-auto leading-relaxed">
            Verify the compiler. Try one of our design preset templates or link a custom repository.
          </p>
          <div className="pt-8 flex justify-center">
            <Link 
              href="/reconstruct/new" 
              className="group inline-flex items-center gap-4 rounded-full bg-[#E8E5DC] hover:bg-[#F0EEE6] py-5 pl-10 pr-4 text-base sm:text-lg font-semibold text-black transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Start Reconstructing
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-105">
                <ArrowRight className="h-5 w-5" style={{ color: "#E8E5DC" }} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footerdemo />
    </div>
  );
}
