import React from 'react';
import { BRAND } from '../data/content';
import { Flame, Send, MessageCircle } from 'lucide-react';

interface FinalCTAProps {
  onOpenOrderModal: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenOrderModal }) => {
  const customDesignWhatsAppUrl = `https://wa.me/9647741250933?text=${encodeURIComponent(
    'مرحباً مزاج، أود إرسال تصميم خاص لتنفيذه والطباعة عليه. ما هي الخطوات المتاحة؟'
  )}`;

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#0D0D0D] relative overflow-hidden transition-colors duration-300">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#FFA000]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-[#F7F4EF] mb-4 tracking-tight">
          جاهز تسوي قطعتك الخاصة؟
        </h2>

        <p className="text-base sm:text-xl text-neutral-600 dark:text-[#A5A5A5] mb-10 max-w-xl mx-auto leading-relaxed">
          اختر التصميم، اختر القطعة، اختر المقاس… والباقي علينا بكل عناية واحتراف.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="final-order-cta"
            onClick={onOpenOrderModal}
            className="w-full sm:w-auto bg-[#FFA000] hover:bg-[#e68a00] text-[#0D0D0D] font-black text-lg px-9 py-4 rounded-xl transition-all duration-200 shadow-xl shadow-[#FFA000]/25 flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
          >
            <Flame className="w-5 h-5 fill-current" />
            <span>اطلب الآن</span>
          </button>

          <a
            id="final-custom-design-cta"
            href={customDesignWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-neutral-100 dark:bg-[#171717] hover:bg-neutral-200 dark:hover:bg-[#222222] text-neutral-900 dark:text-[#F7F4EF] font-bold text-base px-8 py-4 rounded-xl border border-neutral-200 dark:border-[#2D2D2D] transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Send className="w-4 h-4 rtl:rotate-180" />
            <span>أرسل تصميمك الخاص</span>
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-neutral-600 dark:text-[#A5A5A5]">
          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
          <span>تواصل سريع ومباشر على الواتساب: {BRAND.phoneFormatted}</span>
        </div>
      </div>
    </section>
  );
};
