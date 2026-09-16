import React from 'react';
import { FABRICS } from '../data/content';
import { Sparkles, Check } from 'lucide-react';
import { useSiteImages } from '../hooks/useSiteImages';
import { ImageEditTrigger } from './ImageEditTrigger';

interface FabricsSectionProps {
  onOpenImageStudio?: (slotKey: string) => void;
}

export const FabricsSection: React.FC<FabricsSectionProps> = ({ onOpenImageStudio }) => {
  const { getImage } = useSiteImages();

  return (
    <section id="fabrics" className="py-16 sm:py-24 bg-white dark:bg-[#121212] border-b border-neutral-200 dark:border-[#1F1F1F] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-[#1A1A1A] border border-amber-200/60 dark:border-[#2B2B2B] text-xs font-bold text-[#D97706] dark:text-[#FFA000] mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FFA000]" />
            <span>معايير النسيج والجودة</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-[#F7F4EF] mb-3">
            الخامة تصنع الفرق
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-[#A5A5A5] leading-relaxed">
            القطعة الممتازة تبدأ من النسيج. ننتقي أفضل خامات القطن والجيرسي لضمان راحة الملبس ودوام جودة الطباعة.
          </p>
        </div>

        {/* Fabrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {FABRICS.map((fabric) => {
            const fabricImage = getImage(`fabric:${fabric.id}`, fabric.image);

            return (
              <div
                key={fabric.id}
                className="bg-neutral-50 dark:bg-[#171717] rounded-2xl border border-neutral-200 dark:border-[#262626] overflow-hidden flex flex-col hover:border-[#FFA000]/60 dark:hover:border-[#FFA000]/50 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                {/* Close-up Fabric Photography */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200 dark:bg-[#0D0D0D]">
                  <img
                    src={fabricImage}
                    alt={`صورة قريبة لتفاصيل خامة ${fabric.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                  {/* Quick Edit Trigger */}
                  {onOpenImageStudio && (
                    <div className="absolute top-3 left-3 z-10">
                      <ImageEditTrigger
                        slotKey={`fabric:${fabric.id}`}
                        onOpen={onOpenImageStudio}
                        label="تغيير الصورة"
                      />
                    </div>
                  )}
                  
                  {/* GSM Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 dark:bg-[#0D0D0D]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-neutral-200 dark:border-[#333333] text-xs font-black text-[#FFA000] shadow-sm">
                    {fabric.gsm ? fabric.gsm : 'مواصفات مخصصة'}
                  </div>
                </div>

              {/* Fabric Specs */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-[#F7F4EF] mb-2">
                  {fabric.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-[#A5A5A5] mb-5 leading-relaxed">
                  {fabric.summary}
                </p>

                <div className="space-y-3.5 mt-auto pt-4 border-t border-neutral-200 dark:border-[#262626] text-xs">
                  <div>
                    <span className="text-neutral-500 dark:text-[#A5A5A5] block font-semibold mb-1">الملمس والشعور:</span>
                    <p className="text-neutral-800 dark:text-[#F7F4EF] bg-white dark:bg-[#1F1F1F] p-2.5 rounded-xl border border-neutral-200 dark:border-[#2A2A2A] font-medium">
                      {fabric.feel}
                    </p>
                  </div>

                  <div>
                    <span className="text-neutral-500 dark:text-[#A5A5A5] block font-semibold mb-1">أفضل استخدام:</span>
                    <p className="text-neutral-800 dark:text-[#F7F4EF] bg-white dark:bg-[#1F1F1F] p-2.5 rounded-xl border border-neutral-200 dark:border-[#2A2A2A] font-medium">
                      {fabric.bestUse}
                    </p>
                  </div>

                  <div>
                    <span className="text-neutral-500 dark:text-[#A5A5A5] block font-semibold mb-1">القَصّة المناسبة:</span>
                    <div className="flex items-center gap-1.5 text-[#D97706] dark:text-[#FFA000] font-bold bg-white dark:bg-[#1F1F1F] p-2.5 rounded-xl border border-neutral-200 dark:border-[#2A2A2A]">
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      <span>{fabric.suitableFit}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            );
          })}
        </div>

        {/* Fabric Assurance */}
        <div className="mt-10 p-4 rounded-xl bg-neutral-50 dark:bg-[#171717] border border-neutral-200 dark:border-[#262626] max-w-3xl mx-auto text-center shadow-sm">
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-[#A5A5A5]">
            <span className="text-neutral-900 dark:text-[#F7F4EF] font-bold">ملاحظة الخامات:</span> يتم فحص كل لفة قماش والتأكد من انكماش ما بعد الغسيل وثبات الصبغة قبل إدخالها خطوط الإنتاج والطباعة.
          </p>
        </div>

      </div>
    </section>
  );
};
