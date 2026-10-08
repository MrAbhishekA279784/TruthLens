import React from 'react';

interface TruthLensLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const TruthLensLogo: React.FC<TruthLensLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-9 h-9 rounded-xl',
    lg: 'w-11 h-11 rounded-2xl',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-[22px]',
    lg: 'text-2xl',
  };

  const subSizes = {
    sm: 'text-[8px] tracking-[0.22em]',
    md: 'text-[9.5px] tracking-[0.24em]',
    lg: 'text-[11px] tracking-[0.26em]',
  };

  return (
    <div className={`flex items-center gap-3 shrink-0 select-none ${className}`}>
      {/* Minimalist Forensic Lens Icon */}
      <div
        className={`${iconSizes[size]} bg-[#11120D] text-[#FFFBF4] flex items-center justify-center shrink-0 shadow-xs border border-[#565449]/20 transition-transform`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 stroke-[#FFFBF4]"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3L4.5 6.5V12C4.5 16.5 7.8 20.3 12 21.5C16.2 20.3 19.5 16.5 19.5 12V6.5L12 3Z" />
          <path d="M9.5 12L11.2 13.8L15 9.8" strokeWidth="2" />
        </svg>
      </div>

      {/* Editorial Typographic Lockup */}
      <div className="flex flex-col justify-center min-w-0">
        <span
          className={`font-serif ${titleSizes[size]} font-bold text-[#11120D] tracking-tight leading-none block truncate`}
        >
          TruthLens
        </span>
        {showSubtitle && (
          <span
            className={`font-sans ${subSizes[size]} font-semibold text-[#565449] uppercase mt-1 leading-none block truncate`}
          >
            FORENSICS
          </span>
        )}
      </div>
    </div>
  );
};
