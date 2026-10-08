import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  Share2, 
  FileBadge 
} from 'lucide-react';
import { CURRENT_ANALYSIS, IMAGES } from '../data/mockData.ts';

interface PassportCardProps {
  isLoading?: boolean;
  onDownloadPdf?: () => void;
  onShare?: () => void;
}

export const PassportCard: React.FC<PassportCardProps> = ({ 
  isLoading = false,
  onDownloadPdf, 
  onShare 
}) => {
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopyHash = () => {
    navigator.clipboard?.writeText("3f2a89c108e42f9b17d5a08341e97c92b8d447a1");
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard?.writeText(CURRENT_ANALYSIS.publicVerifyUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      if (onDownloadPdf) onDownloadPdf();
    }, 1200);
  };

  if (isLoading) {
    return (
      <div 
        aria-busy="true"
        aria-label="Loading TruthLens Passport"
        className="glass-card rounded-3xl p-5 sm:p-7 flex flex-col justify-between h-full sticky top-20 select-none"
      >
        <div>
          {/* Header Skeleton - Exact match to loaded state */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#565449]/15">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl skeleton-shimmer shrink-0" />
              <div className="w-36 sm:w-40 h-5 sm:h-6 rounded-lg skeleton-shimmer" />
            </div>
            <div className="w-24 sm:w-28 h-4 rounded-md skeleton-shimmer-subtle" />
          </div>

          {/* Media Preview Banner Skeleton - Exact 16/7 aspect ratio */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/7] skeleton-shimmer-dark mb-4 border border-[#565449]/20 shadow-2xs flex flex-col justify-between p-2.5">
            <div className="w-16 h-3.5 rounded-md skeleton-shimmer-subtle opacity-70" />
            <div className="flex items-center justify-between">
              <div className="w-44 h-3 rounded skeleton-shimmer-subtle opacity-60" />
              <div className="w-6 h-6 rounded-full skeleton-shimmer-subtle opacity-50" />
            </div>
          </div>

          {/* Attributes Table Skeleton - Exact spacing and row counts */}
          <div className="space-y-2.5 text-xs pb-4 mb-4 border-b border-[#565449]/15">
            {/* Verdict Row */}
            <div className="flex items-center justify-between py-0.5">
              <div className="w-14 h-3.5 rounded skeleton-shimmer-subtle" />
              <div className="w-32 h-6 rounded-md skeleton-shimmer" />
            </div>

            {/* Confidence Row */}
            <div className="flex items-center justify-between py-0.5">
              <div className="w-20 h-3.5 rounded skeleton-shimmer-subtle" />
              <div className="w-14 h-5 rounded-md skeleton-shimmer" />
            </div>

            {/* Date Row */}
            <div className="flex items-center justify-between py-0.5">
              <div className="w-10 h-3.5 rounded skeleton-shimmer-subtle" />
              <div className="w-36 h-3.5 rounded skeleton-shimmer-subtle" />
            </div>

            {/* File Hash Row */}
            <div className="flex items-center justify-between py-0.5">
              <div className="w-16 h-3.5 rounded skeleton-shimmer-subtle" />
              <div className="flex items-center gap-1.5">
                <div className="w-28 h-3.5 rounded skeleton-shimmer-subtle" />
                <div className="w-3.5 h-3.5 rounded skeleton-shimmer" />
              </div>
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            <div className="h-10 rounded-xl skeleton-shimmer flex items-center justify-center gap-2" />
            <div className="h-10 rounded-xl skeleton-shimmer-subtle border border-[#565449]/15" />
          </div>
        </div>

        {/* QR Code Section Skeleton */}
        <div className="p-3.5 rounded-2xl bg-[#D8CFBC]/20 border border-[#565449]/15">
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 skeleton-shimmer rounded-xl shrink-0" />
            <div className="flex-1 space-y-1.5 min-w-0">
              <div className="w-28 h-3.5 rounded skeleton-shimmer" />
              <div className="w-36 h-2.5 rounded skeleton-shimmer-subtle" />
              <div className="w-24 h-3 rounded skeleton-shimmer pt-0.5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-7 flex flex-col justify-between h-full sticky top-20">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#565449]/15">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#11120D] text-[#FFFBF4] flex items-center justify-center shadow-xs">
              <FileBadge className="w-4 h-4 stroke-[1.8]" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#11120D] tracking-tight">
              TruthLens Passport
            </h2>
          </div>
          <span className="font-mono text-xs text-[#565449]">
            {CURRENT_ANALYSIS.passportId}
          </span>
        </div>

        {/* Media Preview Banner */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/7] bg-[#11120D] mb-4 border border-[#565449]/20 shadow-2xs">
          <img
            src={IMAGES.suspectMan}
            alt="Passport media preview"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11120D]/80 via-transparent to-transparent flex items-end p-2.5">
            <span className="font-mono text-[10px] text-[#D8CFBC] font-medium">
              Inspected File: video_2025_0812.mp4
            </span>
          </div>
        </div>

        {/* Attributes Table */}
        <div className="space-y-2.5 text-xs font-sans pb-4 mb-4 border-b border-[#565449]/15">
          <div className="flex items-center justify-between">
            <span className="text-[#565449] font-medium">Verdict</span>
            <span className="font-semibold text-[#A8433A] bg-[#A8433A]/10 px-2.5 py-0.5 rounded-md border border-[#A8433A]/20">
              {CURRENT_ANALYSIS.verdict}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#565449] font-medium">Confidence</span>
            <span className="font-bold text-[#11120D] font-mono">
              {CURRENT_ANALYSIS.confidence}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#565449] font-medium">Date</span>
            <span className="font-medium text-[#11120D]">
              {CURRENT_ANALYSIS.date}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#565449] font-medium">File Hash (SHA-256)</span>
            <button
              onClick={handleCopyHash}
              className="flex items-center gap-1.5 font-mono text-[#11120D] hover:text-[#565449] transition-colors cursor-pointer group"
              title="Copy full SHA-256 hash"
            >
              <span>{CURRENT_ANALYSIS.fileHash}</span>
              {copiedHash ? (
                <Check className="w-3.5 h-3.5 text-[#3E5C46]" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[#565449] group-hover:text-[#11120D]" />
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons: Download PDF & Share */}
        <div className="grid grid-cols-2 gap-2.5 mb-5 font-sans">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="btn-primary-solid py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#D8CFBC]" />
            <span>{downloading ? 'Exporting...' : 'Download PDF'}</span>
          </button>

          <button
            onClick={() => {
              if (onShare) onShare();
              handleCopyUrl();
            }}
            className="btn-glass-secondary py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#565449]" />
            <span>{copiedUrl ? 'Copied Link' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* QR Code & Public Verification Section - Frosted Glass Surface */}
      <div className="glass-bone p-3.5 rounded-2xl">
        <div className="flex items-center gap-3">
          {/* Stylized QR Code */}
          <div className="w-13 h-13 bg-[#FFFBF4]/90 p-1 rounded-xl border border-[#565449]/15 flex items-center justify-center shrink-0 shadow-2xs backdrop-blur-md">
            <svg viewBox="0 0 24 24" className="w-full h-full text-[#11120D] fill-current">
              <path d="M2 2h7v7H2V2zm2 2v3h3V4H4zm9-2h7v7h-7V2zm2 2v3h3V4h-3zM2 13h7v7H2v-7zm2 2v3h3v-3H4zm13-2h2v2h-2v-2zm-4 0h2v2h-2v-2zm2 4h2v2h-2v-2zm2 2h2v2h-2v-2zm-4 0h2v2h-2v-2zm4-4h2v2h-2v-2zm-2-2h2v2h-2v-2zM4 11h2v2H4v-2zm14 0h2v2h-2v-2zM9 11h2v2H9v-2zm2 2h2v2h-2v-2zm-2 4h2v2H9v-2z"/>
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-xs font-serif font-bold text-[#11120D]">
              Scan to verify
            </div>
            <div className="text-[11px] font-sans text-[#565449] mb-1">
              Public verification link
            </div>
            <button
              onClick={handleCopyUrl}
              className="text-[10px] font-mono text-[#565449] hover:text-[#11120D] truncate flex items-center gap-1 group text-left max-w-full cursor-pointer"
              title={CURRENT_ANALYSIS.publicVerifyUrl}
            >
              <span className="truncate">{CURRENT_ANALYSIS.publicVerifyUrl}</span>
              <Copy className="w-2.5 h-2.5 shrink-0 group-hover:scale-110" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
