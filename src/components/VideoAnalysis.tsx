import React, { useState } from 'react';
import { 
  Video as VideoIcon, 
  Edit2, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Settings, 
  Maximize2, 
  AlertTriangle, 
  Download, 
  Share2, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { CURRENT_ANALYSIS, IMAGES } from '../data/mockData.ts';

interface VideoAnalysisProps {
  isLoading?: boolean;
  onViewDetailed?: () => void;
  onDownloadReport?: () => void;
  onShare?: () => void;
}

export const VideoAnalysis: React.FC<VideoAnalysisProps> = ({
  isLoading = false,
  onViewDetailed,
  onDownloadReport,
  onShare,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(13.6);
  const [sharedToast, setSharedToast] = useState(false);
  const [downloadToast, setDownloadToast] = useState(false);

  const handleShareClick = () => {
    if (onShare) onShare();
    navigator.clipboard?.writeText(CURRENT_ANALYSIS.publicVerifyUrl);
    setSharedToast(true);
    setTimeout(() => setSharedToast(false), 2500);
  };

  const handleDownloadClick = () => {
    if (onDownloadReport) onDownloadReport();
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 2500);
  };

  if (isLoading) {
    return (
      <div 
        aria-busy="true"
        aria-label="Loading Video Analysis"
        className="glass-card rounded-3xl p-5 sm:p-7 mb-6 select-none"
      >
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl skeleton-shimmer shrink-0" />
            <div className="w-40 sm:w-48 h-7 rounded-lg skeleton-shimmer" />
          </div>
          <div className="w-32 h-7 rounded-xl skeleton-shimmer-subtle border border-[#565449]/15" />
        </div>

        {/* Main Grid: Video Player + Analysis Alert Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left: Video Player Skeleton */}
          <div className="lg:col-span-7 skeleton-shimmer-dark rounded-2xl overflow-hidden relative shadow-md flex flex-col justify-between">
            <div className="aspect-video w-full skeleton-shimmer-dark flex items-center justify-center">
              <div className="w-16 h-16 rounded-full skeleton-shimmer-subtle opacity-30" />
            </div>
            {/* Player Controls Bar Skeleton */}
            <div className="p-3 bg-[#11120D] border-t border-[#565449]/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg skeleton-shimmer-subtle" />
                <div className="w-7 h-7 rounded-lg skeleton-shimmer-subtle" />
                <div className="w-16 h-3 rounded skeleton-shimmer-subtle" />
              </div>
              <div className="w-24 h-2 rounded-full skeleton-shimmer-subtle" />
              <div className="w-6 h-6 rounded-md skeleton-shimmer-subtle" />
            </div>
          </div>

          {/* Right: Alert Card Skeleton */}
          <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-[#D8CFBC]/25 border border-[#565449]/15 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-36 h-6 rounded-md skeleton-shimmer" />
                <div className="w-16 h-6 rounded-md skeleton-shimmer" />
              </div>
              <div className="w-full h-2 rounded-full skeleton-shimmer-subtle mb-4" />
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 rounded skeleton-shimmer-subtle" />
                <div className="w-5/6 h-3 rounded skeleton-shimmer-subtle" />
                <div className="w-4/6 h-3 rounded skeleton-shimmer-subtle" />
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#565449]/15">
              <div className="h-10 rounded-xl skeleton-shimmer w-full" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-9 rounded-xl skeleton-shimmer-subtle border border-[#565449]/15" />
                <div className="h-9 rounded-xl skeleton-shimmer-subtle border border-[#565449]/15" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-7 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#11120D] text-[#FFFBF4] flex items-center justify-center">
            <VideoIcon className="w-4.5 h-4.5 stroke-[1.8]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#11120D] tracking-tight">
            Video Analysis
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#565449] bg-[#D8CFBC]/25 px-3 py-1 rounded-xl border border-[#565449]/15">
          <span>{CURRENT_ANALYSIS.fileName}</span>
          <Edit2 className="w-3 h-3 text-[#565449] hover:text-[#11120D] cursor-pointer" />
        </div>
      </div>

      {/* Main Grid: Video Player + Analysis Alert Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Video Player */}
        <div className="lg:col-span-7 bg-[#11120D] rounded-2xl overflow-hidden relative shadow-md flex flex-col justify-between group">
          {/* Video Screen Container */}
          <div className="relative aspect-video w-full bg-[#11120D] overflow-hidden flex items-center justify-center select-none">
            {/* Background Suspect Frame */}
            <img
              src={IMAGES.suspectMan}
              alt="Analyzed video frame"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-[1.01]"
            />

            {/* Top Left: Suspicious Frame Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8433A]/90 backdrop-blur-md text-[#FFFBF4] text-[10px] font-sans font-semibold tracking-wider uppercase shadow-xs">
              <AlertTriangle className="w-3 h-3" />
              <span>Suspicious Frame</span>
            </div>

            {/* Face Bounding Box */}
            <div className="absolute top-[18%] left-[28%] w-[42%] h-[64%] border border-[#A8433A] rounded-lg pointer-events-none shadow-[0_0_12px_rgba(168,67,58,0.3)] flex flex-col justify-between p-1.5">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono font-medium bg-[#A8433A] text-[#FFFBF4] px-1 rounded-xs">
                  FACE #01 · 92%
                </span>
                <span className="w-2 h-2 border-t border-r border-[#A8433A]" />
              </div>
              <div className="flex justify-between items-end">
                <span className="w-2 h-2 border-b border-l border-[#A8433A]" />
                <span className="w-2 h-2 border-b border-r border-[#A8433A]" />
              </div>
            </div>

            {/* Vertical Suspicion Thermal Legend Bar */}
            <div className="absolute right-3 top-3 bottom-12 w-6 flex flex-col items-center justify-between text-[8px] font-mono text-[#FFFBF4]/90 drop-shadow py-1 pointer-events-none">
              <span className="leading-tight text-right w-12 pr-1 text-[#A8433A] font-bold">High</span>
              <div className="w-1.5 h-full my-1 rounded-full bg-gradient-to-b from-[#A8433A] via-[#8F6E38] to-[#3E5C46] border border-white/20" />
              <span className="leading-tight text-right w-12 pr-1 text-[#3E5C46] font-bold">Low</span>
            </div>

            {/* Centered Play Button when paused */}
            {!isPlaying && (
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#FFFBF4]/20 hover:bg-[#FFFBF4]/30 backdrop-blur-md border border-[#FFFBF4]/40 flex items-center justify-center text-[#FFFBF4] shadow-xl transition-all hover:scale-105 cursor-pointer"
                aria-label="Play video"
              >
                <Play className="w-5 h-5 ml-0.5 fill-[#FFFBF4]" />
              </button>
            )}
          </div>

          {/* Video Player Control Bar */}
          <div className="p-3 bg-[#11120D] border-t border-[#565449]/30 text-[#FFFBF4] flex flex-col gap-2">
            {/* Timeline Bar */}
            <div 
              className="relative w-full h-1.5 bg-[#565449]/40 rounded-full cursor-pointer group/bar flex items-center"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                setCurrentProgress((clickX / rect.width) * 100);
              }}
            >
              {/* Highlighted suspicious section (00:10 - 00:16) */}
              <div 
                className="absolute left-[11%] w-[8%] h-full bg-[#A8433A]/80 rounded-full" 
                title="Suspicious Segment: 00:10 - 00:16"
              />
              {/* Active played progress */}
              <div 
                className="h-full bg-[#D8CFBC] rounded-full relative"
                style={{ width: `${currentProgress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#FFFBF4] rounded-full shadow-md scale-0 group-hover/bar:scale-100 transition-transform" />
              </div>
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between text-xs text-[#D8CFBC]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white transition-colors cursor-pointer"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <span className="font-mono text-[11px] text-[#D8CFBC]/80">
                  00:12 / 01:28
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white transition-colors cursor-pointer"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button className="hover:text-white transition-colors cursor-pointer" aria-label="Settings">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="hover:text-white transition-colors cursor-pointer" aria-label="Fullscreen">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Analysis Verdict Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-7 rounded-2xl glass-bone relative overflow-hidden">
          {/* Subtle warm accent watermark wash */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#A8433A]/5 rounded-bl-full pointer-events-none" />

          <div>
            {/* Top Verdict Row */}
            <div className="flex items-start gap-3.5 mb-3">
              <div className="w-11 h-11 rounded-xl bg-[#A8433A]/10 text-[#A8433A] border border-[#A8433A]/20 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#A8433A] tracking-tight leading-none">
                  Likely Manipulated
                </h3>
                <div className="text-xs font-sans font-bold text-[#565449] mt-1.5">
                  92% Forensic Confidence
                </div>
              </div>
            </div>

            {/* Confidence Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-[#D8CFBC]/40 overflow-hidden mb-4">
              <div className="h-full rounded-full bg-[#A8433A] w-[92%]" />
            </div>

            {/* Explanation Prose */}
            <p className="text-xs sm:text-sm font-sans text-[#565449] leading-relaxed mb-4">
              {CURRENT_ANALYSIS.explanation}
            </p>

            {/* Tags / Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CURRENT_ANALYSIS.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-[#D8CFBC]/25 text-[#11120D] text-[11px] font-sans font-medium border border-[#565449]/15"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-3 border-t border-[#565449]/10 font-sans">
            <button
              onClick={onViewDetailed}
              className="w-full py-2.5 px-4 rounded-xl bg-[#11120D] hover:bg-[#11120D]/90 text-[#FFFBF4] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99] cursor-pointer"
            >
              <span>View Detailed Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDownloadClick}
                className="py-2 px-3 rounded-xl bg-[#FFFBF4] hover:bg-[#D8CFBC]/25 border border-[#565449]/20 text-[#11120D] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#565449]" />
                <span>{downloadToast ? 'Downloaded!' : 'Download Report'}</span>
              </button>

              <button
                onClick={handleShareClick}
                className="py-2 px-3 rounded-xl bg-[#FFFBF4] hover:bg-[#D8CFBC]/25 border border-[#565449]/20 text-[#11120D] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#565449]" />
                <span>{sharedToast ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
