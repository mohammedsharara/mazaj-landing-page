import React from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';
import { useSiteImages } from '../hooks/useSiteImages';

interface ImageEditTriggerProps {
  slotKey: string;
  onOpen: (slotKey: string) => void;
  className?: string;
  label?: string;
  variant?: 'floating' | 'compact' | 'badge';
}

export const ImageEditTrigger: React.FC<ImageEditTriggerProps> = ({
  slotKey,
  onOpen,
  className = '',
  label = 'تغيير الصورة',
  variant = 'floating',
}) => {
  const { isCustomized } = useSiteImages();
  const customized = isCustomized(slotKey);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onOpen(slotKey);
  };

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`bg-black/75 hover:bg-[#FFA000] text-white hover:text-[#0D0D0D] p-2 rounded-xl backdrop-blur-md transition-all duration-200 shadow-md cursor-pointer flex items-center gap-1 text-[11px] font-bold ${className}`}
        title="تغيير هذه الصورة بضغطة زر"
      >
        <Camera className="w-3.5 h-3.5" />
        {customized && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`bg-black/80 hover:bg-[#FFA000] text-white hover:text-[#0D0D0D] px-2.5 py-1.5 rounded-xl backdrop-blur-md transition-all duration-200 shadow-lg cursor-pointer flex items-center gap-1.5 text-[11px] font-bold active:scale-95 group/btn ${className}`}
      title="تغيير هذه الصورة بضغطة زر من ألبومك أو عبر رابط"
    >
      <Camera className="w-3.5 h-3.5 text-[#FFA000] group-hover/btn:text-[#0D0D0D] transition-colors" />
      <span className="hidden sm:inline">{label}</span>
      {customized && (
        <span className="inline-flex items-center gap-0.5 text-[9px] bg-emerald-500/30 text-emerald-300 group-hover/btn:text-emerald-950 group-hover/btn:bg-emerald-500/40 px-1.5 py-0.5 rounded-full font-bold">
          <CheckCircle2 className="w-2.5 h-2.5" />
          <span>مخصصة</span>
        </span>
      )}
    </button>
  );
};
