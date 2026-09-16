import React, { useState } from 'react';
import { FAQS } from '../data/content';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-neutral-50/50 dark:bg-[#0D0D0D] border-b border-neutral-200 dark:border-[#1F1F1F] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-[#1A1A1A] border border-amber-200/60 dark:border-[#2B2B2B] text-xs font-bold text-[#D97706] dark:text-[#FFA000] mb-3 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#FFA000]" />
            <span>إجابات سريعة وواضحة</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-[#F7F4EF] mb-3">
            الأسئلة الشائعة
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-[#A5A5A5]">
            كل ما يهمك معرفته حول المقاسات، الخامات، التوصيل في العراق والطباعة الرقمية.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3.5">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-[#141414] border border-neutral-200 dark:border-[#262626] rounded-2xl overflow-hidden shadow-sm transition-colors hover:border-[#FFA000]/50"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full py-4 px-5 text-right flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FFA000]/50"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-neutral-900 dark:text-[#F7F4EF] text-right">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D97706] dark:text-[#FFA000] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-neutral-600 dark:text-[#A5A5A5] leading-relaxed border-t border-neutral-100 dark:border-[#1F1F1F]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
