import React from 'react';
import { ORDER_STEPS } from '../data/content';
import { ShoppingCart, ArrowLeft, Send } from 'lucide-react';

interface HowToOrderProps {
  onOpenOrderModal: () => void;
}

export const HowToOrderSection: React.FC<HowToOrderProps> = ({ onOpenOrderModal }) => {
  return (
    <section id="how-to-order" className="py-16 sm:py-24 bg-neutral-50/70 dark:bg-[#121212] border-b border-neutral-200 dark:border-[#1F1F1F] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-[#1A1A1A] border border-amber-200/60 dark:border-[#2B2B2B] text-xs font-bold text-[#D97706] dark:text-[#FFA000] mb-3 shadow-sm">
            <ShoppingCart className="w-3.5 h-3.5 text-[#FFA000]" />
            <span>خطوات بسيطة وسريعة</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-[#F7F4EF] mb-3">
            كيف تطلب من مزاج وير؟
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-[#A5A5A5]">
            بدون تعقيدات، خطوات مباشرة من اختيار القطعة حتى وصولها إلى باب بيتك في العراق.
          </p>
        </div>

        {/* 5-Step Order Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-5 mb-12">
          {ORDER_STEPS.map((item, idx) => (
            <div
              key={item.step}
              className="bg-white dark:bg-[#171717] rounded-2xl p-5 border border-neutral-200 dark:border-[#262626] flex flex-col relative hover:border-[#FFA000]/60 dark:hover:border-[#FFA000]/50 shadow-sm transition-all duration-300"
            >
              {/* Step indicator */}
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-[#FFA000]/15 text-[#D97706] dark:text-[#FFA000] font-black font-['Plus_Jakarta_Sans',sans-serif] text-base flex items-center justify-center mb-4 border border-amber-200 dark:border-[#FFA000]/30 shadow-xs">
                {item.step}
              </div>

              <h3 className="text-base font-bold text-neutral-900 dark:text-[#F7F4EF] mb-2">
                {item.title}
              </h3>

              <p className="text-xs text-neutral-600 dark:text-[#A5A5A5] leading-relaxed">
                {item.desc}
              </p>

              {idx < ORDER_STEPS.length - 1 && (
                <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 text-neutral-300 dark:text-[#333333] z-10">
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={onOpenOrderModal}
            className="bg-[#FFA000] hover:bg-[#e68a00] text-[#0D0D0D] font-black text-base sm:text-lg px-10 py-4 rounded-xl transition-all duration-200 shadow-xl shadow-[#FFA000]/25 inline-flex items-center gap-2.5 active:scale-95 cursor-pointer"
          >
            <Send className="w-5 h-5 rtl:rotate-180" />
            <span>ابدأ طلبك الآن</span>
          </button>
        </div>

      </div>
    </section>
  );
};
