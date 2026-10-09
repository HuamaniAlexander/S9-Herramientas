import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#e5eeff] dark:bg-[#111927] ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Skeleton Pulse before load */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent animate-pulse" />
      )}

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#e5eeff] dark:bg-[#1a2333] text-[#3c494e] dark:text-[#a0aec0]">
          <span className="material-symbols-outlined text-2xl text-[#00677f] dark:text-[#00d2ff] mb-1">
            broken_image
          </span>
          <span className="font-space text-[10px] uppercase tracking-wider font-semibold">
            ByteElement Sensor Teardown
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-all duration-500 ease-out ${
            isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[1.03] blur-sm'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
