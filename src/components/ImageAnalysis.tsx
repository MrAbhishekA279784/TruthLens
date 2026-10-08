import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Edit2, 
  Maximize2, 
  AlertTriangle, 
  Download, 
  Share2, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Scan,
  Layers
} from 'lucide-react';
import { IMAGES } from '../data/mockData.ts';
import { triggerHaptic } from '../utils/haptics.ts';

interface ImageAnalysisProps {
  isLoading?: boolean;
  onViewDetailed?: () => void;
  onDownloadReport?: () => void;
  onShare?: () => void;
}

export const ImageAnalysis: React.FC<ImageAnalysisProps> = ({
  isLoading = false,
  onViewDetailed,
  onDownloadReport,
  onShare,
}) => {
  const [activeLayer, setActiveLayer] = useState<'normal' | 'ela' | 'landmarks'>('landmarks');
  const [sharedToast, setSharedToast] = useState(false);
  const [downloadToast, setDownloadToast] = useState(false);

  const handleShareClick = () => {
    triggerHaptic('tap');
    if (onShare) onShare();
    setSharedToast(true);
    setTimeout(() => setSharedToast(false), 2500);
  };

  const handleDownloadClick = () => {
    triggerHaptic('tap');
    if (onDownloadReport) onDownloadReport();
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 2500);
  };

  if (isLoading) {
    return (
      <div 
        aria-busy="true"
        aria-label="Loading Image Forensic Analysis"
        className="glass-card rounded-3xl p-5 sm:p-7 mb-6 font-sans select-none"
      >
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl skeleton-shimmer shrink-0" />
            <div className="w-48 sm:w-56 h-7 rounded-lg skeleton-shimmer" />
          </div>
          <div className="w-28 h-7 rounded-xl skeleton-shimmer-subtle border border-[#565449]/15" />
        </div>

        {/* Main Grid: Image Viewer + Analysis Alert Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left: Image Viewer Skeleton */}
          <div className="lg:col-span-7 skeleton-shimmer-dark rounded-2xl overflow-hidden relative shadow-md flex flex-col justify-between">
            <div className="aspect-video w-full skeleton-shimmer-dark flex items-center justify-center">
              <div className="w-16 h-16 rounded-full skeleton-shimmer-subtle opacity-30" />
            </div>
            {/* Layers Bar Skeleton */}
            <div className="p-2.5 bg-[#11120D] border-t border-[#565449]/20 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-20 h-7 rounded-lg skeleton-shimmer-subtle" />
                <div className="w-24 h-7 rounded-lg skeleton-shimmer-subtle" />
                <div className="w-20 h-7 rounded-lg skeleton-shimmer-subtle" />
              </div>
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
    <div className="glass-card rounded-3xl p-5 sm:p-7 mb-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#11120D] text-[#FFFBF4] flex items-center justify-center">
            <ImageIcon className="w-4.5 h-4.5 stroke-[1.8]" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#11120D] tracking-tight">
              Image Forensic Analysis
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#565449] bg-[#D8CFBC]/25 px-3 py-1 rounded-xl border border-[#565449]/15">
          <span>photo_0810.jpg</span>
          <Edit2 className="w-3 h-3 text-[#565449] hover:text-[#11120D] cursor-pointer" />
        </div>
      </div>

      {/* Main Grid: Image Viewer + Analysis Alert Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Image Viewer with Diagnostic Layers */}
        <div className="lg:col-span-7 bg-[#11120D] rounded-2xl overflow-hidden relative shadow-md flex flex-col justify-between group">
          <div className="relative aspect-video w-full bg-[#11120D] overflow-hidden flex items-center justify-center select-none">
            {/* Primary Source Image */}
            <img
              src={IMAGES.onboardingWoman}
              alt="Analyzed forensic image"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-all duration-300 ${
                activeLayer === 'ela' ? 'filter contrast-150 saturate-200 hue-rotate-15 brightness-90' : 'filter brightness-95'
              }`}
            />

            {/* Diagnostic Badges */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3E5C46]/90 backdrop-blur-md text-[#FFFBF4] text-[10px] font-sans font-semibold tracking-wider uppercase shadow-xs">
              <CheckCircle2 className="w-3 h-3" />
              <span>Authentic Capture Profile</span>
            </div>

            {/* Facial Landmark & Geometry Overlay */}
            {activeLayer === 'landmarks' && (
              <div className="absolute top-[16%] left-[26%] w-[48%] h-[68%] border border-[#3E5C46] rounded-xl pointer-events-none shadow-[0_0_15px_rgba(62,92,70,0.3)] flex flex-col justify-between p-2">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono font-bold bg-[#3E5C46] text-[#FFFBF4] px-1.5 py-0.5 rounded-xs">
                    BIOMETRIC COHERENCE · 98.4%
                  </span>
                  <span className="w-2 h-2 border-t border-r border-[#3E5C46]" />
                </div>
                {/* Micro mesh nodes */}
                <div className="flex justify-around items-center opacity-70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFFBF4]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFFBF4]" />
                </div>
                <div className="flex justify-between items-end">
                  <span className="w-2 h-2 border-b border-l border-[#3E5C46]" />
                  <span className="w-2 h-2 border-b border-r border-[#3E5C46]" />
                </div>
              </div>
            )}

            {/* ELA (Error Level Analysis) Heat Overlay */}
            {activeLayer === 'ela' && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-40 mix-blend-color-dodge"
                style={{
                  backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(62, 92, 70, 0.8) 0%, rgba(216, 207, 188, 0.3) 60%, transparent 90%)'
                }}
              />
            )}

            {/* Diagnostic Layer Selector Pill Bar at top right */}
            <div className="absolute top-3 right-3 flex items-center bg-[#11120D]/80 backdrop-blur-md p-0.5 rounded-xl border border-white/20 text-[10px] font-sans">
              <button
                onClick={() => {
                  triggerHaptic('tap');
                  setActiveLayer('normal');
                }}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  activeLayer === 'normal' ? 'bg-[#FFFBF4] text-[#11120D] font-bold' : 'text-[#D8CFBC]'
                }`}
              >
                RGB
              </button>
              <button
                onClick={() => {
                  triggerHaptic('tap');
                  setActiveLayer('landmarks');
                }}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  activeLayer === 'landmarks' ? 'bg-[#FFFBF4] text-[#11120D] font-bold' : 'text-[#D8CFBC]'
                }`}
              >
                Landmarks
              </button>
              <button
                onClick={() => {
                  triggerHaptic('tap');
                  setActiveLayer('ela');
                }}
                className={`px-2 py-0.5 rounded-lg transition-all ${
                  activeLayer === 'ela' ? 'bg-[#FFFBF4] text-[#11120D] font-bold' : 'text-[#D8CFBC]'
                }`}
              >
                ELA Map
              </button>
            </div>
          </div>

          {/* Footer Metadata Bar */}
          <div className="p-3 bg-[#11120D] border-t border-[#565449]/30 text-[#D8CFBC] flex items-center justify-between text-xs font-sans">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-[#FFFBF4]">
                2448 × 3264 · 24-bit sRGB
              </span>
              <span className="text-[#565449]">·</span>
              <span className="text-[11px] text-[#D8CFBC]/80">ISO 100 · 1/250s · f/1.8</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-[#565449]/30 px-2 py-0.5 rounded text-[#FFFBF4]">
                JPEG Q94
              </span>
            </div>
          </div>
        </div>

        {/* Right: Verdict Summary Card - Frosted Glass Depth */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-7 rounded-2xl glass-bone relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#3E5C46]/5 rounded-bl-full pointer-events-none" />

          <div>
            {/* Top Verdict Row */}
            <div className="flex items-start gap-3.5 mb-3">
              <div className="w-11 h-11 rounded-xl bg-[#3E5C46]/10 text-[#3E5C46] border border-[#3E5C46]/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3E5C46] tracking-tight leading-none">
                  Likely Authentic
                </h3>
                <div className="text-xs font-sans font-bold text-[#565449] mt-1.5">
                  87% Forensic Confidence
                </div>
              </div>
            </div>

            {/* Confidence Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-[#D8CFBC]/40 overflow-hidden mb-4">
              <div className="h-full rounded-full bg-[#3E5C46] w-[87%]" />
            </div>

            {/* Explanation Prose */}
            <p className="text-xs sm:text-sm font-sans text-[#565449] leading-relaxed mb-4">
              Error Level Analysis (ELA) demonstrates uniform compression quantization across all pixel quadrants. Sensor noise patterns match standard Bayer color filter arrays with intact natural skin pore fidelity.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2.5 py-1 rounded-lg bg-[#3E5C46]/10 text-[#3E5C46] text-[11px] font-sans font-medium border border-[#3E5C46]/20">
                Natural Sensor Noise
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#D8CFBC]/25 text-[#11120D] text-[11px] font-sans font-medium border border-[#565449]/15">
                Uniform Quantization
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#D8CFBC]/25 text-[#11120D] text-[11px] font-sans font-medium border border-[#565449]/15">
                No Inpainting Traces
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-3 border-t border-[#565449]/10 font-sans">
            <button
              onClick={onViewDetailed}
              className="btn-primary-solid w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Detailed Evidence</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDownloadClick}
                className="btn-glass-secondary py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#565449]" />
                <span>{downloadToast ? 'Downloaded!' : 'Download Report'}</span>
              </button>

              <button
                onClick={handleShareClick}
                className="btn-glass-secondary py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
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
