import React from 'react';
import { BRAND } from '../data/content';
import { ShoppingBag, MessageCircle } from 'lucide-react';

interface MobileStickyBarProps {
  onOpenOrderModal: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenOrderModal }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 dark:bg-[#0D0D0D]/95 backdrop-blur-md border-t border-neutral-200 dark:border-[#262626] p-3 shadow-2xl transition-colors duration-300">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Direct WhatsApp Callout */}
        <a
          href={BRAND.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-neutral-100 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-[#2D2D2D] text-[#25D366] hover:bg-neutral-200 dark:hover:bg-[#252525] transition-colors flex items-center justify-center shrink-0 active:scale-95 shadow-xs"
          aria-label="مراسلة سريعة عبر الواتساب"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        {/* Primary Order Button */}
        <button
          onClick={onOpenOrderModal}
          className="flex-1 bg-[#FFA000] hover:bg-[#e68a00] text-[#0D0D0D] font-black text-sm py-3 px-4 rounded-xl shadow-lg shadow-[#FFA000]/25 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>اطلب الآن — مزاج وير</span>
        </button>
      </div>
    </div>
  );
};
