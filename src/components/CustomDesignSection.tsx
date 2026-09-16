import React from 'react';
import { BRAND, DESIGN_NICHES } from '../data/content';
import { Send, Sparkles, Film, Trophy, Music, Gamepad2, Clapperboard, Brush, Crown } from 'lucide-react';

export const CustomDesignSection: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film':
        return <Film className="w-4 h-4 text-[#FFA000]" />;
      case 'Trophy':
        return <Trophy className="w-4 h-4 text-[#FFA000]" />;
      case 'Music':
        return <Music className="w-4 h-4 text-[#FFA000]" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-4 h-4 text-[#FFA000]" />;
      case 'Clapperboard':
        return <Clapperboard className="w-4 h-4 text-[#FFA000]" />;
      case 'Brush':
        return <Brush className="w-4 h-4 text-[#FFA000]" />;
      case 'Crown':
        return <Crown className="w-4 h-4 text-[#FFA000]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#FFA000]" />;
    }
  };

  // Prefilled WhatsApp message for custom design submission
  const customDesignWhatsAppUrl = `https://wa.me/9647741250933?text=${encodeURIComponent(
    'مرحباً مزاج وير، لدي تصميم خاص أود إرساله لمعرفة إمكانية تنفيذه والطباعة على (تيشيرت / هودي / تراك). أرجو تزويدي بالتفاصيل.'
  )}`;

  return (
    <section id="custom-design" className="py-16 sm:py-24 lg:py-28 bg-white dark:bg-[#0D0D0D] border-b border-neutral-200 dark:border-[#1F1F1F] relative overflow-hidden transition-colors duration-300">
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#FFA000_1px,transparent_1px)] [background-size:24px_24px] opacity-15 dark:opacity-10 pointer-events-none max-w-full overflow-hidden" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[600px] h-[250px] sm:h-[350px] bg-[#FFA000]/10 rounded-full blur-3xl pointer-events-none max-w-full overflow-hidden" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Subtle pill */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-[#171717] border border-amber-200/60 dark:border-[#2B2B2B] text-xs font-bold text-[#D97706] dark:text-[#FFA000] mb-5 sm:mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#FFA000] shrink-0" />
          <span>خدمة الطباعة الحرة والمخصصة في العراق</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-[#F7F4EF] mb-4 sm:mb-6 tracking-tight leading-tight">
          عندك تصميم؟ <span className="text-[#FFA000]">خليه علينا.</span>
        </h2>

        {/* Text */}
        <p className="text-sm sm:text-lg lg:text-xl text-neutral-600 dark:text-[#A5A5A5] leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
          أرسل لنا صورة، شخصية، شعار، رسم أو تصميمك الخاص، وسنخبرك بإمكانية تنفيذه والطباعة على القطعة المناسبة بأعلى دقة.
        </p>

        {/* Design Niche Chips */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto mb-8 sm:mb-10">
          {DESIGN_NICHES.map((niche) => (
            <div
              key={niche.name}
              className="flex items-center gap-1.5 sm:gap-2 bg-neutral-50 dark:bg-[#171717] border border-neutral-200 dark:border-[#262626] px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-neutral-800 dark:text-[#F7F4EF]/90 shadow-sm"
            >
              {getCategoryIcon(niche.icon)}
              <span>{niche.name}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
          <a
            id="custom-design-whatsapp-cta"
            href={customDesignWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#FFA000] hover:bg-[#e68a00] text-[#0D0D0D] font-black text-sm sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-200 shadow-xl shadow-[#FFA000]/25 flex items-center justify-center gap-2 active:scale-95 text-center"
          >
            <Send className="w-5 h-5 rtl:rotate-180 shrink-0" />
            <span>أرسل تصميمك عبر الواتساب</span>
          </a>

          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-neutral-100 dark:bg-[#171717] hover:bg-neutral-200 dark:hover:bg-[#222222] text-neutral-900 dark:text-[#F7F4EF] font-bold text-xs sm:text-base px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl border border-neutral-200 dark:border-[#2B2B2B] transition-colors flex items-center justify-center gap-2 shadow-sm text-center"
          >
            <span>أو تواصل عبر إنستغرام @{BRAND.instagramHandle}</span>
          </a>
        </div>

        {/* Assurance footnote */}
        <p className="text-xs text-neutral-500 dark:text-[#888888] mt-6">
          يتم فحص دقة الصورة وأبعادها وتأكيد التفاصيل قبل المباشرة بالطباعة.
        </p>

      </div>
    </section>
  );
};
