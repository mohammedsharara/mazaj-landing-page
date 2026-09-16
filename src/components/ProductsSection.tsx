import React, { useState } from 'react';
import { ProductCategory, ProductItem } from '../types';
import { PRODUCTS } from '../data/content';
import { Sparkles, Info, Camera, ImagePlus } from 'lucide-react';
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
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#FFA000] text-[#0D0D0D] shadow-md shadow-[#FFA000]/25'
                  : 'bg-white dark:bg-[#1A1A1A] text-neutral-600 dark:text-[#A5A5A5] hover:text-neutral-900 dark:hover:text-[#F7F4EF] border border-neutral-200 dark:border-[#2B2B2B]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
