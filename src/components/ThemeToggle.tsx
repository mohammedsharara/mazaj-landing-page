import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  showLabel = true,
  className = '',
  size = 'md',
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center gap-2 rounded-xl transition-all duration-300 font-bold select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFA000]/50 ${
        isDark
          ? 'bg-[#1C1C1C] hover:bg-[#282828] text-[#FFA000] border border-[#333333]'
          : 'bg-white hover:bg-neutral-100 text-[#D97706] border border-neutral-200 shadow-sm'
      } ${size === 'sm' ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2 text-xs md:text-sm'} ${className}`}
      aria-label={isDark ? 'التحويل إلى الوضع النهاري' : 'التحويل إلى الوضع الليلي'}
      title={isDark ? 'التحويل إلى الوضع النهاري (Light Mode)' : 'التحويل إلى الوضع الليلي (Dark Mode)'}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 text-[#FFA000] animate-in fade-in zoom-in duration-200" />
        ) : (
          <Sun className="w-4 h-4 text-[#FFA000] animate-in fade-in zoom-in duration-200" />
        )}
      </div>

      {showLabel && (
        <span className="font-semibold whitespace-nowrap">
          {isDark ? 'الوضع الليلي' : 'الوضع النهاري'}
        </span>
      )}

      {/* Subtle indicator pill */}
      <span
        className={`w-2 h-2 rounded-full ${
          isDark ? 'bg-[#FFA000] shadow-[0_0_8px_#FFA000]' : 'bg-amber-500'
        }`}
      />
    </button>
  );
};
