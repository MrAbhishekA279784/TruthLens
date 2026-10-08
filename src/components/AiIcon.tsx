import React from 'react';

interface AiIconProps {
  className?: string;
}

/**
 * Refined intelligence symbol matching the reference showcase:
 * 4-pointed harmonic diamond spark with precision plus marker (✦⁺).
 */
export const AiIcon: React.FC<AiIconProps> = ({ className = 'w-4 h-4' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* 4-point harmonic intelligence spark */}
      <path d="M11 2.8C11 7 7 11 2.8 11C7 11 11 15 11 19.2C11 15 15 11 19.2 11C15 11 11 7 11 2.8Z" />
      {/* Plus symbol at top right */}
      <path d="M19.5 3.5V7.5" strokeWidth="1.5" />
      <path d="M17.5 5.5H21.5" strokeWidth="1.5" />
    </svg>
  );
};
