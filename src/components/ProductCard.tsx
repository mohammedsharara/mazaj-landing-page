import React, { useState } from 'react';
import { ProductItem } from '../types';
import { ShoppingBag, ShieldCheck, Info, Camera } from 'lucide-react';
import { useProductCustomImages } from '../hooks/useProductCustomImages';

interface ProductCardProps {
  product: ProductItem;
  onSelectProductForOrder: (product: ProductItem) => void;
  onOpenImageModal?: (product: ProductItem, color?: string | null) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProductForOrder,
  onOpenImageModal,
}) => {
  const { getProductImage, hasCustomOverride } = useProductCustomImages();

  // Allow user to click color swatch to preview the actual color photo (for example Makhoot colors)
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  const displayImage = getProductImage(product, selectedColor);
  const isCustomImage = hasCustomOverride(product.id, selectedColor);

  return (
    <div className="bg-white dark:bg-[#141414] rounded-3xl border border-neutral-200 dark:border-[#262626] overflow-hidden flex flex-col group hover:border-[#FFA000]/60 dark:hover:border-[#FFA000]/50 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Product Image Container */}
      <div className="relative aspect-[4/4.2] overflow-hidden bg-neutral-100 dark:bg-[#1A1A1A]">
        <img
          src={displayImage}
          alt={`${product.name} - ${selectedColor || ''}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Badge Tag */}
        {product.tag && (
          <span className="absolute top-3 right-3 bg-[#FFA000] text-[#0D0D0D] font-black text-[11px] px-2.5 py-1 rounded-lg shadow-md">
            {product.tag}
          </span>
        )}

        {/* Warranty Badge if applicable */}
        {product.warranty && (
          <span className="absolute top-3 left-3 bg-emerald-600 text-white font-black text-[10px] px-2 py-1 rounded-lg shadow-md flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>ضمان 3 سنوات</span>
          </span>
        )}

        {/* Quick Camera Change Button */}
        {onOpenImageModal && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenImageModal(product, selectedColor);
            }}
            className={`absolute ${
              product.warranty ? 'top-11 left-3' : 'top-3 left-3'
            } bg-black/75 hover:bg-[#FFA000] text-white hover:text-[#0D0D0D] p-2 rounded-xl backdrop-blur-md transition-all duration-200 shadow-lg cursor-pointer flex items-center gap-1.5 text-[11px] font-bold opacity-90 sm:opacity-75 group-hover:opacity-100`}
            title="تغيير أو رفع صورة جديدة لهذا المنتج"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">تغيير الصورة</span>
            {isCustomImage && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            )}
          </button>
        )}

        {/* Category label */}
        <span className="absolute bottom-3 right-3 bg-white/95 dark:bg-[#0D0D0D]/90 backdrop-blur-sm text-neutral-800 dark:text-[#F7F4EF] text-[11px] px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-[#2D2D2D] font-bold">
          {product.categoryName}
        </span>

        {/* Current preview color badge if multiple color images exist */}
        {product.colorImages && selectedColor && (
          <span className="absolute bottom-3 left-3 bg-black/75 text-[#FFA000] text-[10px] font-black px-2 py-0.5 rounded-md backdrop-blur-xs border border-white/10">
            {selectedColor}
          </span>
        )}
      </div>

      {/* Product Details Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-[#F7F4EF] leading-snug mb-2">
          {product.name}
        </h3>

        <p className="text-xs text-neutral-600 dark:text-[#A5A5A5] mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Specifications List */}
        <div className="space-y-2 mb-4 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-neutral-100 dark:border-[#202020]">
            <span className="text-neutral-500 dark:text-[#888888]">الخامة:</span>
            <span className="text-neutral-800 dark:text-[#F7F4EF] font-semibold">{product.fabric}</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-neutral-100 dark:border-[#202020]">
            <span className="text-neutral-500 dark:text-[#888888]">القَصّة:</span>
            <span className="text-neutral-800 dark:text-[#F7F4EF] font-semibold">{product.fit}</span>
          </div>

          {/* Colors if available - interactive switcher when colorImages available */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center justify-between py-1 border-b border-neutral-100 dark:border-[#202020]">
              <span className="text-neutral-500 dark:text-[#888888]">الألوان:</span>
              <div className="flex items-center gap-1 flex-wrap justify-end">
                {product.colors.map((c) => {
                  const hasCustomImage = product.colorImages && product.colorImages[c];
                  const isSelected = selectedColor === c;
                  return (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FFA000] text-[#0D0D0D] shadow-xs'
                          : 'bg-neutral-100 dark:bg-[#222222] text-neutral-700 dark:text-[#CCCCCC] hover:border-neutral-400'
                      } ${hasCustomImage ? 'ring-1 ring-inset ring-amber-400/40' : ''}`}
                      title={hasCustomImage ? `معاينة صورة اللون: ${c}` : c}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sizes */}
          <div className="flex items-center justify-between py-1">
            <span className="text-neutral-500 dark:text-[#888888]">القياسات:</span>
            <div className="flex items-center gap-1 flex-wrap justify-end">
              {product.sizes.slice(0, 7).map((s) => (
                <span
                  key={s}
                  className="bg-neutral-100 dark:bg-[#202020] text-neutral-800 dark:text-[#F7F4EF] px-1.5 py-0.5 rounded text-[10px] font-bold font-['Plus_Jakarta_Sans',sans-serif]"
                >
                  {s}
                </span>
              ))}
              {product.sizes.length > 7 && (
                <span className="text-[10px] text-neutral-500 font-bold">
                  +{product.sizes.length - 7} أخرى
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Price Options Breakdown Card */}
        {product.priceOptions && (
          <div className="mb-4 p-3 rounded-xl bg-amber-50/50 dark:bg-[#1A1A1A] border border-amber-200/60 dark:border-[#2B2B2B] text-xs space-y-1.5">
            <span className="text-[11px] font-black text-[#D97706] dark:text-[#FFA000] block mb-1">
              تفاصيل الأسعار:
            </span>
            {product.priceOptions.plain && (
              <div className="flex items-center justify-between text-neutral-700 dark:text-[#DDDDDD]">
                <span>سادة بدون طباعة:</span>
                <span className="font-black text-neutral-900 dark:text-[#F7F4EF]">{product.priceOptions.plain}</span>
              </div>
            )}
            {product.priceOptions.singleSide && (
              <div className="flex items-center justify-between text-neutral-700 dark:text-[#DDDDDD]">
                <span>طباعة جهة واحدة:</span>
                <span className="font-black text-neutral-900 dark:text-[#FFA000]">{product.priceOptions.singleSide}</span>
              </div>
            )}
            {product.priceOptions.bothSides && (
              <div className="flex items-center justify-between text-neutral-700 dark:text-[#DDDDDD]">
                <span>طباعة جهتين:</span>
                <span className="font-black text-neutral-900 dark:text-[#FFA000]">{product.priceOptions.bothSides}</span>
              </div>
            )}
            {product.priceOptions.fullPrint && (
              <div className="flex items-center justify-between text-neutral-700 dark:text-[#DDDDDD]">
                <span>مطبوع كامل:</span>
                <span className="font-black text-neutral-900 dark:text-[#FFA000]">{product.priceOptions.fullPrint}</span>
              </div>
            )}
          </div>
        )}

        {/* Notice if logos only or no print */}
        {product.printNotice && (
          <div className="mb-4 p-2 rounded-lg bg-neutral-100 dark:bg-[#1E1E1E] text-[11px] text-neutral-600 dark:text-[#AAAAAA] flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#FFA000] shrink-0" />
            <span>{product.printNotice}</span>
          </div>
        )}

        {/* Pricing Footer & CTA */}
        <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-[#262626] flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-neutral-500 dark:text-[#888888] block">يبدأ من</span>
            <span className="text-lg sm:text-xl font-black text-[#FFA000] tracking-tight">
              {product.price}
            </span>
          </div>

          <button
            onClick={() => onSelectProductForOrder(product)}
            className="bg-[#FFA000] hover:bg-[#e68a00] text-[#0D0D0D] font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-md shadow-[#FFA000]/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>اطلب الآن</span>
          </button>
        </div>
      </div>
    </div>
  );
};
