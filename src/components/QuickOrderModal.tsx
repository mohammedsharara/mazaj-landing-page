import React, { useState, useEffect, useMemo } from 'react';
import { ProductItem } from '../types';
import { PRODUCTS, BRAND } from '../data/content';
import { X, ShoppingBag, MessageCircle, ShieldCheck, Sparkles, Ruler, Weight } from 'lucide-react';
import { useProductCustomImages } from '../hooks/useProductCustomImages';

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: ProductItem | null;
  prefilledFit?: {
    garmentType?: string;
    height?: string;
    weight?: string;
    suggestedSize?: string;
    fitPreference?: string;
  } | null;
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  isOpen,
  onClose,
  selectedProduct,
  prefilledFit,
}) => {
  const { getProductImage } = useProductCustomImages();
  const [productType, setProductType] = useState<string>('tshirt-black-slim');
  const [printOption, setPrintOption] = useState<'plain' | 'singleSide' | 'bothSides' | 'fullPrint'>('singleSide');
  const [size, setSize] = useState<string>('L');
  const [color, setColor] = useState<string>('أسود');
  const [orderType, setOrderType] = useState<'catalog' | 'custom'>('catalog');
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [heightInput, setHeightInput] = useState('');
  const [weightInput, setWeightInput] = useState('');
  const [autoFitRequested, setAutoFitRequested] = useState(true);
  const [customDesignNote, setCustomDesignNote] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Sync selected product or prefill when modal opens or props change
  useEffect(() => {
    if (selectedProduct) {
      setProductType(selectedProduct.id);
      if (selectedProduct.colors && selectedProduct.colors.length > 0) {
        setColor(selectedProduct.colors[0]);
      }
      // Choose appropriate default print option
      if (selectedProduct.id.includes('gymshark')) {
        setPrintOption('plain');
      } else if (selectedProduct.id === 'gym-track-filter-short') {
        setPrintOption('singleSide');
      } else if (selectedProduct.id === 'gym-track-makhoot-darkgrey') {
        setPrintOption('plain');
      } else {
        setPrintOption('singleSide');
      }
      setOrderType('catalog');
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (prefilledFit) {
      if (prefilledFit.height) setHeightInput(prefilledFit.height.replace(' سم', ''));
      if (prefilledFit.weight) setWeightInput(prefilledFit.weight.replace(' كغ', ''));
      if (prefilledFit.suggestedSize) setSize(prefilledFit.suggestedSize);
      setAutoFitRequested(true);
    }
  }, [prefilledFit]);

  const currentItem = useMemo(() => {
    return PRODUCTS.find((p) => p.id === productType) || PRODUCTS[0];
  }, [productType]);

  // Determine available colors for this item
  const availableColors = useMemo(() => {
    if (currentItem.colors && currentItem.colors.length > 0) {
      return currentItem.colors;
    }
    return ['أسود', 'أبيض'];
  }, [currentItem]);

  // Adjust color if not in available
  useEffect(() => {
    if (!availableColors.includes(color)) {
      setColor(availableColors[0]);
    }
  }, [availableColors, color]);

  // Dynamic available sizes for this item
  const availableSizes = useMemo(() => {
    return currentItem.sizes;
  }, [currentItem]);

  // Adjust size if current selection is not available
  useEffect(() => {
    if (!availableSizes.includes(size)) {
      setSize(availableSizes.includes('L') ? 'L' : availableSizes[0]);
    }
  }, [availableSizes, size]);

  // Determine current price based on selected printOption
  const currentPriceDisplay = useMemo(() => {
    if (!currentItem.priceOptions) return currentItem.price;
    if (printOption === 'plain' && currentItem.priceOptions.plain) return currentItem.priceOptions.plain;
    if (printOption === 'singleSide' && currentItem.priceOptions.singleSide) return currentItem.priceOptions.singleSide;
    if (printOption === 'bothSides' && currentItem.priceOptions.bothSides) return currentItem.priceOptions.bothSides;
    if (printOption === 'fullPrint' && currentItem.priceOptions.fullPrint) return currentItem.priceOptions.fullPrint;
    return currentItem.price;
  }, [currentItem, printOption]);

  if (!isOpen) return null;

  const handleSubmitToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    let printOptionLabel = 'طباعة جهة واحدة';
    if (printOption === 'plain') printOptionLabel = 'سادة (بدون طباعة)';
    if (printOption === 'bothSides') printOptionLabel = 'طباعة جهتين (أمام وخلف)';
    if (printOption === 'fullPrint') printOptionLabel = 'مطبوع كامل';

    const orderText = `*طلب جديد من موقع مزاج وير (MAZAJ WEAR)* 👕✨

• *القطعة:* ${currentItem ? currentItem.name : 'غير محدد'}
• *خيار الطباعة:* ${printOptionLabel} (${currentPriceDisplay})
• *اللون المطلوب:* ${color}
• *المقاس المطلوب:* ${size}
${heightInput ? `• *الطول:* ${heightInput} سم` : ''}
${weightInput ? `• *الوزن:* ${weightInput} كغ` : ''}
• *ترتيب القالب:* ${autoFitRequested ? 'نعم، أرجو ترتيب القالب المريح المناسب لطولي ووزني مع تفعيل ضمان الاستبدال' : 'المقاس المختار فقط'}
${customerName ? `• *اسم العميل:* ${customerName}` : ''}
${customerCity ? `• *المحافظة / المدينة:* ${customerCity}` : ''}
${customDesignNote ? `• *ملاحظات التصميم:* ${customDesignNote}` : ''}
• *سعر التوصيل:* ${BRAND.deliveryPrice} (لكافة محافظات العراق)

*ملاحظة الضمان:* القطعة خاضعة لضمان الاستبدال المجاني في حال اخترتم المقاس ولم يناسبني تماماً.`;

    const encoded = encodeURIComponent(orderText);
    const url = `https://wa.me/9647741250933?text=${encoded}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-[#141414] border border-neutral-200 dark:border-[#2B2B2B] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh] sm:max-h-[88vh] transition-colors"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-[#262626] flex items-center justify-between bg-neutral-50 dark:bg-[#181818] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-[#FFA000]/15 text-[#D97706] dark:text-[#FFA000] shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 id="order-modal-title" className="font-black text-base sm:text-lg text-neutral-900 dark:text-[#F7F4EF]">
                تجهيز الطلب — مزاج وير
              </h3>
              <p className="text-xs text-neutral-500 dark:text-[#A5A5A5]">مع ترتيب القالب وضمان الاستبدال الذهبي</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:text-[#A5A5A5] dark:hover:text-[#F7F4EF] hover:bg-neutral-100 dark:hover:bg-[#222222] transition-colors cursor-pointer"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmitToWhatsApp} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* Garment Selection & Mini Preview */}
          <div>
            <label htmlFor="product-type-select" className="block text-xs font-bold text-neutral-700 dark:text-[#A5A5A5] mb-1.5">
              القطعة والخامة:
            </label>
            <div className="flex gap-3 items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-neutral-200 dark:border-[#333333] bg-neutral-100 dark:bg-[#202020]">
                <img
                  src={getProductImage(currentItem, color)}
                  alt={currentItem.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1">
                <select
                  id="product-type-select"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-neutral-900 dark:text-[#F7F4EF] font-bold focus:outline-none focus:ring-2 focus:ring-[#FFA000] cursor-pointer"
                >
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id} className="bg-white dark:bg-[#141414] text-neutral-900 dark:text-[#F7F4EF]">
                      {p.name}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-neutral-500 dark:text-[#888888] mt-1 font-medium">
                  {currentItem.fabric} • {currentItem.fit}
                </p>
              </div>
            </div>
          </div>

          {/* Print Option Selector if priceOptions exist */}
          {currentItem.priceOptions && (
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-[#A5A5A5] mb-1.5">
                خيارات الطباعة والسعر:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {currentItem.priceOptions.plain && (
                  <button
                    type="button"
                    onClick={() => setPrintOption('plain')}
                    className={`p-2.5 rounded-xl border text-xs text-right cursor-pointer font-bold transition-all ${
                      printOption === 'plain'
                        ? 'border-[#FFA000] bg-amber-50 dark:bg-[#FFA000]/15 text-[#D97706] dark:text-[#FFA000] ring-1 ring-[#FFA000]'
                        : 'border-neutral-200 dark:border-[#2A2A2A] bg-white dark:bg-[#181818] text-neutral-600 dark:text-[#A5A5A5]'
                    }`}
                  >
                    <div className="text-[11px] opacity-80">سادة (بدون طباعة)</div>
                    <div className="text-xs sm:text-sm font-black text-neutral-900 dark:text-[#F7F4EF]">{currentItem.priceOptions.plain}</div>
                  </button>
                )}

                {currentItem.priceOptions.singleSide && (
                  <button
                    type="button"
                    onClick={() => setPrintOption('singleSide')}
                    className={`p-2.5 rounded-xl border text-xs text-right cursor-pointer font-bold transition-all ${
                      printOption === 'singleSide'
                        ? 'border-[#FFA000] bg-amber-50 dark:bg-[#FFA000]/15 text-[#D97706] dark:text-[#FFA000] ring-1 ring-[#FFA000]'
                        : 'border-neutral-200 dark:border-[#2A2A2A] bg-white dark:bg-[#181818] text-neutral-600 dark:text-[#A5A5A5]'
                    }`}
                  >
                    <div className="text-[11px] opacity-80">طباعة جهة واحدة</div>
                    <div className="text-xs sm:text-sm font-black text-neutral-900 dark:text-[#F7F4EF]">{currentItem.priceOptions.singleSide}</div>
                  </button>
                )}

                {currentItem.priceOptions.bothSides && (
                  <button
                    type="button"
                    onClick={() => setPrintOption('bothSides')}
                    className={`p-2.5 rounded-xl border text-xs text-right cursor-pointer font-bold transition-all ${
                      printOption === 'bothSides'
                        ? 'border-[#FFA000] bg-amber-50 dark:bg-[#FFA000]/15 text-[#D97706] dark:text-[#FFA000] ring-1 ring-[#FFA000]'
                        : 'border-neutral-200 dark:border-[#2A2A2A] bg-white dark:bg-[#181818] text-neutral-600 dark:text-[#A5A5A5]'
                    }`}
                  >
                    <div className="text-[11px] opacity-80">طباعة جهتين</div>
                    <div className="text-xs sm:text-sm font-black text-neutral-900 dark:text-[#F7F4EF]">{currentItem.priceOptions.bothSides}</div>
                  </button>
                )}

                {currentItem.priceOptions.fullPrint && (
                  <button
                    type="button"
                    onClick={() => setPrintOption('fullPrint')}
                    className={`p-2.5 rounded-xl border text-xs text-right cursor-pointer font-bold transition-all ${
                      printOption === 'fullPrint'
                        ? 'border-[#FFA000] bg-amber-50 dark:bg-[#FFA000]/15 text-[#D97706] dark:text-[#FFA000] ring-1 ring-[#FFA000]'
                        : 'border-neutral-200 dark:border-[#2A2A2A] bg-white dark:bg-[#181818] text-neutral-600 dark:text-[#A5A5A5]'
                    }`}
                  >
                    <div className="text-[11px] opacity-80">مطبوع كامل</div>
                    <div className="text-xs sm:text-sm font-black text-neutral-900 dark:text-[#F7F4EF]">{currentItem.priceOptions.fullPrint}</div>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Color Selection */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-[#A5A5A5] mb-1.5">اللون:</label>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-3 py-2 rounded-xl border text-xs cursor-pointer font-bold transition-all min-h-[36px] ${
                    color === c
                      ? 'border-[#FFA000] bg-[#FFA000] text-[#0D0D0D]'
                      : 'border-neutral-200 dark:border-[#2A2A2A] bg-neutral-100 dark:bg-[#1A1A1A] text-neutral-700 dark:text-[#CCCCCC]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Height & Weight Inputs as strictly requested */}
          <div className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-[#1B1B1B] border border-amber-200/70 dark:border-[#333333] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 dark:text-[#F7F4EF] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FFA000] shrink-0" />
                <span>طولك ووزنك لترتيب القالب المريح:</span>
              </span>
              <span className="text-[10px] font-bold text-[#D97706] dark:text-[#FFA000]">استبدال مجاني إن لم يناسبك</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="modal-height" className="block text-[11px] font-bold text-neutral-700 dark:text-[#A5A5A5] mb-1 flex items-center gap-1">
                  <Ruler className="w-3 h-3 text-[#FFA000] shrink-0" />
                  <span>طولك (سم):</span>
                </label>
                <input
                  id="modal-height"
                  type="number"
                  value={heightInput}
                  onChange={(e) => setHeightInput(e.target.value)}
                  placeholder="مثال: 175"
                  className="w-full bg-white dark:bg-[#151515] border border-neutral-200 dark:border-[#2C2C2C] rounded-xl px-3 py-2.5 text-base sm:text-xs font-bold text-neutral-900 dark:text-[#F7F4EF] focus:outline-none focus:ring-2 focus:ring-[#FFA000]"
                />
              </div>

              <div>
                <label htmlFor="modal-weight" className="block text-[11px] font-bold text-neutral-700 dark:text-[#A5A5A5] mb-1 flex items-center gap-1">
                  <Weight className="w-3 h-3 text-[#FFA000] shrink-0" />
                  <span>وزنك (كغ):</span>
                </label>
                <input
                  id="modal-weight"
                  type="number"
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  placeholder="مثال: 75"
                  className="w-full bg-white dark:bg-[#151515] border border-neutral-200 dark:border-[#2C2C2C] rounded-xl px-3 py-2.5 text-base sm:text-xs font-bold text-neutral-900 dark:text-[#F7F4EF] focus:outline-none focus:ring-2 focus:ring-[#FFA000]"
                />
              </div>
            </div>

            <label className="flex items-start gap-2 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={autoFitRequested}
                onChange={(e) => setAutoFitRequested(e.target.checked)}
                className="mt-0.5 rounded text-[#FFA000] focus:ring-[#FFA000] shrink-0"
              />
              <span className="text-[11px] text-neutral-700 dark:text-[#CCCCCC] leading-snug">
                دع فريق مزاج يرتّب لي القالب المريح المناسب بناءً على طولي ووزني مع تفعيل <strong>ضمان الاستبدال المجاني</strong>.
              </span>
            </label>
          </div>

          {/* Size Selection Buttons */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-[#A5A5A5]">المقاس المطلوب:</label>
              <span className="text-[11px] text-[#FFA000] font-bold">
                {currentItem.tag || 'مقاسات متوفرة'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1">
              {availableSizes.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3.5 py-2 rounded-xl font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs flex items-center justify-center transition-all cursor-pointer min-h-[36px] ${
                    size === s
                      ? 'bg-[#FFA000] text-[#0D0D0D] shadow-sm ring-1 ring-[#FFA000]'
                      : 'bg-neutral-100 dark:bg-[#1A1A1A] text-neutral-700 dark:text-[#A5A5A5] border border-neutral-200 dark:border-[#2B2B2B] hover:border-neutral-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Notes */}
          <div>
            <label htmlFor="custom-design-note" className="block text-xs font-bold text-neutral-700 dark:text-[#A5A5A5] mb-1.5">
              ملاحظات أو تفاصيل التصميم (أنمي، عبارة، صورة، لوجو):
            </label>
            <textarea
              id="custom-design-note"
              value={customDesignNote}
              onChange={(e) => setCustomDesignNote(e.target.value)}
              placeholder="اكتب فكرتك أو اذكر أنك سترسل الصورة مباشرة في محادثة الواتساب..."
              rows={2}
              className="w-full bg-neutral-50 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-[#2D2D2D] rounded-xl p-3 text-base sm:text-xs text-neutral-900 dark:text-[#F7F4EF] placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FFA000]"
            />
          </div>

          {/* Customer Name & City Optional Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label htmlFor="customer-name" className="block text-xs font-bold text-neutral-700 dark:text-[#A5A5A5] mb-1">الاسم الكريم:</label>
              <input
                id="customer-name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="الاسم أو اللقب"
                className="w-full bg-neutral-50 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-[#2D2D2D] rounded-xl px-3 py-2.5 text-base sm:text-xs text-neutral-900 dark:text-[#F7F4EF] placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FFA000]"
              />
            </div>
            <div>
              <label htmlFor="customer-city" className="block text-xs font-bold text-neutral-700 dark:text-[#A5A5A5] mb-1">المحافظة / المدينة:</label>
              <input
                id="customer-city"
                type="text"
                value={customerCity}
                onChange={(e) => setCustomerCity(e.target.value)}
                placeholder="بغداد، البصرة، أربيل..."
                className="w-full bg-neutral-50 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-[#2D2D2D] rounded-xl px-3 py-2.5 text-base sm:text-xs text-neutral-900 dark:text-[#F7F4EF] placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FFA000]"
              />
            </div>
          </div>

          {/* Price Summary & Guarantee Reminder */}
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/30 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-300">
            <span className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>ضمان استبدال القطعة التي نختار مقاسها</span>
            </span>
            <span className="font-black text-sm text-[#D97706] dark:text-[#FFA000] font-['Plus_Jakarta_Sans',sans-serif]">
              {currentPriceDisplay}
            </span>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full bg-[#FFA000] hover:bg-[#e68a00] text-[#0D0D0D] font-black text-sm sm:text-base py-3.5 rounded-2xl transition-all duration-200 shadow-xl shadow-[#FFA000]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <MessageCircle className="w-5 h-5 text-[#0D0D0D] shrink-0" />
            <span>إرسال الطلب مع تفاصيل القياس عبر الواتساب</span>
          </button>
        </form>
      </div>
    </div>
  );
};
