import React from 'react';
import { ArrowDown, Sparkles, Truck, CheckCircle, Flame } from 'lucide-react';
import { Logo } from './Logo';
import { useSiteImages } from '../hooks/useSiteImages';
import { HERO_DEFAULT_IMAGE } from '../utils/imageSlotsRegistry';
import { ImageEditTrigger } from './ImageEditTrigger';

interface HeroProps {
  onOpenOrderModal: () => void;
  onOpenImageStudio?: (slotKey: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrderModal, onOpenImageStudio }) => {
  const { getImage } = useSiteImages();
  const heroImage = getImage('hero:banner', HERO_DEFAULT_IMAGE);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] md:min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 flex items-center bg-[#FAFAFA] dark:bg-[#0D0D0D] text-neutral-900 dark:text-[#F7F4EF] overflow-hidden transition-colors duration-300"
    >
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-[#FFA000]/10 rounded-full blur-3xl pointer-events-none -z-0 max-w-full overflow-hidden" />
      <div className="absolute bottom-10 left-10 w-60 sm:w-72 h-60 sm:h-72 bg-[#FFA000]/5 rounded-full blur-2xl pointer-events-none -z-0 max-w-full overflow-hidden" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 flex flex-col text-right">
            {/* Top brand badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1A1A1A] border border-neutral-200 dark:border-[#262626] shadow-sm w-fit mb-4 sm:mb-6 text-[11px] sm:text-xs text-neutral-800 dark:text-[#F7F4EF]/90 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-[#FFA000] animate-pulse shrink-0" />
              <span className="font-semibold">براند الطباعة والستريتوير في العراق</span>
              <span className="text-neutral-400 dark:text-[#A5A5A5]">•</span>
              <span className="text-[#FFA000] font-bold font-['Plus_Jakarta_Sans',sans-serif]">MAZAJ WEAR</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-[#F7F4EF] leading-[1.25] tracking-tight mb-4 sm:mb-5">
              فكرتك… <span className="text-[#FFA000]">نطبعها</span> ونحوّلها إلى قطعة تلبسها.
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-lg lg:text-xl text-neutral-600 dark:text-[#A5A5A5] font-normal leading-relaxed mb-6 sm:mb-8 max-w-2xl">
              تيشيرتات، تراكات وهوديات بطباعة احترافية وخامات مختارة بعناية. اختر من تصاميمنا أو أرسل تصميمك الخاص.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <button
                id="hero-order-cta"
                onClick={onOpenOrderModal}
                className="bg-[#FFA000] hover:bg-[#e68a00] text-[#0D0D0D] font-extrabold text-base sm:text-lg px-6 sm:px-8 py-3.5 rounded-xl transition-all duration-200 shadow-xl shadow-[#FFA000]/25 flex items-center justify-center gap-2 active:scale-95 cursor-pointer text-center"
              >
                <Flame className="w-5 h-5 fill-current" />
                <span>اطلب الآن</span>
              </button>

              <button
                id="hero-specs-cta"
                onClick={() => scrollToSection('fabrics')}
                className="bg-white dark:bg-[#1A1A1A] hover:bg-neutral-100 dark:hover:bg-[#262626] text-neutral-800 dark:text-[#F7F4EF] font-bold text-sm sm:text-base px-5 sm:px-6 py-3.5 rounded-xl border border-neutral-300 dark:border-[#333333] transition-colors flex items-center justify-center gap-2 cursor-pointer text-center shadow-sm"
              >
                <span>شاهد الخامات والقياسات</span>
                <ArrowDown className="w-4 h-4 text-neutral-500 dark:text-[#A5A5A5]" />
              </button>
            </div>

            {/* Small Trust Line */}
            <div className="pt-4 border-t border-neutral-200 dark:border-[#1F1F1F] flex flex-wrap items-center gap-y-2 gap-x-3 sm:gap-x-4 text-xs sm:text-sm text-neutral-600 dark:text-[#A5A5A5] font-medium">
              <span className="flex items-center gap-1.5 text-neutral-900 dark:text-[#F7F4EF]/90 font-semibold">
                <Truck className="w-4 h-4 text-[#FFA000] shrink-0" />
                <span>توصيل لكافة المحافظات (4,000 د.ع)</span>
              </span>
              <span className="text-neutral-300 dark:text-[#333333] hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 text-neutral-900 dark:text-[#F7F4EF]/90 font-semibold">
                <Sparkles className="w-4 h-4 text-[#FFA000] shrink-0" />
                <span>طباعة حسب طلبك</span>
              </span>
              <span className="text-neutral-300 dark:text-[#333333] hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 text-neutral-900 dark:text-[#F7F4EF]/90 font-semibold">
                <CheckCircle className="w-4 h-4 text-[#FFA000] shrink-0" />
                <span>مقاسات دقيقة S إلى 5XL</span>
              </span>
            </div>
          </div>

          {/* Photography & Brand Column */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-[#262626] shadow-2xl bg-neutral-100 dark:bg-[#141414] aspect-[4/5] group">
              <img
                src={heroImage}
                alt="شخص يرتدي تيشيرت أوفرسايز مطبوع ستريتوير عالي الجودة من مزاج وير"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              
              {/* Overlay gradient for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Quick Image Edit Trigger for Hero Banner */}
              {onOpenImageStudio && (
                <div className="absolute top-4 left-4 z-20">
                  <ImageEditTrigger
                    slotKey="hero:banner"
                    onOpen={onOpenImageStudio}
                    label="تغيير صورة الواجهة"
                  />
                </div>
              )}

              {/* Floating official logo watermark badge */}
              <div className="absolute top-4 right-4 bg-white/95 dark:bg-[#0D0D0D]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-[#333333] shadow-lg flex items-center gap-2">
                <Logo size="sm" showArabic={false} showText={false} />
                <span className="text-xs font-extrabold text-neutral-900 dark:text-[#F7F4EF] font-['Plus_Jakarta_Sans',sans-serif]">
                  MAZAJ WEAR
                </span>
              </div>

              {/* Bottom Card Specs */}
              <div className="absolute bottom-4 right-4 left-4 p-3.5 bg-black/80 dark:bg-[#0D0D0D]/90 backdrop-blur-md rounded-xl border border-white/10 dark:border-[#262626]">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs text-neutral-300">ستريتوير وطباعة مخصصة في العراق</p>
                    <p className="text-sm font-bold text-white">ثبات ألوان القماش ودقة طباعة DTF HD</p>
                  </div>
                  <span className="text-xs bg-[#FFA000] text-[#0D0D0D] px-2.5 py-1 rounded-lg font-black shadow-sm">
                    DTF HD
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
