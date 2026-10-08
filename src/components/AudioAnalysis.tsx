import React, { useState } from 'react';
import { 
  Mic, 
  Play, 
  Pause, 
  Maximize2, 
  AlertTriangle, 
  AlertCircle 
} from 'lucide-react';
import { CURRENT_ANALYSIS } from '../data/mockData.ts';

interface AudioAnalysisProps {
  isLoading?: boolean;
}

export const AudioAnalysis: React.FC<AudioAnalysisProps> = ({ isLoading = false }) => {
  const [activeSubTab, setActiveSubTab] = useState<'spectrogram' | 'timeline'>('spectrogram');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (isLoading) {
    return (
      <div 
        aria-busy="true"
        aria-label="Loading Audio Analysis"
        className="glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-full select-none"
      >
        <div>
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl skeleton-shimmer shrink-0" />
              <div className="w-36 h-5 sm:h-6 rounded-lg skeleton-shimmer" />
            </div>

            <div className="w-36 h-7 rounded-xl skeleton-shimmer-subtle border border-[#565449]/15" />
          </div>

          {/* Spectrogram / Waveform Graphic Skeleton */}
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] skeleton-shimmer-dark border border-[#565449]/20 mb-3.5 shadow-inner" />

          {/* Player controls bar Skeleton */}
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#D8CFBC]/20 border border-[#565449]/15 mb-3.5">
            <div className="w-7 h-7 rounded-full skeleton-shimmer shrink-0" />
            <div className="flex-1 h-2 rounded-full skeleton-shimmer-subtle" />
            <div className="w-16 h-3 rounded skeleton-shimmer-subtle" />
          </div>
        </div>

        {/* Findings List Skeleton */}
        <div className="space-y-2">
          <div className="p-2.5 rounded-xl bg-[#FFFBF4] border border-[#565449]/15 flex items-center justify-between">
            <div className="space-y-1">
              <div className="w-32 h-3.5 rounded skeleton-shimmer" />
              <div className="w-48 h-2.5 rounded skeleton-shimmer-subtle" />
            </div>
            <div className="w-14 h-4 rounded-md skeleton-shimmer-subtle" />
          </div>
          <div className="p-2.5 rounded-xl bg-[#FFFBF4] border border-[#565449]/15 flex items-center justify-between">
            <div className="space-y-1">
              <div className="w-28 h-3.5 rounded skeleton-shimmer" />
              <div className="w-40 h-2.5 rounded skeleton-shimmer-subtle" />
            </div>
            <div className="w-14 h-4 rounded-md skeleton-shimmer-subtle" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-full">
      {/* Header with Spectrogram / Audio Timeline Tabs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#11120D] text-[#FFFBF4] flex items-center justify-center">
              <Mic className="w-4 h-4 stroke-[1.8]" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#11120D] tracking-tight">
              Audio Analysis
            </h3>
          </div>

          {/* Sub-tab pills */}
          <div className="flex items-center bg-[#D8CFBC]/25 p-0.5 rounded-xl border border-[#565449]/15 text-[11px] font-sans font-semibold">
            <button
              onClick={() => setActiveSubTab('spectrogram')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeSubTab === 'spectrogram'
                  ? 'bg-[#11120D] text-[#FFFBF4] shadow-2xs'
                  : 'text-[#565449] hover:text-[#11120D]'
              }`}
            >
              Spectrogram
            </button>
            <button
              onClick={() => setActiveSubTab('timeline')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeSubTab === 'timeline'
                  ? 'bg-[#11120D] text-[#FFFBF4] shadow-2xs'
                  : 'text-[#565449] hover:text-[#11120D]'
              }`}
            >
              Audio Timeline
            </button>
          </div>
        </div>

        {/* Spectrogram Graphic or Timeline Graphic */}
        <div className="relative rounded-2xl overflow-hidden aspect-[21/9] bg-[#11120D] border border-[#565449]/20 mb-3.5 shadow-inner">
          {activeSubTab === 'spectrogram' ? (
            /* Multi-band Spectrogram Canvas */
            <div className="w-full h-full relative overflow-hidden flex flex-col justify-end p-2 bg-gradient-to-t from-[#11120D] via-[#1A1C16] to-[#11120D]">
              {/* Synthetic Frequency Bands */}
              <div 
                className="absolute inset-0 opacity-80"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 75% 40%, rgba(168, 67, 58, 0.5) 0%, transparent 40%),
                    radial-gradient(circle at 70% 60%, rgba(143, 110, 56, 0.6) 0%, transparent 45%),
                    linear-gradient(90deg, rgba(86, 84, 73, 0.3) 0%, rgba(143, 110, 56, 0.4) 40%, rgba(168, 67, 58, 0.65) 68%, rgba(216, 207, 188, 0.5) 78%, rgba(86, 84, 73, 0.3) 100%)
                  `
                }}
              />

              {/* Grid Lines */}
              <div className="absolute inset-0 grid grid-rows-4 grid-cols-6 border-b border-white/10 pointer-events-none opacity-20">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="border-t border-r border-white/20" />
                ))}
              </div>

              {/* Suspicious Segment Marker */}
              <div className="absolute top-2 right-4 px-2 py-0.5 rounded-full bg-[#A8433A] text-[#FFFBF4] text-[9px] font-sans font-bold tracking-wider uppercase shadow-xs flex items-center gap-1">
                <AlertTriangle className="w-2.5 h-2.5" />
                <span>Suspicious Segment</span>
              </div>

              {/* Spectral Frequencies Simulation */}
              <svg className="w-full h-20 relative z-10" preserveAspectRatio="none" viewBox="0 0 100 40">
                <path
                  d="M0,35 Q15,28 25,32 T50,20 T68,5 T80,10 T90,28 T100,35 L100,40 L0,40 Z"
                  fill="url(#spectrogramGrad)"
                  opacity="0.85"
                />
                <defs>
                  <linearGradient id="spectrogramGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#565449" />
                    <stop offset="40%" stopColor="#8F6E38" />
                    <stop offset="70%" stopColor="#A8433A" />
                    <stop offset="85%" stopColor="#D8CFBC" />
                    <stop offset="100%" stopColor="#565449" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          ) : (
            /* Audio Timeline View */
            <div className="w-full h-full p-3 flex flex-col justify-center bg-[#11120D] text-[#FFFBF4]">
              <div className="flex items-center justify-between text-[10px] text-[#D8CFBC] mb-2 font-mono">
                <span>00:00</span>
                <span className="text-[#A8433A] font-bold">Anomaly 00:12 - 00:16</span>
                <span>01:28</span>
              </div>
              <div className="w-full h-10 flex items-center gap-[2px]">
                {Array.from({ length: 50 }).map((_, i) => {
                  const isAnomaly = i >= 8 && i <= 15;
                  const h = isAnomaly ? Math.random() * 20 + 16 : Math.random() * 12 + 6;
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-full ${
                        isAnomaly ? 'bg-[#A8433A]' : 'bg-[#D8CFBC]/60'
                      }`}
                      style={{ height: `${h}px` }}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Mini Playback Scrubber Bar at bottom */}
          <div className="p-2 bg-[#11120D] border-t border-[#565449]/30 flex items-center justify-between text-[#FFFBF4] text-[10px] font-sans">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-5 h-5 rounded-full bg-[#FFFBF4]/20 hover:bg-[#FFFBF4]/30 flex items-center justify-center cursor-pointer"
              >
                {isPlayingAudio ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5 fill-[#FFFBF4]" />}
              </button>
              <div className="w-24 sm:w-36 h-1 bg-[#565449]/40 rounded-full overflow-hidden">
                <div className="h-full bg-[#D8CFBC] rounded-full w-[14%]" />
              </div>
              <span className="font-mono text-[#D8CFBC]/80">00:12 / 01:28</span>
            </div>
            <Maximize2 className="w-3 h-3 text-[#D8CFBC]/80 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Audio Findings List */}
        <div>
          <div className="text-xs font-sans font-bold text-[#11120D] mb-2">Audio Findings</div>
          <div className="space-y-1.5 font-sans">
            {CURRENT_ANALYSIS.audioFindings.map((finding) => (
              <div
                key={finding.title}
                className="flex items-center justify-between p-2.5 rounded-xl glass-bone text-xs"
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  <AlertCircle className="w-3.5 h-3.5 text-[#A8433A] shrink-0" />
                  <span className="text-[#11120D] truncate font-medium">{finding.title}</span>
                </div>
                <span className="font-mono font-bold text-[#A8433A] bg-[#A8433A]/10 px-1.5 py-0.5 rounded-md border border-[#A8433A]/20 text-[11px] shrink-0">
                  {finding.score}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
