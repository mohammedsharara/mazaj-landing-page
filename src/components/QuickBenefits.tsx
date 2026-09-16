import React from 'react';
import { Layers, Sparkles, Palette, Truck } from 'lucide-react';
import { QUICK_BENEFITS } from '../data/content';

export const QuickBenefits: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'fabrics':
        return <Layers className="w-6 h-6 text-[#FFA000]" />;
      case 'printing':
        return <Sparkles className="w-6 h-6 text-[#FFA000]" />;
      case 'custom':
        return <Palette className="w-6 h-6 text-[#FFA000]" />;
      case 'delivery':
        return <Truck className="w-6 h-6 text-[#FFA000]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#FFA000]" />;
    }
  };

  return (
    <section className="bg-neutral-100/70 dark:bg-[#121212] border-y border-neutral-200 dark:border-[#1F1F1F] py-8 sm:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {QUICK_BENEFITS.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#171717] rounded-2xl p-5 border border-neutral-200 dark:border-[#262626] hover:border-[#FFA000]/60 dark:hover:border-[#FFA000]/50 shadow-sm transition-all duration-300 flex items-start gap-4"
            >
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-[#0D0D0D] border border-amber-200/60 dark:border-[#2B2B2B] shrink-0 mt-0.5">
                {getIcon(item.id)}
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-[#F7F4EF] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-[#A5A5A5] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
