import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface LogoProps {
  className?: string;
  showText?: boolean;
  showArabic?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'horizontal' | 'vertical' | 'icon-only';
  customTextColor?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showText = true,
  showArabic = true,
  size = 'md',
  variant = 'horizontal',
  customTextColor,
}) => {
  const { theme } = useTheme();

  // Size configurations
  const dimensions = {
    sm: {
      icon: 'w-7 h-7',
      textMain: 'text-sm',
      textSub: 'text-[9px]',
      arabic: 'text-sm',
      vertWidth: 'w-24',
    },
    md: {
      icon: 'w-9 h-9',
      textMain: 'text-base',
      textSub: 'text-[10px]',
      arabic: 'text-base',
      vertWidth: 'w-32',
    },
    lg: {
      icon: 'w-12 h-12',
      textMain: 'text-lg',
      textSub: 'text-[11px]',
      arabic: 'text-lg',
      vertWidth: 'w-40',
    },
    xl: {
      icon: 'w-20 h-20',
      textMain: 'text-2xl',
      textSub: 'text-xs',
      arabic: 'text-2xl',
      vertWidth: 'w-56',
    },
  };

  const currentDim = dimensions[size];
  const isDark = theme === 'dark';
  const brandAmber = '#FFA000'; // Exact signature golden amber from the official logo
  const textColor = customTextColor || (isDark ? 'text-[#F7F4EF]' : 'text-[#0D0D0D]');

  // Vector Monogram (Exact 3-pillar stylized "M" with fluid flame tips)
  const MonogramSVG = (
    <svg
      viewBox="0 0 260 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${currentDim.icon} shrink-0 transition-transform duration-300 hover:scale-105`}
      aria-label="شعار مزاج وير"
    >
      <g fill={brandAmber}>
        {/* Pillar 1 (Left): Round dome top, straight sides, bottom flame flick curving right */}
        <path
          d="M 18 55
             A 20 20 0 0 1 58 55
             V 128
             C 58 138 64 148 84 153
             C 70 158 54 156 42 150
             C 27 142 18 130 18 118
             V 55
             Z"
        />

        {/* Pillar 2 (Center): Flame crest top curving up-right, straight sides, bottom flame flick curving right */}
        <path
          d="M 80 72
             C 80 44 96 18 126 12
             C 124 34 122 56 122 74
             V 146
             C 122 156 128 166 148 171
             C 134 176 118 174 106 168
             C 91 160 80 148 80 136
             Z"
        />

        {/* Pillar 3 (Right): Flame crest top curving up-right, straight sides, round dome bottom */}
        <path
          d="M 144 80
             C 144 52 160 26 190 20
             C 188 42 186 64 186 82
             V 135
             A 20 20 0 0 1 144 135
             Z"
        />
      </g>
    </svg>
  );

  // Vertical layout matching the uploaded logo composition exactly
  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {/* Monogram Icon */}
        <div className="relative flex items-center justify-center mb-2">
          {MonogramSVG}
        </div>

        {/* Wordmark below */}
        {showText && (
          <div className="flex flex-col items-center">
            <span
              className={`font-black tracking-[0.2em] uppercase font-['Plus_Jakarta_Sans',sans-serif] ${currentDim.textMain} ${textColor} transition-colors`}
            >
              MAZAJ WEAR
            </span>
            {showArabic && (
              <span className="text-xs font-bold text-[#FFA000] mt-0.5 tracking-wide">
                مزاج وير • طباعة وستريتوير
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Icon only
  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center ${className}`}>{MonogramSVG}</div>;
  }

  // Default: Horizontal Layout (Ideal for Navbar, Headers, Footer)
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {MonogramSVG}

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-2">
            {showArabic && (
              <span className={`font-black tracking-tight ${currentDim.arabic} ${textColor} transition-colors`}>
                مزاج
              </span>
            )}
            {showArabic && (
              <span className="text-[#FFA000] font-extrabold text-sm select-none opacity-80">|</span>
            )}
            <span
              className={`font-black tracking-wider uppercase font-['Plus_Jakarta_Sans',sans-serif] ${
                size === 'lg' || size === 'xl' ? 'text-lg' : 'text-xs'
              } ${textColor} transition-colors`}
            >
              MAZAJ WEAR
            </span>
          </div>
          <span className="text-[10px] tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold uppercase mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
            Custom Printing & Streetwear
          </span>
        </div>
      )}
    </div>
  );
};
