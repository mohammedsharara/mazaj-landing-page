import React from 'react';
import { PRINTING_STEPS } from '../data/content';
import { Printer, ArrowLeft } from 'lucide-react';
import { useSiteImages } from '../hooks/useSiteImages';
import { PRINTING_DEFAULT_IMAGES } from '../utils/imageSlotsRegistry';
import { ImageEditTrigger } from './ImageEditTrigger';

interface PrintingSectionProps {
  onOpenImageStudio?: (slotKey: string) => void;
}

export const PrintingSection: React.FC<PrintingSectionProps> = ({ onOpenImageStudio }) => {
  const { getImage } = useSiteImages();

  const step1Img = getImage('printing:step-1', PRINTING_DEFAULT_IMAGES['printing:step-1']);
  const step2Img = getImage('printing:step-2', PRINTING_DEFAULT_IMAGES['printing:step-2']);
  const step3Img = getImage('printing:step-3', PRINTING_DEFAULT_IMAGES['printing:step-3']);

  return (
    <section id="printing" className="py-16 sm:py-24 bg-neutral-50/60 dark:bg-[#0D0D0D] border-b border-neutral-200 dark:border-[#1F1F1F] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-[#1A1A1A] border border-amber-200/60 dark:border-[#2B2B2B] text-xs font-bold text-[#D97706] dark:text-[#FFA000] mb-3 shadow-sm">
            <Printer className="w-3.5 h-3.5 text-[#FFA000]" />
            <span>تقنيات الطباعة الرقمية المتطورة</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-[#F7F4EF] mb-3">
            كيف يتحول التصميم إلى قطعة تلبسها؟
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-[#A5A5A5] leading-relaxed max-w-2xl mx-auto">
            نجهز التصميم للطباعة، نطبعه بتقنية DTF المباشرة فائقة الدقة، ثم نثبته حرارياً ونتأكد من فحص المنتج قبل التغليف والتوصيل.
          </p>
        </div>

        {/* Visual Showcase Banner */}
        <div className="mb-14 rounded-2xl overflow-hidden border border-neutral-200 dark:border-[#262626] bg-white dark:bg-[#141414] shadow-sm relative">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="relative aspect-[16/9] md:aspect-auto h-48 md:h-64 overflow-hidden border-b md:border-b-0 md:border-l border-neutral-200 dark:border-[#262626] group">
              <img
                src={step1Img}
                alt="تجهيز وضبط تفاصيل التصميم الرقمي"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {onOpenImageStudio && (
                <div className="absolute top-3 left-3 z-10">
                  <ImageEditTrigger
                    slotKey="printing:step-1"
                    onOpen={onOpenImageStudio}
                    label="تغيير الصورة"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <span className="text-xs font-bold text-white bg-black/75 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  1. معالجة وتجهيز دقيق للملف
                </span>
              </div>
            </div>

            <div className="relative aspect-[16/9] md:aspect-auto h-48 md:h-64 overflow-hidden border-b md:border-b-0 md:border-l border-neutral-200 dark:border-[#262626] group">
              <img
                src={step2Img}
                alt="طباعة فيلم DTF الحديثة عالية الدقة"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {onOpenImageStudio && (
                <div className="absolute top-3 left-3 z-10">
                  <ImageEditTrigger
                    slotKey="printing:step-2"
                    onOpen={onOpenImageStudio}
                    label="تغيير الصورة"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <span className="text-xs font-black text-[#0D0D0D] bg-[#FFA000] px-3 py-1.5 rounded-lg shadow-sm">
                  2. طباعة DTF بأحبار يابانية أصلية
                </span>
              </div>
            </div>

            <div className="relative aspect-[16/9] md:aspect-auto h-48 md:h-64 overflow-hidden group">
              <img
                src={step3Img}
                alt="الكبس الحراري وتثبيت الأحبار في الأقمشة"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {onOpenImageStudio && (
                <div className="absolute top-3 left-3 z-10">
                  <ImageEditTrigger
                    slotKey="printing:step-3"
                    onOpen={onOpenImageStudio}
                    label="تغيير الصورة"
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <span className="text-xs font-bold text-white bg-black/75 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  3. كبس حراري وفحص الجودة
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Step Process (Horizontal on Desktop, Vertical on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 relative">
          {PRINTING_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="bg-white dark:bg-[#141414] rounded-2xl p-5 border border-neutral-200 dark:border-[#262626] relative flex flex-col hover:border-[#FFA000]/60 dark:hover:border-[#FFA000]/50 shadow-sm transition-all duration-300 group"
            >
              {/* Step number */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl lg:text-3xl font-black text-[#FFA000]">
                  {step.number}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-[#2A2A2A] group-hover:bg-[#FFA000] transition-colors" />
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-neutral-900 dark:text-[#F7F4EF] mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-neutral-600 dark:text-[#A5A5A5] leading-relaxed mb-3">
                {step.desc}
              </p>

              {/* Technical Detail */}
              <p className="text-[11px] text-neutral-600 dark:text-[#888888] bg-neutral-50 dark:bg-[#0D0D0D] p-2.5 rounded-xl border border-neutral-200 dark:border-[#202020] mt-auto font-medium">
                {step.detail}
              </p>

              {/* Desktop arrow indicator between steps */}
              {idx < PRINTING_STEPS.length - 1 && (
                <div className="hidden md:block absolute -left-3.5 top-1/2 -translate-y-1/2 z-10 text-neutral-400 dark:text-[#333333]">
                  <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Note on DTF Technology */}
        <div className="mt-8 text-center text-xs text-neutral-600 dark:text-[#A5A5A5] max-w-xl mx-auto">
          نعتمد تقنية <strong className="text-neutral-900 dark:text-[#F7F4EF]">DTF (Direct to Film)</strong> لضمان تشبع لوني عالي ومقاومة ممتازة للغسيل دون تصلب القماش أو فقدان المرونة.
        </div>

      </div>
    </section>
  );
};
