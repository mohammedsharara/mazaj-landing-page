import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { BRAND } from '../data/content';
import { Menu, X, MessageCircle, Camera } from 'lucide-react';

interface NavbarProps {
  onOpenOrderModal: () => void;
  onOpenImageStudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal, onOpenImageStudio }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'المنتجات', href: '#products' },
    { label: 'أعمالنا الحقيقية', href: '#real-gallery' },
    { label: 'الخامات', href: '#fabrics' },
    { label: 'الطباعة', href: '#printing' },
    { label: 'تصميمك الخاص', href: '#custom-design' },
    { label: 'القياس والقالب', href: '#sizes' },
    { label: 'الأسئلة الشائعة', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#0D0D0D]/95 backdrop-blur-md border-b border-neutral-200 dark:border-[#262626] py-3 shadow-sm dark:shadow-2xl'
          : 'bg-white/80 dark:bg-[#0D0D0D]/80 backdrop-blur-sm border-b border-neutral-200/50 dark:border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="focus:outline-none focus:ring-2 focus:ring-[#FFA000] rounded-lg"
          aria-label="مزاج وير - الصفحة الرئيسية"
        >
          <Logo size="md" />
        </a>

        {/* Desktop Navigation Anchors */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-neutral-700 dark:text-[#F7F4EF]/85">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="hover:text-[#FFA000] dark:hover:text-[#FFA000] transition-colors py-1 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons & Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Image Studio Trigger */}
          {onOpenImageStudio && (
            <button
              type="button"
              onClick={onOpenImageStudio}
              className="inline-flex items-center gap-1.5 text-xs font-black bg-neutral-100 dark:bg-[#1C1C1C] hover:bg-[#FFA000] hover:text-[#0D0D0D] text-neutral-800 dark:text-[#EAEAEA] px-2.5 sm:px-3 py-2 rounded-xl border border-neutral-200 dark:border-[#2D2D2D] transition-all cursor-pointer shadow-xs active:scale-95"
              title="ترتيب وتغيير صور الموقع"
            >
              <Camera className="w-3.5 h-3.5 text-[#FFA000] group-hover:text-[#0D0D0D]" />
              <span className="hidden sm:inline">صور المتجر</span>
            </button>
          )}

          {/* Night / Light Mode Toggle */}
          <ThemeToggle size="sm" showLabel={false} className="hidden sm:inline-flex" />

          {/* Direct WhatsApp link (desktop only) */}
          <a
            href={BRAND.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-flex items-center gap-1.5 text-xs text-neutral-600 dark:text-[#A5A5A5] hover:text-[#111827] dark:hover:text-[#F7F4EF] transition-colors px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-[#262626] hover:border-[#FFA000]/50"
            title="تواصل مباشر عبر الواتساب"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span className="font-['Plus_Jakarta_Sans',sans-serif] dir-ltr">{BRAND.phoneRaw}</span>
          </a>

          {/* Primary CTA */}
          <button
            id="header-cta-button"
            onClick={onOpenOrderModal}
            className="bg-[#FFA000] hover:bg-[#e68a00] text-[#0D0D0D] font-extrabold text-sm sm:text-base px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-[#FFA000]/25 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            اطلب الآن
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-800 dark:text-[#F7F4EF] hover:text-[#FFA000] dark:hover:text-[#FFA000] transition-colors rounded-lg focus:outline-none"
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0D0D0D] border-b border-neutral-200 dark:border-[#262626] px-5 py-4 transition-all shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Quick theme toggle row in mobile drawer */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-[#1E1E1E]">
            <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
              مظهر الموقع:
            </span>
            <ThemeToggle size="sm" showLabel={true} />
          </div>

          <nav className="flex flex-col space-y-2.5 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-neutral-800 dark:text-[#F7F4EF] hover:text-[#FFA000] dark:hover:text-[#FFA000] font-semibold text-base py-1.5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-neutral-400 text-xs">←</span>
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            {onOpenImageStudio && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenImageStudio();
                }}
                className="w-full bg-neutral-100 dark:bg-[#1A1A1A] hover:bg-[#FFA000] hover:text-[#0D0D0D] text-neutral-800 dark:text-[#F7F4EF] font-extrabold py-2.5 rounded-xl text-center border border-neutral-200 dark:border-[#2B2B2B] flex items-center justify-center gap-2 text-xs"
              >
                <Camera className="w-4 h-4 text-[#FFA000]" />
                <span>استوديو تنظيم صور المتجر 📸</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full bg-[#FFA000] text-[#0D0D0D] font-extrabold py-3 rounded-xl text-center shadow-md shadow-[#FFA000]/20"
            >
              اطلب الآن
            </button>
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 text-neutral-800 dark:text-[#F7F4EF] bg-neutral-100 dark:bg-[#1A1A1A] py-2.5 rounded-xl text-sm border border-neutral-200 dark:border-[#262626]"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>تواصل واتساب: {BRAND.phoneFormatted}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
