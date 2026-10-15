import React, { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '16:9' | '4:3' | '3:4' | '1:1' | 'auto';
  fallbackLabel?: string;
  priority?: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'auto',
  fallbackLabel,
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);

  const aspectClass =
    aspectRatio === '16:9'
      ? 'aspect-video'
      : aspectRatio === '4:3'
      ? 'aspect-[4/3]'
      : aspectRatio === '3:4'
      ? 'aspect-[3/4]'
      : aspectRatio === '1:1'
      ? 'aspect-square'
      : '';

  if (hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden bg-[#151515] border border-white/10 flex flex-col items-center justify-center p-6 text-center ${aspectClass} ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#E10600]/25 via-[#0c0c0c] to-[#181818]" />
        <div className="absolute inset-0 bg-speed-grid opacity-40" />
        <div className="relative z-10 flex flex-col items-center">
          <svg
            className="w-10 h-10 text-[#E10600] mb-2 opacity-85"
            viewBox="0 0 64 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 22L14 14H36L46 10L60 18V22H52C52 19.5 50 17.5 47.5 17.5C45 17.5 43 19.5 43 22H23C23 19.5 21 17.5 18.5 17.5C16 17.5 14 19.5 14 22H4Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="18.5" cy="22" r="4.5" stroke="#F5F5F0" strokeWidth="2" />
            <circle cx="47.5" cy="22" r="4.5" stroke="#F5F5F0" strokeWidth="2" />
          </svg>
          <span className="text-[11px] font-mono-tabular text-[#F5F5F0] tracking-wider uppercase max-w-[220px] font-semibold truncate">
            {fallbackLabel || alt}
          </span>
          <span className="text-[9px] font-mono-tabular text-[#B8B8B8] mt-0.5 tracking-widest uppercase">
            APEX TECHNICAL ARCHIVE
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#151515] ${aspectClass} ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-200 ease-out"
      />
    </div>
  );
};
