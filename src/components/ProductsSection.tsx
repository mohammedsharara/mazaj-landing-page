import React, { useState } from 'react';
import { ProductCategory, ProductItem } from '../types';
import { PRODUCTS } from '../data/content';
import { Sparkles, Info, Camera, ImagePlus, AlertCircle, Gift, Truck, Shuffle, Lock } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { ImageUploadModal } from './ImageUploadModal';

interface ProductsSectionProps {
  onSelectProductForOrder: (product: ProductItem) => void;
  onOpenImageStudio?: (slotKey: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  onSelectProductForOrder,
  onOpenImageStudio,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [isLocalModalOpen, setIsLocalModalOpen] = useState(false);
  const [localSlotKey, setLocalSlotKey] = useState<string | null>(null);

  const categories = [
    { key: 'all', label: 'الكل (جميع المنتجات)' },
    { key: 'tshirts', label: 'التيشيرتات' },
    { key: 'makhoot', label: 'خامة المكحوت (230g)' },
    { key: 'gym', label: 'ملابس الجم والرياضة' },
    { key: 'hoodies', label: 'الهوديات الشتوية' },
  ];

  const handleOpenImage = (product?: ProductItem | null, color?: string | null) => {
    let slotKey = 'hero:banner';
    if (product) {
      slotKey = color ? `product:${product.id}:${color}` : `product:${product.id}`;
    }

    if (onOpenImageStudio) {
      onOpenImageStudio(slotKey);
    } else {
      setLocalSlotKey(slotKey);
      setIsLocalModalOpen(true);
    }
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    return true;
  });

  return (
    <section id="products" className="py-16 sm:py-24 bg-neutral-50/50 dark:bg-[#0D0D0D] border-b border-neutral-200 dark:border-[#1F1F1F] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-[#1A1A1A] border border-amber-200/60 dark:border-[#2B2B2B] text-xs font-bold text-[#D97706] dark:text-[#FFA000] mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FFA000]" />
            <span>تشكيلة مزاج وير المعتمدة</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-[#F7F4EF] mb-3">
            اختر قطعتك وخامتك المفضلة
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-[#A5A5A5] mb-4">
            تيشيرتات قطن وتيتيريو، خامة المكحوت 230g، ملابس الجم المتخصصة، وهوديات شتوية مبطنة صوف بضمان يصل لـ 3 سنوات.
          </p>

          {/* Quick Action to Manage Photos */}
          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleOpenImage(null, null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#181818] border border-neutral-200 dark:border-[#2A2A2A] hover:border-[#FFA000] dark:hover:border-[#FFA000] text-xs font-black text-neutral-800 dark:text-[#F7F4EF] hover:text-[#FFA000] transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <ImagePlus className="w-4 h-4 text-[#FFA000]" />
              <span>إدارة وتغيير صور المنتجات 📸</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center sm:justify-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none max-w-full px-1">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key as any)}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                activeCategory === cat.key
                  ? 'bg-[#FFA000] text-[#0D0D0D] shadow-md shadow-[#FFA000]/25'
                  : 'bg-white dark:bg-[#1A1A1A] text-neutral-600 dark:text-[#A5A5A5] hover:text-neutral-900 dark:hover:text-[#F7F4EF] border border-neutral-200 dark:border-[#2B2B2B]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Hoodies Notice Banner ─────────────────────────────────────────── */}
        {activeCategory === 'hoodies' && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-amber-300/40 dark:border-[#FFA000]/20 shadow-lg shadow-amber-500/5">
            {/* Header strip */}
            <div className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-amber-500 to-[#FF6B00] text-[#0D0D0D]">
              <Lock className="w-4 h-4 shrink-0" />
              <span className="font-black text-sm tracking-wide">الهوديات الشتوية — خيارات الطلب</span>
            </div>

            <div className="bg-amber-50/80 dark:bg-[#141200] px-5 py-5 space-y-5">

              {/* Unavailable notice */}
              <div className="flex items-start gap-3 bg-red-50 dark:bg-[#1A0A0A] border border-red-200/60 dark:border-red-800/40 rounded-xl px-4 py-3.5">
                <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-black text-sm text-red-700 dark:text-red-400 mb-0.5">🚫 الهوديات غير متوفرة حالياً</p>
                  <p className="text-xs text-red-600/80 dark:text-red-500/80 leading-relaxed">
                    الطلب على الهوديات الشتوية (بتصميمك الخاص) غير متاح في الوقت الحالي. تابعونا لمعرفة موعد إعادة الفتح.
                  </p>
                </div>
              </div>

              {/* Available offer */}
              <div className="flex items-start gap-3 bg-emerald-50 dark:bg-[#081A0E] border border-emerald-200/60 dark:border-emerald-800/40 rounded-xl px-4 py-3.5">
                <Gift className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-black text-sm text-emerald-800 dark:text-emerald-300 mb-0.5">✅ المتاح حالياً — عرض 3 هوديات بتصاميم عشوائية</p>
                  <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80 leading-relaxed mb-3">
                    نوفر <span className="font-black">3 هوديات شتوية</span> بتصاميم عشوائية من اختيارنا حصراً، بخامة قطن مبطن صوف فاخر وضمان 3 سنوات — والقياس من اختيارك أنت.
                  </p>

                  {/* Offer details chips */}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-black px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-700/50">
                      <Shuffle className="w-3 h-3" />
                      3 تصاميم عشوائية — من اختيارنا حصراً
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-[#FFA000] text-xs font-black px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-700/40">
                      <Gift className="w-3 h-3" />
                      السعر: 45,000 د.ع شامل التوصيل
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-black px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-700/40">
                      <Truck className="w-3 h-3" />
                      توصيل مجاني 🚀
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                href="https://wa.me/9647733300533"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#FF6B00] hover:from-amber-400 hover:to-[#FF5500] text-[#0D0D0D] font-black text-sm shadow-md shadow-amber-500/20 transition-all active:scale-95 hover:shadow-lg hover:shadow-amber-500/30"
              >
                <Gift className="w-4 h-4" />
                اطلب العرض — 3 هوديات عشوائية بـ 45,000 د.ع شامل التوصيل
              </a>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProductForOrder={onSelectProductForOrder}
              onOpenImageModal={handleOpenImage}
            />
          ))}
        </div>

        {/* Small Notice */}
        <div className="mt-10 text-center">
          <p className="text-xs text-neutral-600 dark:text-[#A5A5A5] inline-flex items-center gap-1.5 bg-white dark:bg-[#141414] px-5 py-2.5 rounded-full border border-neutral-200 dark:border-[#222222] shadow-sm">
            <Info className="w-4 h-4 text-[#FFA000]" />
            <span>نطبع أي تصميم من اختيارك (أنمي، رياضة، سينما، شعارات وبراندات خاصة) بأعلى دقة وتقنية DTF المباشرة.</span>
          </p>
        </div>

        {/* Local Fallback Image Studio Modal if not hoisted */}
        {!onOpenImageStudio && (
          <ImageUploadModal
            isOpen={isLocalModalOpen}
            onClose={() => setIsLocalModalOpen(false)}
            initialSlotKey={localSlotKey}
          />
        )}

      </div>
    </section>
  );
};
