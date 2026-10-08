import React from 'react';
import { Eye, Info } from 'lucide-react';
import { IMAGES } from '../data/mockData.ts';

interface HeatmapProps {
  isLoading?: boolean;
}

export const Heatmap: React.FC<HeatmapProps> = ({ isLoading = false }) => {
  if (isLoading) {
    return (
      <div 
        aria-busy="true"
        aria-label="Loading Heatmap Analysis"
        className="glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-full select-none"
      >
        <div>
          {/* Header Skeleton - Exact match to loaded state */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl skeleton-shimmer shrink-0" />
              <div className="w-36 sm:w-40 h-5 sm:h-6 rounded-lg skeleton-shimmer" />
            </div>
            <div className="w-20 sm:w-24 h-3.5 rounded-md skeleton-shimmer-subtle" />
          </div>

          {/* Heatmap Visual Frame Skeleton - Exact 4/3 Aspect Ratio */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] skeleton-shimmer-dark border border-[#565449]/20 shadow-inner flex flex-col justify-between p-3">
            {/* Center focus indicator pulse */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-[#D8CFBC]/20 skeleton-shimmer-subtle opacity-30" />
            </div>

            {/* Right Legend Gradient Bar Skeleton */}
            <div className="absolute right-3 top-3 bottom-3 w-8 flex flex-col items-center justify-between py-1 z-10">
              <div className="w-6 h-2 rounded skeleton-shimmer-subtle opacity-70" />
              <div className="w-1.5 h-full my-1 rounded-full skeleton-shimmer-subtle opacity-50 border border-white/10" />
              <div className="w-5 h-2 rounded skeleton-shimmer-subtle opacity-70" />
            </div>

            {/* Bottom-left Forensic Focus Indicator Badge Skeleton */}
            <div className="absolute bottom-2.5 left-2.5 w-36 h-5 rounded-md skeleton-shimmer-dark border border-[#565449]/30" />
          </div>
        </div>

        {/* Footnote Skeleton - Exact match to loaded footnote */}
        <div className="mt-3 text-[11px] flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full skeleton-shimmer shrink-0" />
          <div className="w-64 sm:w-80 h-3 rounded skeleton-shimmer-subtle" />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#11120D] text-[#FFFBF4] flex items-center justify-center">
              <Eye className="w-4 h-4 stroke-[1.8]" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#11120D] tracking-tight">
              Heatmap Analysis
            </h3>
          </div>
          <span className="text-[11px] font-sans font-medium text-[#565449]">
            Grad-CAM Visual
          </span>
        </div>

        {/* Heatmap Visual Frame */}
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#11120D] border border-[#565449]/20 shadow-inner group">
          {/* Base Suspect Image */}
          <img
            src={IMAGES.suspectMan}
            alt="Heatmap source face"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-90 contrast-105"
          />

          {/* Grad-CAM Thermal Heatmap Overlay: Warm Terracotta & Ochre spectrum */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-screen opacity-80 transition-opacity group-hover:opacity-90"
            style={{
              background: `
                radial-gradient(ellipse 42% 48% at 48% 50%, rgba(168, 67, 58, 0.85) 0%, rgba(143, 110, 56, 0.7) 32%, rgba(86, 84, 73, 0.45) 60%, rgba(62, 92, 70, 0.25) 80%, transparent 100%),
                radial-gradient(circle 35% at 52% 58%, rgba(168, 67, 58, 0.9) 0%, rgba(143, 110, 56, 0.55) 45%, transparent 80%)
              `
            }}
          />

          {/* Warm organic tone grading */}
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-color opacity-50"
            style={{
              background: 'radial-gradient(circle at 50% 50%, #A8433A 0%, #8F6E38 40%, #565449 70%, #11120D 95%)'
            }}
          />

          {/* Legend Gradient Bar on the right */}
          <div className="absolute right-3 top-3 bottom-3 w-8 flex flex-col items-center justify-between text-[8px] font-mono text-white drop-shadow py-1 pointer-events-none">
            <span className="leading-tight text-right w-14 pr-1 text-[#FFFBF4] font-bold">
              High
            </span>
            <div className="w-1.5 h-full my-1 rounded-full bg-gradient-to-b from-[#A8433A] via-[#8F6E38] via-[#565449] to-[#3E5C46] border border-white/20" />
            <span className="leading-tight text-right w-14 pr-1 text-[#D8CFBC] font-bold">
              Low
            </span>
          </div>

          {/* Forensic focus indicator */}
          <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#11120D]/80 backdrop-blur-xs text-[10px] font-mono text-[#FFFBF4]">
            Perioral &amp; Nasolabial Anomaly
          </div>
        </div>
      </div>

      {/* Explanatory Note below */}
      <div className="mt-3 text-[11px] font-sans text-[#565449] flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5 text-[#565449] shrink-0" />
        <span>Warm highlight areas pinpoint synthetic boundary blending artifacts.</span>
      </div>
    </div>
  );
};
