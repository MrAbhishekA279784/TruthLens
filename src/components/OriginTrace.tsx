import React, { useState } from 'react';
import { 
  Compass, 
  ExternalLink, 
  Search, 
  Check 
} from 'lucide-react';
import { CURRENT_ANALYSIS, IMAGES } from '../data/mockData.ts';

interface OriginTraceProps {
  isLoading?: boolean;
}

export const OriginTrace: React.FC<OriginTraceProps> = ({ isLoading = false }) => {
  const [selectedKeyframe, setSelectedKeyframe] = useState(0);
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  const reverseSearchEngines = [
    { name: "Google Lens" },
    { name: "TinEye" },
    { name: "Bing Visual Search" },
    { name: "Yandex" },
  ];

  const handleTriggerSearch = (engine: string) => {
    setSearchFeedback(`Reverse search query dispatched to ${engine}`);
    setTimeout(() => setSearchFeedback(null), 3000);
  };

  if (isLoading) {
    return (
      <div 
        aria-busy="true"
        aria-label="Loading Origin Trace and reverse verification"
        className="space-y-6 select-none"
      >
        {/* Top Banner Skeleton - Exact geometry */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-3xl bg-[#D8CFBC]/20 border border-[#565449]/15">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl skeleton-shimmer shrink-0" />
            <div className="space-y-1.5">
              <div className="w-48 sm:w-64 h-6 rounded-lg skeleton-shimmer" />
              <div className="w-64 sm:w-96 h-3.5 rounded skeleton-shimmer-subtle" />
            </div>
          </div>
          <div className="w-32 h-7 rounded-xl skeleton-shimmer-subtle shrink-0" />
        </div>

        {/* Keyframes 3-6 Selected Skeleton */}
        <div className="glass-card rounded-3xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-44 h-5 rounded-md skeleton-shimmer" />
            <div className="w-36 h-3 rounded skeleton-shimmer-subtle" />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-[#565449]/15">
                <div className="aspect-[4/3] skeleton-shimmer-dark relative flex items-end justify-end p-1.5">
                  <div className="w-10 h-3.5 rounded skeleton-shimmer-subtle opacity-70" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Media Found Grid Skeleton */}
        <div className="glass-card rounded-3xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-56 h-5 rounded-md skeleton-shimmer" />
            <div className="w-44 h-3 rounded skeleton-shimmer-subtle" />
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFFBF4] border border-[#565449]/15"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl skeleton-shimmer-dark shrink-0 border border-[#565449]/15" />
                  <div className="space-y-1.5 min-w-0">
                    <div className="w-40 sm:w-56 h-4 rounded-md skeleton-shimmer" />
                    <div className="w-28 sm:w-36 h-3 rounded skeleton-shimmer-subtle" />
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-20 h-6 rounded-md skeleton-shimmer-subtle" />
                  <div className="w-8 h-8 rounded-xl skeleton-shimmer-subtle" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reverse Search Engine Buttons Skeleton */}
        <div className="glass-card rounded-3xl p-5 sm:p-6">
          <div className="w-52 h-5 rounded-md skeleton-shimmer mb-1.5" />
          <div className="w-72 sm:w-96 h-3 rounded skeleton-shimmer-subtle mb-4" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 rounded-xl skeleton-shimmer-subtle border border-[#565449]/15" />
            ))}
          </div>
        </div>

        {/* Extracted On-screen Text (OCR) Skeleton */}
        <div className="p-4 rounded-3xl bg-[#D8CFBC]/20 border border-[#565449]/15">
          <div className="flex items-center justify-between mb-2">
            <div className="w-40 h-3.5 rounded skeleton-shimmer" />
            <div className="w-24 h-3 rounded skeleton-shimmer-subtle" />
          </div>
          <div className="h-12 rounded-xl skeleton-shimmer-subtle border border-[#565449]/15" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner - Frosted Glass Surface */}
      <div className="glass-bone flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-3xl">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#11120D] text-[#FFFBF4] flex items-center justify-center shadow-xs">
            <Compass className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#11120D]">
              Origin Trace &amp; Fingerprints
            </h3>
            <p className="text-xs sm:text-sm font-sans text-[#565449]">
              Tracing prior uploads, recompression variants, and cross-platform repost networks via pHash matching.
            </p>
          </div>
        </div>
        <div className="text-xs font-mono bg-[#FFFBF4]/80 px-3 py-1.5 rounded-xl border border-[#565449]/20 text-[#11120D] font-semibold shrink-0 shadow-2xs">
          pHash: 0x9e81b2c4f03a
        </div>
      </div>

      {searchFeedback && (
        <div className="p-3 bg-[#3E5C46]/10 border border-[#3E5C46]/20 rounded-2xl text-xs font-sans font-medium text-[#3E5C46] flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-[#3E5C46]" />
          <span>{searchFeedback}</span>
        </div>
      )}

      {/* Keyframes 3-6 Selected */}
      <div className="glass-card rounded-3xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-serif text-lg font-bold text-[#11120D]">
            Keyframes (3–6 selected)
          </h4>
          <span className="text-[11px] font-sans text-[#565449]">
            Extracted at 1 fps scene transitions
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {CURRENT_ANALYSIS.keyframes.slice(0, 4).map((frame, index) => (
            <div
              key={frame.timestamp}
              onClick={() => setSelectedKeyframe(index)}
              className={`rounded-2xl overflow-hidden cursor-pointer transition-all ${
                selectedKeyframe === index
                  ? 'ring-2 ring-[#11120D] shadow-md scale-[1.02]'
                  : 'border border-[#565449]/20 hover:border-[#565449]/40 hover:scale-[1.01]'
              }`}
            >
              <div className="aspect-[4/3] bg-[#11120D] overflow-hidden relative group">
                <img
                  src={IMAGES.suspectMan}
                  alt={`Keyframe ${frame.timestamp}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-[#11120D]/80 text-[#FFFBF4] font-mono text-[9px] backdrop-blur-xs">
                  {frame.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Media Found Grid */}
      <div className="glass-card rounded-3xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-serif text-lg font-bold text-[#11120D]">
            Similar Media Found (Perceptual Match)
          </h4>
          <span className="text-[11px] font-sans text-[#565449]">
            Database of 14,200+ indexed media files
          </span>
        </div>

        <div className="space-y-3 font-sans">
          {CURRENT_ANALYSIS.similarMedia.map((media) => (
            <div
              key={media.id}
              className="glass-bone flex items-center justify-between p-3.5 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#11120D] overflow-hidden shrink-0 border border-[#565449]/20 shadow-2xs">
                  <img
                    src={IMAGES.newsBroadcast}
                    alt={media.relation}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-semibold text-[#11120D] truncate">
                    {media.relation}
                  </div>
                  <div className="text-[11px] text-[#565449] mt-0.5 flex items-center gap-2">
                    <span className="font-semibold text-[#11120D]">{media.domain}</span>
                    <span>·</span>
                    <span>{media.timeAgo}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-xs font-bold text-[#3E5C46] bg-[#3E5C46]/10 px-2.5 py-0.5 rounded-md border border-[#3E5C46]/20">
                  {media.matchPercent}% match
                </span>
                <a
                  href={media.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glass-secondary w-8 h-8 rounded-xl flex items-center justify-center text-[#11120D]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reverse Search Engine Buttons */}
      <div className="glass-card rounded-3xl p-5 sm:p-6">
        <h4 className="font-serif text-lg font-bold text-[#11120D] mb-1">
          One-Click Reverse Search Engines
        </h4>
        <p className="text-xs font-sans text-[#565449] mb-4">
          Dispatch selected keyframe fingerprint to major visual search databases to find original unedited context.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-sans">
          {reverseSearchEngines.map((engine) => (
            <button
              key={engine.name}
              onClick={() => handleTriggerSearch(engine.name)}
              className="btn-glass-secondary py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#565449]" />
              <span>{engine.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Extracted On-screen Text (OCR) */}
      <div className="glass-bone p-4 rounded-3xl">
        <div className="flex items-center justify-between text-xs font-sans font-semibold text-[#11120D] mb-2">
          <span>Extracted On-Screen Text (OCR)</span>
          <span className="text-[10px] text-[#565449] font-mono">Tesseract Eng + Hin</span>
        </div>
        <p className="text-xs font-mono text-[#11120D] glass-card p-3 rounded-xl leading-relaxed">
          &quot;BREAKING NEWS: SPECIAL ADDRESS TO THE MEDIA — AUGUST 2025 // LIVE PRESS BRIEFING&quot;
        </p>
      </div>
    </div>
  );
};
