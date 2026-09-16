import React from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { BRAND } from '../data/content';
import { Instagram, MessageCircle, Truck, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-100 dark:bg-[#080808] border-t border-neutral-200 dark:border-[#1C1C1C] py-12 text-neutral-600 dark:text-[#A5A5A5] text-xs sm:text-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-200 dark:border-[#1A1A1A]">
          
          {/* Logo & Descriptor */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <Logo size="md" />
            <p className="text-xs text-neutral-500 dark:text-[#777777] mt-2 max-w-sm">
              براند ملابس ستريتوير عراقي متخصص بالطباعة المخصصة، خامات مختارة بعناية ودقة عالية في تفاصيل التصميم والتنفيذ.
            </p>
          </div>

          {/* Delivery & Iraq Badge */}
          <div className="flex items-center gap-2 bg-white dark:bg-[#121212] px-4 py-2 rounded-xl border border-neutral-200 dark:border-[#222222] shadow-sm">
            <Truck className="w-4 h-4 text-[#FFA000]" />
            <span className="text-neutral-900 dark:text-[#F7F4EF] font-bold">{BRAND.deliveryText}</span>
          </div>

          {/* Social Links & Theme Switcher */}
          <div className="flex items-center gap-3">
            <ThemeToggle size="sm" showLabel={true} />

            <a
              href={BRAND.instagramHighlightsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 p-2 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-neutral-800 dark:text-[#F7F4EF] hover:text-[#FFA000] border border-pink-500/30 transition-colors shadow-sm"
              title="آراء وتجارب الزبائن على انستغرام"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
              <span className="text-xs font-bold">آراء الزبائن 🌟</span>
            </a>

            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 p-2 rounded-xl bg-white dark:bg-[#141414] hover:bg-neutral-100 dark:hover:bg-[#1F1F1F] text-neutral-800 dark:text-[#F7F4EF] hover:text-[#FFA000] border border-neutral-200 dark:border-[#262626] transition-colors shadow-sm"
              aria-label="إنستغرام مزاج وير"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs">@{BRAND.instagramHandle}</span>
            </a>

            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 p-2 rounded-xl bg-white dark:bg-[#141414] hover:bg-neutral-100 dark:hover:bg-[#1F1F1F] text-neutral-800 dark:text-[#F7F4EF] hover:text-[#25D366] border border-neutral-200 dark:border-[#262626] transition-colors shadow-sm"
              aria-label="واتساب مزاج وير"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs dir-ltr">{BRAND.phoneFormatted}</span>
            </a>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-[#666666]">
          <p>© {new Date().getFullYear()} MAZAJ WEAR. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#FFA000]" />
            <span>العراق — خدمة الطباعة والتوصيل المباشر</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
