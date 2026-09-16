import React, { useState } from 'react';
import { Camera, Sparkles, X, Sliders } from 'lucide-react';
import { useSiteImages } from '../hooks/useSiteImages';

interface FloatingImageStudioBtnProps {
  onOpen: () => void;
}

export const FloatingImageStudioBtn: React.FC<FloatingImageStudioBtnProps> = ({ onOpen }) => {
  const { imagesMap } = useSiteImages();
  const [minimized, setMinimized] = useState(false);

  const customizedCount = Object.keys(imagesMap).length;

  if (minimized) {
    return (
      <button
        type="button"
        onClick={() => setMinimized(false)}
        className="fixed bottom-20 md:bottom-6 left-4 z-40 bg-neutral-900/90 text-[#FFA000] p-3 rounded-full border border-[#FFA000]/40 shadow-xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
        title="فتح استوديو ترتيب صور المتجر"
      >
        <Camera className="w-5 h-5" />
        {customizedCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
            {customizedCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <aside
      aria-label="استوديو ترتيب صور المتجر"
      className="fixed bottom-20 md:bottom-6 left-4 z-40 bg-white/95 dark:bg-[#141414]/95 text-neutral-900 dark:text-[#F7F4EF] p-2.5 sm:p-3 rounded-2xl border border-neutral-200 dark:border-[#2D2D2D] shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <button
        type="button"
        onClick={onOpen}
        className="flex items-center gap-2.5 text-xs font-black hover:text-[#FFA000] transition-colors cursor-pointer group"
      >
        <div className="w-8 h-8 rounded-xl bg-[#FFA000] text-[#0D0D0D] flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform">
          <Camera className="w-4 h-4" />
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1.5">
            <span>ترتيب صور المتجر 📸</span>
            {customizedCount > 0 ? (
              <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-1.5 py-0.2 rounded-md">
                {customizedCount} صور مخصصة
              </span>
            ) : (
              <span className="text-[10px] text-[#FFA000] font-bold bg-[#FFA000]/15 px-1.5 py-0.2 rounded-md">
                بضغطة زر
              </span>
            )}
          </div>
          <p className="text-[10px] text-neutral-500 dark:text-[#888888] font-normal">
            غيّر صور التيشيرتات، الخامات، والواجهة بصورك الحقيقية
          </p>
        </div>
      </button>

      <button
        type="button"
        onClick={() => setMinimized(true)}
        className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-[#202020] transition-colors cursor-pointer"
        title="تصغير"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
