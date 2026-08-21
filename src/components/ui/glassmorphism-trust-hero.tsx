'use client';

import React from "react";
import {
  ArrowRight,
  Play,
  Target,
  Crown,
  Star,
  Hexagon,
  Triangle,
  Command,
  Ghost,
  Gem,
  Cpu
} from "lucide-react";

const CLIENTS = [
  { name: "Acme Corp", icon: Hexagon },
  { name: "Quantum", icon: Triangle },
  { name: "Command+Z", icon: Command },
  { name: "Phantom", icon: Ghost },
  { name: "Ruby", icon: Gem },
  { name: "Chipset", icon: Cpu },
];

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
    <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">{label}</span>
  </div>
);

export default function HeroSection() {
  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-[#0a0a0a] font-sans text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-[#1c1c1c] via-[#111111] to-black" />
        <div
          className="absolute inset-0 bg-[url(https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=2000&q=80)] bg-cover bg-center opacity-30"
          style={{
            maskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
            WebkitMaskImage: "linear-gradient(180deg, transparent, black 0%, black 70%, transparent)",
          }}
        />
        <div className="absolute left-1/2 top-0 h-120 w-180 -translate-x-1/2 rounded-full bg-[#3a3a3a]/35 blur-[120px]" />
        <div className="absolute -left-16 top-1/3 h-72 w-72 rounded-full bg-[#2a2a2a]/40 blur-[100px]" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#404040]/20 blur-[110px]" />
      </div>

      <div className="relative z-10 flex min-h-dvh w-full items-center px-6 py-16 sm:px-8 md:py-20 lg:px-12">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-center space-y-8 lg:col-span-7">
            <div className="animate-fade-in delay-100">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md transition-colors hover:bg-white/10">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  Award-Winning Design
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                </span>
              </div>
            </div>

            <h1
              className="animate-fade-in delay-200 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.9]"
              style={{
                maskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)"
              }}
            >
              Crafting Digital<br />
              <span className="bg-linear-to-br from-white via-white to-[#ffcd75] bg-clip-text text-transparent">
                Experiences
              </span><br />
              That Matter
            </h1>

            <p className="animate-fade-in delay-300 max-w-xl text-lg text-zinc-400 leading-relaxed">
              We design interfaces that combine beauty with functionality,
              creating seamless experiences that users love and businesses thrive on.
            </p>

            <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-all hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98]">
                View Portfolio
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20">
                <Play className="w-4 h-4 fill-current" />
                Watch Showreel
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:mt-12">
            <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-white">150+</div>
                    <div className="text-sm text-zinc-400">Projects Delivered</div>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Client Satisfaction</span>
                    <span className="text-white font-medium">98%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/50">
                    <div className="h-full w-[98%] rounded-full bg-linear-to-r from-white to-zinc-400" />
                  </div>
                </div>

                <div className="h-px w-full bg-white/10 mb-6" />

                <div className="flex items-stretch justify-between gap-2 text-center">
                  <StatItem value="5+" label="Years" />
                  <div className="w-px bg-white/10" />
                  <StatItem value="24/7" label="Support" />
                  <div className="w-px bg-white/10" />
                  <StatItem value="100%" label="Quality" />
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    ACTIVE
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                    <Crown className="w-3 h-3 text-yellow-500" />
                    PREMIUM
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 py-8 backdrop-blur-xl">
              <h3 className="mb-6 px-8 text-sm font-medium text-zinc-400">Trusted by Industry Leaders</h3>

              <div
                className="relative flex overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)"
                }}
              >
                <div className="animate-marquee flex gap-12 whitespace-nowrap px-4">
                  {[...CLIENTS, ...CLIENTS].map((client, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 opacity-50 transition-all hover:opacity-100 hover:scale-105 cursor-default grayscale hover:grayscale-0"
                    >
                      <client.icon className="h-6 w-6 text-white fill-current" />
                      <span className="text-lg font-bold text-white tracking-tight">
                        {client.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
