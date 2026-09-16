import React from 'react';
import { QUALITY_PILLARS } from '../data/content';
import { ShieldCheck, Printer, CheckCircle2, Award } from 'lucide-react';

export const QualityGuarantee: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#FFA000]" />;
      case 'Printer':
        return <Printer className="w-6 h-6 text-[#FFA000]" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-[#FFA000]" />;
      case 'Award':
        return <Award className="w-6 h-6 text-[#FFA000]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#FFA000]" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-[#0D0D0D] border-b border-neutral-200 dark:border-[#1F1F1F] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-[#F7F4EF] leading-tight mb-4">
            نحن لا نبيع مجرد طباعة. <br className="hidden sm:inline" />
            نصنع قطعة <span className="text-[#FFA000]">تفخر بارتدائها في كل يوم.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-[#A5A5A5] leading-relaxed max-w-xl mx-auto">
            نركز على تفاصيل الخياطة، متانة القماش، ثبات ألوان الطباعة في الغسيل، وراحة الملمس لتدوم قطعتك أطول فترة ممكنة.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUALITY_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-neutral-50 dark:bg-[#141414] rounded-2xl p-6 border border-neutral-200 dark:border-[#262626] flex flex-col hover:border-[#FFA000]/60 dark:hover:border-[#FFA000]/40 shadow-sm transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-[#1F1F1F] border border-amber-200/60 dark:border-[#2E2E2E] flex items-center justify-center mb-4">
                {getIcon(pillar.icon)}
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-[#F7F4EF] mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-[#A5A5A5] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Disclaimer */}
        <div className="mt-10 p-4 rounded-xl bg-neutral-50 dark:bg-[#141414] border border-neutral-200 dark:border-[#262626] text-center max-w-2xl mx-auto shadow-sm">
          <p className="text-xs text-neutral-500 dark:text-[#888888] leading-relaxed">
            * يشمل الضمان ثبات طباعة الأحبار ومقاومة التقشر عند الالتزام بإرشادات الغسيل بالماء المعتدل والكي من الجهة الخلفية.
          </p>
        </div>

      </div>
    </section>
  );
};
