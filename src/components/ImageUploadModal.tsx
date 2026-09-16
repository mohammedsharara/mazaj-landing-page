import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Link,
  Camera,
  RotateCcw,
  Check,
  Sparkles,
  Info,
  Image as ImageIcon,
  Download,
  FileUp,
  Sliders,
  Eye,
  Trash2,
} from 'lucide-react';
import { useSiteImages } from '../hooks/useSiteImages';
import { compressImageFile } from '../utils/imageManager';
import { ImageSlotMeta } from '../utils/imageManager';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSlotKey?: string | null;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  initialSlotKey,
}) => {
  const {
    allSlots,
    getImage,
    isCustomized,
    updateSlot,
    resetSlot,
    resetAll,
    exportJson,
    importJson,
  } = useSiteImages();

  // Selected Category filter
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'hero' | 'products' | 'fabrics' | 'printing' | 'gallery'
  >('all');

  // Selected Slot
  const [selectedSlotKey, setSelectedSlotKey] = useState<string>(
    initialSlotKey || (allSlots[0]?.key ?? 'hero:banner')
  );

  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'manage'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copyExportSuccess, setCopyExportSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const jsonImportRef = useRef<HTMLInputElement>(null);

  // Sync initial slot when opened
  useEffect(() => {
    if (initialSlotKey) {
      setSelectedSlotKey(initialSlotKey);
      const slot = allSlots.find((s) => s.key === initialSlotKey);
      if (slot) {
        setSelectedCategory(slot.category);
      }
    }
  }, [initialSlotKey, isOpen, allSlots]);

  const currentSlot: ImageSlotMeta =
    allSlots.find((s) => s.key === selectedSlotKey) || allSlots[0];

  // Sync preview whenever selected slot changes
  useEffect(() => {
    if (currentSlot) {
      const activeImg = getImage(currentSlot.key, currentSlot.defaultImage);
      setPreviewUrl(activeImg);
      setUrlInput('');
      setSavedSuccess(false);
    }
  }, [selectedSlotKey, currentSlot, getImage]);

  if (!isOpen) return null;

  const filteredSlots = allSlots.filter((slot) => {
    if (selectedCategory === 'all') return true;
    return slot.category === selectedCategory;
  });

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsProcessing(true);
      const compressedDataUrl = await compressImageFile(files[0]);
      setPreviewUrl(compressedDataUrl);
      setSavedSuccess(false);
    } catch (err) {
      console.error('Failed to read image file', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setPreviewUrl(urlInput.trim());
    setSavedSuccess(false);
  };

  const handleSave = () => {
    if (!previewUrl || !currentSlot) return;

    updateSlot(currentSlot.key, previewUrl);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 1500);
  };

  const handleResetCurrent = () => {
    if (!currentSlot) return;
    resetSlot(currentSlot.key);
    setPreviewUrl(currentSlot.defaultImage);
    setUrlInput('');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 1200);
  };

  const handleExport = () => {
    const dataStr = exportJson();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mazajwear-custom-images-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setCopyExportSuccess(true);
    setTimeout(() => setCopyExportSuccess(false), 2000);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importJson(content);
      if (success) {
        setImportStatus('تم استيراد كافة الصور المخصصة بنجاح!');
        if (currentSlot) {
          setPreviewUrl(getImage(currentSlot.key, currentSlot.defaultImage));
        }
      } else {
        setImportStatus('خطأ: الملف غير صالح أو تالف.');
      }
      setTimeout(() => setImportStatus(null), 3000);
    };
    reader.readAsText(files[0]);
  };

  const isCurrentCustomized = isCustomized(currentSlot.key);

  const categoryPills = [
    { key: 'all', label: 'جميع الأقسام' },
    { key: 'hero', label: 'الواجهة الرئيسية (Hero)' },
    { key: 'products', label: 'التيشيرتات والمنتجات' },
    { key: 'fabrics', label: 'معرض الخامات' },
    { key: 'printing', label: 'خطوات الطباعة' },
    { key: 'gallery', label: 'معرض الأعمال الواقعية' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#141414] rounded-3xl border border-neutral-200 dark:border-[#262626] shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
        dir="rtl"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-100 dark:border-[#222222] flex items-center justify-between bg-neutral-50/80 dark:bg-[#181818]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFA000]/15 text-[#FFA000] flex items-center justify-center border border-[#FFA000]/30 shadow-xs">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-neutral-900 dark:text-[#F7F4EF]">
                  استوديو تنظيم صور المتجر بضغطة زر
                </h3>
                <span className="text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                  تحديث فوري
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-[#888888]">
                رتّب صور التيشيرتات، الخامات، والواجهة بصورك الحقيقية بكل سلاسة وبدون كود
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-200 dark:hover:bg-[#252525] transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Step 1: Category Filter Pills */}
          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-[#999999] mb-1.5">
              1. اختر القسم لتحديد الصورة:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categoryPills.map((pill) => (
                <button
                  type="button"
                  key={pill.key}
                  onClick={() => setSelectedCategory(pill.key as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === pill.key
                      ? 'bg-[#FFA000] text-[#0D0D0D] shadow-sm'
                      : 'bg-neutral-100 dark:bg-[#1E1E1E] text-neutral-600 dark:text-[#AAAAAA] hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Slot Dropdown Selector */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-[#CCCCCC] mb-1.5">
              2. حدد الصورة المطلوب تغييرها:
            </label>
            <select
              value={selectedSlotKey}
              onChange={(e) => setSelectedSlotKey(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-[#1C1C1C] border border-neutral-200 dark:border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 dark:text-[#F7F4EF] font-bold focus:ring-2 focus:ring-[#FFA000] outline-none"
            >
              {filteredSlots.map((slot) => {
                const customized = isCustomized(slot.key);
                return (
                  <option key={slot.key} value={slot.key}>
                    {customized ? '✨ (مخصصة) ' : ''}
                    [{slot.categoryLabel}] {slot.title}
                  </option>
                );
              })}
            </select>
            <p className="text-[11px] text-neutral-500 dark:text-[#888888] mt-1">
              {currentSlot.description}
            </p>
          </div>

          {/* Step 3: Current Live Preview Box */}
          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-[#282828] flex items-center gap-4">
            <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-neutral-300 dark:border-[#333333] relative group shadow-sm">
              <img
                src={previewUrl}
                alt={currentSlot.title}
                className="w-full h-full object-cover"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-[#FFA000] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <div className="flex-1 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-extrabold text-sm text-neutral-900 dark:text-[#F7F4EF]">
                  {currentSlot.title}
                </span>
                {isCurrentCustomized ? (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/40">
                    <Check className="w-3 h-3" />
                    مُخصصة حالياً بصورتك
                  </span>
                ) : (
                  <span className="text-[10px] text-neutral-500 dark:text-[#777777] bg-neutral-200 dark:bg-[#222222] px-2 py-0.5 rounded-md">
                    الصورة الافتراضية
                  </span>
                )}
              </div>

              <p className="text-neutral-500 dark:text-[#888888] text-[11px] mb-3 leading-relaxed">
                القسم: <strong>{currentSlot.categoryLabel}</strong>
              </p>

              {isCurrentCustomized && (
                <button
                  type="button"
                  onClick={handleResetCurrent}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>استعادة الصورة الافتراضية لهذه القطعة</span>
                </button>
              )}
            </div>
          </div>

          {/* Step 4: Action Tabs: Upload, URL, Backup */}
          <div>
            <div className="flex border-b border-neutral-200 dark:border-[#2D2D2D] mb-3">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 pb-2 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'upload'
                    ? 'border-[#FFA000] text-[#FFA000]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>رفع صورة من جهازك</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('url')}
                className={`flex-1 pb-2 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'url'
                    ? 'border-[#FFA000] text-[#FFA000]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <Link className="w-3.5 h-3.5" />
                <span>رابط من الإنترنت (URL)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('manage')}
                className={`flex-1 pb-2 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'manage'
                    ? 'border-[#FFA000] text-[#FFA000]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>نسخ احتياطي واستيراد</span>
              </button>
            </div>

            {/* Tab 1: Upload File */}
            {activeTab === 'upload' && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-neutral-300 dark:border-[#333333] hover:border-[#FFA000] dark:hover:border-[#FFA000] rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 bg-neutral-50/50 dark:bg-[#181818]/50 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelected}
                  className="hidden"
                />
                <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-[#FFA000] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-neutral-800 dark:text-[#F7F4EF] mb-1">
                  اضغط هنا لاختيار صورة من ألبوم هاتفك أو حاسوبك
                </p>
                <p className="text-[11px] text-neutral-500 dark:text-[#777777]">
                  يتم ضغط الصورة تلقائياً للحفاظ على سرعة تصفح المتجر الفائقة
                </p>
              </div>
            )}

            {/* Tab 2: URL Link */}
            {activeTab === 'url' && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="flex-1 bg-neutral-50 dark:bg-[#1C1C1C] border border-neutral-200 dark:border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 dark:text-[#F7F4EF] focus:ring-2 focus:ring-[#FFA000] outline-none font-sans"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="bg-neutral-800 dark:bg-[#2A2A2A] hover:bg-[#FFA000] hover:text-[#0D0D0D] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer shrink-0"
                  >
                    معاينة
                  </button>
                </div>
                <p className="text-[10px] text-neutral-500">
                  يمكنك استخدام أي رابط صورة مباشر من جوجل درايف، تليجرام، أو أي استضافة.
                </p>
              </div>
            )}

            {/* Tab 3: Backup & Restore */}
            {activeTab === 'manage' && (
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#191919] border border-neutral-200 dark:border-[#2A2A2A] space-y-3 text-xs">
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-[#F7F4EF] mb-1 flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-[#FFA000]" />
                    <span>حفظ وتصدير الصور كملف احتياطي (Backup JSON)</span>
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-[#888888] mb-2.5">
                    حمّل ملفاً يحتوي على جميع صورك التي رتبتها، لتحتفظ بها بأمان أو تشاركها معنا في الشات لتثبيتها في الكود للأبد.
                  </p>
                  <button
                    type="button"
                    onClick={handleExport}
                    className="bg-neutral-800 dark:bg-[#262626] hover:bg-[#FFA000] hover:text-[#0D0D0D] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{copyExportSuccess ? 'تم تنزيل النسخة الاحتياطية!' : 'تنزيل ملف النسخة الاحتياطية'}</span>
                  </button>
                </div>

                <div className="pt-3 border-t border-neutral-200 dark:border-[#2A2A2A]">
                  <h4 className="font-bold text-neutral-900 dark:text-[#F7F4EF] mb-1 flex items-center gap-1.5">
                    <FileUp className="w-4 h-4 text-[#FFA000]" />
                    <span>استيراد نسخة احتياطية سابقة</span>
                  </h4>
                  <input
                    ref={jsonImportRef}
                    type="file"
                    accept=".json"
                    onChange={handleImportFile}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => jsonImportRef.current?.click()}
                    className="bg-neutral-200 dark:bg-[#262626] hover:bg-neutral-300 dark:hover:bg-[#333333] text-neutral-800 dark:text-[#CCCCCC] text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <FileUp className="w-3.5 h-3.5" />
                    <span>اختيار ملف JSON واستعادته</span>
                  </button>
                  {importStatus && (
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                      {importStatus}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-neutral-200 dark:border-[#2A2A2A]">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('هل أنت متأكد من استعادة كافة الصور الأصلية لجميع الأقسام؟')) {
                        resetAll();
                        if (currentSlot) {
                          setPreviewUrl(currentSlot.defaultImage);
                        }
                      }
                    }}
                    className="text-rose-600 dark:text-rose-400 hover:underline text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>استعادة جميع الصور الأصلية لكل المتجر دفعة واحدة</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Helpful Tip */}
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#FFA000] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>فكرة ممتازة لمزيد من الموثوقية:</strong> التقط صوراً حقيقية لتيشيرتات مطبوعة من عملك في المشغل أو على مانيكان أو مع كرت التغليف، وارفعها مباشرة لتظهر للزبون بشكل واقعي 100%!
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-neutral-100 dark:border-[#222222] bg-neutral-50/80 dark:bg-[#181818]/80 flex items-center justify-between gap-3">
          <p className="text-[11px] text-neutral-500">
            الصورة المحددة: <strong className="text-neutral-800 dark:text-[#EEEEEE]">{currentSlot.title}</strong>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 dark:text-[#AAAAAA] hover:bg-neutral-200 dark:hover:bg-[#252525] transition-colors cursor-pointer"
            >
              إغلاق
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isProcessing}
              className="bg-[#FFA000] hover:bg-[#e68a00] text-[#0D0D0D] text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl shadow-md shadow-[#FFA000]/25 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950" />
                  <span>تم حفظ وتطبيق الصورة!</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-4 h-4" />
                  <span>حفظ وتطبيق هذه الصورة</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
