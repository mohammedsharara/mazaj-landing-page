import React from 'react';
import { Sparkles, ShieldCheck, Instagram, ExternalLink, Heart, Star, MessageSquareQuote } from 'lucide-react';
import { useSiteImages } from '../hooks/useSiteImages';
import { GALLERY_DEFAULT_ITEMS } from '../utils/imageSlotsRegistry';
import { ImageEditTrigger } from './ImageEditTrigger';
import { BRAND } from '../data/content';

interface RealGallerySectionProps {
  onOpenImageStudio?: (slotKey: string) => void;
  onOpenOrderModal: () => void;
}

export const RealGallerySection: React.FC<RealGallerySectionProps> = ({
  onOpenImageStudio,
  onOpenOrderModal,
}) => {
  const { getImage } = useSiteImages();

  return (
    <section id="real-gallery" className="py-16 sm:py-24 bg-white dark:bg-[#111111] border-t border-b border-neutral-200 dark:border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-[#1A1A1A] border border-amber-200/60 dark:border-[#2B2B2B] text-xs font-bold text-[#D97706] dark:text-[#FFA000] mb-3 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FFA000]" />
            <span>تصوير واقعي وموثوق 100%</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-[#F7F4EF] mb-3">
            معرض الأعمال الحقيقية وآراء الزبائن
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-[#A5A5A5] leading-relaxed mb-6">
            شاهد قطع زبائن مزاج وير بجودتها الطبيعية على أرض الواقع، ودقة طباعة DTF ونقاء الألوان الحقيقي قبل الشحن.
          </p>

          {/* Instagram Highlights Direct Button */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 max-w-full">
            <a
              href={BRAND.instagramHighlightsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer text-center max-w-full"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-xs group-hover:rotate-12 transition-transform shrink-0">
                <Instagram className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="leading-normal">شاهد آراء وتجارب الزبائن في هايلات انستغرام 🌟</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-[-2px] transition-transform shrink-0" />
            </a>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {GALLERY_DEFAULT_ITEMS.map((item, idx) => {
            const currentImg = getImage(item.key, item.defaultImage);

            return (
              <div
                key={item.key}
                className="group relative bg-neutral-100 dark:bg-[#181818] rounded-3xl overflow-hidden border border-neutral-200 dark:border-[#262626] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Container with 4:5 aspect */}
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200 dark:bg-[#141414]">
                  <img
                    src={currentImg}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top-left Quick Edit Trigger */}
                  {onOpenImageStudio && (
                    <div className="absolute top-3 left-3 z-10">
                      <ImageEditTrigger
                        slotKey={item.key}
                        onOpen={onOpenImageStudio}
                        label="تغيير الصورة"
                      />
                    </div>
                  )}

                  {/* Badge Number */}
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-[#0D0D0D]/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-black text-neutral-800 dark:text-[#FFA000] border border-neutral-200 dark:border-[#333333]">
                    عمل حقيقي #{idx + 1}
                  </div>

                  {/* Bottom details on image */}
                  <div className="absolute bottom-4 right-4 left-4 text-white">
                    <h3 className="text-sm font-extrabold mb-1 drop-shadow-sm leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-neutral-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action strip under gallery */}
        <div className="mt-8 sm:mt-10 p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-[#161616] border border-neutral-200 dark:border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-neutral-900 dark:text-[#F7F4EF]">
                تصفّح آراء وتقييمات زبائننا عبر ستوريات الـ Highlight في انستغرام
              </p>
              <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-[#888888]">
                آلاف الصور وتجارب الاستلام الحقيقية موثقة في هايلات الحساب الرسمي.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap justify-center w-full sm:w-auto">
            <a
              href={BRAND.instagramHighlightsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-extrabold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl hover:opacity-95 transition-all cursor-pointer flex-1 sm:flex-initial justify-center"
            >
              <span>فتح الهايلات</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={onOpenOrderModal}
              className="bg-[#FFA000] hover:bg-[#e68a00] text-[#0D0D0D] font-extrabold text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-xl shadow-md shadow-[#FFA000]/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap flex-1 sm:flex-initial justify-center"
            >
              اطلب قطعتك الآن
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
