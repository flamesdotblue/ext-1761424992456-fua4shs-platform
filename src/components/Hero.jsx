import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <header className="relative">
      <div className="absolute inset-0 overflow-hidden">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-40">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-200 text-xs mb-4">
          <Rocket className="w-4 h-4" />
          <span>Impossible Goals Tracker</span>
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_0_20px_rgba(56,189,248,0.20)]">
          Design your best self with goals, habits, and systems
        </h1>
        <p className="mt-4 text-slate-300 max-w-2xl">
          Set audacious targets, architect the routines that make them inevitable, and measure progress daily. Your identity shapes your actions—build both.
        </p>
      </div>
    </header>
  );
}
