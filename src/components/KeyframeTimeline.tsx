import React, { useState } from 'react';
import { Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { CURRENT_ANALYSIS, IMAGES } from '../data/mockData.ts';

interface KeyframeTimelineProps {
  isLoading?: boolean;
  onSelectKeyframe?: (timestamp: string) => void;
}

export const KeyframeTimeline: React.FC<KeyframeTimelineProps> = ({ 
  isLoading = false,
  onSelectKeyframe 
}) => {
  const [selectedFrame, setSelectedFrame] = useState("00:12");

  if (isLoading) {
    return (
      <div 
        aria-busy="true"
        aria-label="Loading Keyframes and Timeline"
        className="glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-full select-none"
      >
        <div>
          {/* Header Skeleton */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl skeleton-shimmer shrink-0" />
            <div className="w-40 h-5 sm:h-6 rounded-lg skeleton-shimmer" />
          </div>

          {/* Keyframes Row Skeleton */}
          <div className="relative flex items-center gap-1.5 mb-4">
            <div className="w-6 h-6 rounded-full skeleton-shimmer-subtle shrink-0" />
            <div className="grid grid-cols-4 gap-2 flex-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-[#565449]/15">
                  <div className="aspect-square w-full skeleton-shimmer-dark" />
                  <div className="h-5 skeleton-shimmer-subtle" />
                </div>
              ))}
            </div>
            <div className="w-6 h-6 rounded-full skeleton-shimmer-subtle shrink-0" />
          </div>
        </div>

        {/* Suspicious Timeline Waveform Section Skeleton */}
        <div className="pt-3 border-t border-[#565449]/10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-32 h-4 rounded skeleton-shimmer" />
            <div className="w-28 h-4 rounded-md skeleton-shimmer-subtle" />
          </div>

          <div className="w-full h-16 rounded-xl skeleton-shimmer-subtle border border-[#565449]/15" />

          <div className="flex justify-between items-center px-1 pt-1">
            <div className="w-6 h-2.5 rounded skeleton-shimmer-subtle" />
            <div className="w-6 h-2.5 rounded skeleton-shimmer-subtle" />
            <div className="w-6 h-2.5 rounded skeleton-shimmer-subtle" />
            <div className="w-6 h-2.5 rounded skeleton-shimmer-subtle" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-[#11120D] text-[#FFFBF4] flex items-center justify-center">
            <Video className="w-4 h-4 stroke-[1.8]" />
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#11120D] tracking-tight">
            Keyframes & Timeline
          </h3>
        </div>

        {/* Keyframes Row with Nav Controls */}
        <div className="relative flex items-center gap-1.5 mb-4">
          <button 
            className="w-6 h-6 rounded-full bg-[#D8CFBC]/30 hover:bg-[#D8CFBC]/60 flex items-center justify-center text-[#565449] shrink-0 cursor-pointer"
            aria-label="Previous frame"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div className="grid grid-cols-4 gap-2 flex-1">
            {CURRENT_ANALYSIS.keyframes.map((frame) => {
              const isSelected = selectedFrame === frame.timestamp;
              return (
                <div
                  key={frame.timestamp}
                  onClick={() => {
                    setSelectedFrame(frame.timestamp);
                    if (onSelectKeyframe) onSelectKeyframe(frame.timestamp);
                  }}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all ${
                    frame.isSuspicious
                      ? 'ring-2 ring-[#A8433A] shadow-xs'
                      : isSelected
                        ? 'ring-2 ring-[#11120D]'
                        : 'border border-[#565449]/20 hover:border-[#565449]/40'
                  }`}
                >
                  <div className="aspect-square w-full bg-[#11120D] overflow-hidden relative">
                    <img
                      src={IMAGES.suspectMan}
                      alt={`Frame ${frame.timestamp}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    {frame.isSuspicious && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#A8433A] ring-1 ring-white" />
                    )}
                  </div>
                  <div className={`py-1 text-center font-mono text-[11px] font-semibold transition-colors ${
                    frame.isSuspicious 
                      ? 'bg-[#A8433A]/10 text-[#A8433A] font-bold' 
                      : 'bg-[#FFFBF4] text-[#565449]'
                  }`}>
                    {frame.timestamp}
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            className="w-6 h-6 rounded-full bg-[#D8CFBC]/30 hover:bg-[#D8CFBC]/60 flex items-center justify-center text-[#565449] shrink-0 cursor-pointer"
            aria-label="Next frame"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Suspicious Timeline Waveform Section */}
      <div className="pt-3 border-t border-[#565449]/10">
        <div className="text-xs font-sans font-semibold text-[#11120D] mb-2 flex items-center justify-between">
          <span>Suspicious Timeline</span>
          <span className="text-[10px] text-[#A8433A] font-semibold bg-[#A8433A]/10 px-2 py-0.5 rounded-md border border-[#A8433A]/20">
            Peak anomaly at 00:12
          </span>
        </div>

        {/* Waveform Bars */}
        <div className="w-full h-16 bg-[#D8CFBC]/15 rounded-xl p-2 border border-[#565449]/15 flex items-center justify-between gap-[2px] relative overflow-hidden">
          {/* Highlight overlay for 00:10 - 00:18 */}
          <div className="absolute left-[16%] w-[18%] top-0 bottom-0 bg-[#A8433A]/15 border-x border-[#A8433A]/30 pointer-events-none" />

          {/* Vertical waveform lines */}
          {Array.from({ length: 48 }).map((_, i) => {
            const isSuspiciousRange = i >= 8 && i <= 16;
            const height = isSuspiciousRange
              ? Math.sin((i - 8) * 0.4) * 28 + 20
              : Math.sin(i * 0.5) * 14 + 10;
            return (
              <div
                key={i}
                className={`flex-1 rounded-full transition-all ${
                  isSuspiciousRange
                    ? 'bg-[#A8433A]'
                    : 'bg-[#565449]/45 hover:bg-[#565449]'
                }`}
                style={{ height: `${Math.max(6, Math.min(48, height))}px` }}
              />
            );
          })}
        </div>

        {/* Timestamps */}
        <div className="flex justify-between items-center text-[10px] font-mono text-[#565449] mt-2 px-1">
          <span>00:00</span>
          <span className="text-[#A8433A] font-bold">00:15</span>
          <span>00:30</span>
          <span>00:45</span>
          <span>01:00</span>
          <span>01:28</span>
        </div>
      </div>
    </div>
  );
};
