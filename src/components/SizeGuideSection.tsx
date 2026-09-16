import React, { useState, useMemo } from 'react';
import { Sparkles, ShieldCheck, Send, CheckCircle2, Ruler, Weight } from 'lucide-react';
import { PRODUCTS, BRAND } from '../data/content';

interface SizeGuideSectionProps {
  onOpenOrderModal?: (prefill?: {
    garmentType?: string;
    height?: string;
    weight?: string;
    suggestedSize?: string;
    fitPreference?: string;
  }) => void;
}

export const SizeGuideSection: React.FC<SizeGuideSectionProps> = ({ onOpenOrderModal }) => {
  // Only two text inputs as requested: Height and Weight
  const [heightInput, setHeightInput] = useState<string>('175');
  const [weightInput, setWeightInput] = useState<string>('75');
  const [selectedProductId, setSelectedProductId] = useState<string>('tshirt-black-slim');

  const selectedProduct = useMemo(() => {
    return PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  }, [selectedProductId]);

  // Real-time calculation based strictly on user-typed weight and height
  const calculation = useMemo(() => {
    const h = parseFloat(heightInput) || 170;
    const w = parseFloat(weightInput) || 70;

    // Check for kids sizing (for Black T-shirt slim fit)
    if (selectedProduct.id === 'tshirt-black-slim' && (h < 150 || w < 40)) {
      if (w <= 20 || h <= 115) {
        return {
          size: '4 - 6 سنوات',
          description: 'قالب أطفال مريح وعملي من القطن الصافي 100%.',
        };
      }
      if (w <= 28 || h <= 130) {
        return {
          size: '8 - 10 سنوات',
          description: 'قالب أطفال ممتاز ومريح مناسب للارتداء والطباعة اليومية.',
        };
      }
      return {
        size: '12 - 14 سنة',
        description: 'قالب فتيان مريح يناسب الطول والوزن بدقة.',
      };
    }

    // Adult sizes
    let size = 'L';
    if (w < 58) {
      size = 'S';
    } else if (w < 70) {
      size = 'M';
    } else if (w < 82) {
      size = 'L';
    } else if (w < 95) {
      size = 'XL';
    } else if (w < 110) {
      size = '2XL';
    } else if (w < 125) {
      size = '3XL';
    } else if (w < 135) {
      size = '4XL';
    } else {
      size = '5XL';
    }

    // Adjust for tall heights
    if (h >= 186 && (size === 'S' || size === 'M')) {
      size = 'L';
    }

    // Cap sizes for garments that stop at 2XL
    const isLimitedTo2XL = selectedProduct.sizes.includes('2XL') && !selectedProduct.sizes.includes('3XL');
    let limitNotice = '';
    if (isLimitedTo2XL && ['3XL', '4XL', '5XL'].includes(size)) {
      size = '2XL (أقصى مقاس لهذا الموديل)';
      limitNotice = 'هذا الموديل متوفر حتى 2XL. إذا كنت ترغب بمقاس أكبر (حتى 5XL)، يمكنك اختيار التيشيرت الأسود هاف أو الهوديات الشتوية.';
    }

    // Gymshark Muscle Fit cap (S to XL)
    if (selectedProduct.id.includes('gymshark') && ['2XL', '3XL', '4XL', '5XL'].includes(size)) {
      size = 'XL (قالب ضاب Muscle Fit)';
      limitNotice = 'منتجات جم شارك مخصصة بقالب ضاب لأصحاب العضلات حتى مقاس XL.';
    }

    return {
      size,
      description: limitNotice || `تم حساب المقاس بناءً على الطول (${h} سم) والوزن (${w} كغ) ليكون القالب مريحاً وأنيقاً.`,
    };
  }, [heightInput, weightInput, selectedProduct]);

  const handleOrderWhatsApp = () => {
    const text = `*طلب ترتيب قياس وقالب مريح — مزاج وير* 👕✨
• *القطعة المختارة:* ${selectedProduct.name}
• *الطول:* ${heightInput ? `${heightInput} سم` : 'غير محدد'}
• *الوزن:* ${weightInput ? `${weightInput} كغ` : 'غير محدد'}
• *المقاس التقديري:* ${calculation.size}

*ضمان الاستبدال:* طلبت ترتيب القياس من قبلكم وفق طولي ووزني، مع تفعيل ضمان استبدال القطعة إذا لم يناسبني المقاس تماماً.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/9647741250933?text=${encoded}`, '_blank');
  };

  const handleOpenModal = () => {
    if (onOpenOrderModal) {
      onOpenOrderModal({
        garmentType: selectedProduct.name,
        height: `${heightInput} سم`,
        weight: `${weightInput} كغ`,
        suggestedSize: calculation.size,
      });
    } else {
      handleOrderWhatsApp();
    }
  };

  return (
    <section id="sizes" className="py-16 sm:py-24 bg-white dark:bg-[#121212] border-b border-neutral-200 dark:border-[#1F1F1F] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-[#1A1A1A] border border-amber-200/60 dark:border-[#2B2B2B] text-xs font-bold text-[#D97706] dark:text-[#FFA000] mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FFA000]" />
            <span>خدمة ترتيب القالب المريح — بدون جداول قياس</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-[#F7F4EF] mb-3">
            اكتب طولك ووزنك فقط
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-[#A5A5A5]">
            بدون حيرة الجداول والأرقام؛ فقط أدخل طولك ووزنك وسنرتّب لك القالب المريح الأنسب، مع ضمان الاستبدال الفوري والمجاني للقطعة إن لم تناسبك!
          </p>
        </div>

        {/* The Simplified Form Card */}
        <div className="bg-neutral-50 dark:bg-[#161616] border border-neutral-200 dark:border-[#262626] rounded-3xl p-6 sm:p-8 shadow-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            
            {/* 1. Height Input */}
            <div>
              <label htmlFor="user-height" className="block text-xs sm:text-sm font-bold text-neutral-800 dark:text-[#F7F4EF] mb-2 flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-[#FFA000]" />
                <span>طولك (سم):</span>
              </label>
              <div className="relative">
                <input
                  id="user-height"
                  type="number"
                  value={heightInput}
                  onChange={(e) => setHeightInput(e.target.value)}
                  placeholder="مثال: 175"
                  className="w-full bg-white dark:bg-[#1F1F1F] border-2 border-neutral-200 dark:border-[#333333] focus:border-[#FFA000] dark:focus:border-[#FFA000] rounded-2xl px-4 py-3.5 text-base font-black text-neutral-900 dark:text-[#F7F4EF] focus:outline-none transition-colors"
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400">
                  سم
                </span>
              </div>
            </div>

            {/* 2. Weight Input */}
            <div>
              <label htmlFor="user-weight" className="block text-xs sm:text-sm font-bold text-neutral-800 dark:text-[#F7F4EF] mb-2 flex items-center gap-1.5">
                <Weight className="w-4 h-4 text-[#FFA000]" />
                <span>وزنك (كغ):</span>
              </label>
              <div className="relative">
                <input
                  id="user-weight"
                  type="number"
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  placeholder="مثال: 75"
                  className="w-full bg-white dark:bg-[#1F1F1F] border-2 border-neutral-200 dark:border-[#333333] focus:border-[#FFA000] dark:focus:border-[#FFA000] rounded-2xl px-4 py-3.5 text-base font-black text-neutral-900 dark:text-[#F7F4EF] focus:outline-none transition-colors"
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400">
                  كغ
                </span>
              </div>
            </div>

            {/* 3. Garment Selection */}
            <div>
              <label htmlFor="garment-select" className="block text-xs sm:text-sm font-bold text-neutral-800 dark:text-[#F7F4EF] mb-2">
                نوع القطعة المطلوبة:
              </label>
              <select
                id="garment-select"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full bg-white dark:bg-[#1F1F1F] border-2 border-neutral-200 dark:border-[#333333] focus:border-[#FFA000] dark:focus:border-[#FFA000] rounded-2xl px-3.5 py-3.5 text-xs sm:text-sm font-bold text-neutral-900 dark:text-[#F7F4EF] focus:outline-none transition-colors cursor-pointer"
              >
                {PRODUCTS.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Result Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-neutral-200 dark:border-[#2C2C2C] flex flex-col sm:flex-row items-center justify-between gap-5 mb-6">
            <div className="flex items-center gap-4 text-right">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-[#FFA000]/15 border border-amber-200/80 dark:border-[#FFA000]/30 flex flex-col items-center justify-center shrink-0">
                <span className="text-[10px] text-[#D97706] dark:text-[#FFA000] font-bold">المقاس</span>
                <span className="text-xl font-black text-neutral-900 dark:text-[#FFA000] leading-none">
                  {calculation.size.split(' ')[0]}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-neutral-500 dark:text-[#888888]">المقاس المقترح لجسمك:</span>
                  <span className="text-sm font-black text-neutral-900 dark:text-[#F7F4EF]">
                    {calculation.size}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-[#A5A5A5]">
                  {calculation.description}
                </p>
              </div>
            </div>

            <button
              onClick={handleOpenModal}
              className="w-full sm:w-auto bg-[#FFA000] hover:bg-[#e68a00] text-[#0D0D0D] font-black text-sm px-6 py-3.5 rounded-xl transition-all shadow-md shadow-[#FFA000]/25 flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
            >
              <span>طلب هذا القياس الآن</span>
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Golden Replacement Guarantee Box */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-[#0D2418] border border-emerald-200 dark:border-emerald-800/40 flex items-start gap-3.5 text-xs text-emerald-900 dark:text-emerald-300">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-emerald-950 dark:text-emerald-200 mb-0.5">
                ضمان الاستبدال الذهبي من مزاج وير
              </h4>
              <p className="text-emerald-800 dark:text-emerald-300/90 leading-relaxed">
                إذا قمنا نحن بترتيب القياس لك بناءً على طولك ووزنك ولم يناسبك القالب، فإننا نلتزم باستبدال القطعة لك مجاناً وفورياً دون أي تكلفة إضافية!
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
