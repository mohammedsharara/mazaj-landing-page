import React, { useState } from 'react';
import { ProductItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickBenefits } from './components/QuickBenefits';
import { ProductsSection } from './components/ProductsSection';
import { RealGallerySection } from './components/RealGallerySection';
import { FabricsSection } from './components/FabricsSection';
import { PrintingSection } from './components/PrintingSection';
import { CustomDesignSection } from './components/CustomDesignSection';
import { SizeGuideSection } from './components/SizeGuideSection';
import { QualityGuarantee } from './components/QualityGuarantee';
import { HowToOrderSection } from './components/HowToOrderSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { QuickOrderModal } from './components/QuickOrderModal';
import { ImageUploadModal } from './components/ImageUploadModal';
import { FloatingImageStudioBtn } from './components/FloatingImageStudioBtn';

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [prefilledFit, setPrefilledFit] = useState<{
    garmentType?: string;
    height?: string;
    weight?: string;
    suggestedSize?: string;
    fitPreference?: string;
  } | null>(null);

  // Universal Store Image Studio State
  const [isImageStudioOpen, setIsImageStudioOpen] = useState(false);
  const [studioInitialSlotKey, setStudioInitialSlotKey] = useState<string | null>(null);

  const handleOpenImageStudio = (slotKey?: string) => {
    setStudioInitialSlotKey(slotKey || null);
    setIsImageStudioOpen(true);
  };

  const handleOpenOrderModal = () => {
    setSelectedProduct(null);
    setPrefilledFit(null);
    setIsOrderModalOpen(true);
  };

  const handleSelectProductForOrder = (product: ProductItem) => {
    setSelectedProduct(product);
    setPrefilledFit(null);
    setIsOrderModalOpen(true);
  };

  const handleOpenFitOrderModal = (fitData?: {
    garmentType?: string;
    height?: string;
    weight?: string;
    suggestedSize?: string;
    fitPreference?: string;
  }) => {
    setSelectedProduct(null);
    setPrefilledFit(fitData || null);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0D0D0D] text-neutral-900 dark:text-[#F7F4EF] flex flex-col font-sans selection:bg-[#FFA000] selection:text-[#0D0D0D] pb-16 md:pb-0 transition-colors duration-300">
      {/* Sticky Header */}
      <Navbar
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* Main One-Page Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenOrderModal={handleOpenOrderModal}
        />

        {/* 2. Quick Benefits / Service */}
        <QuickBenefits />

        {/* 3. Products Showcase (Summer & Winter Tabs) */}
        <ProductsSection
          onSelectProductForOrder={handleSelectProductForOrder}
        />

        {/* 4. Real Customer Orders & Authenticity Proof Showcase */}
        <RealGallerySection
          onOpenOrderModal={handleOpenOrderModal}
        />

        {/* 5. Fabrics Section (100% Cotton, المكحوت, Tetero Topo) */}
        <FabricsSection />

        {/* 6. Printing Section (5-Step Process + DTF) */}
        <PrintingSection />

        {/* 7. Custom Design (عندك تصميم؟ خليه علينا) */}
        <CustomDesignSection />

        {/* 8. Size & Fit Section (طولك ووزنك وترتيب القالب مع ضمان الاستبدال) */}
        <SizeGuideSection onOpenOrderModal={handleOpenFitOrderModal} />

        {/* 9. Quality & Guarantee (Quality Pillars) */}
        <QualityGuarantee />

        {/* 10. How To Order (5 Simple Steps) */}
        <HowToOrderSection onOpenOrderModal={handleOpenOrderModal} />

        {/* 11. FAQ Accordion (Core Questions & 4,000 IQD Delivery) */}
        <FAQSection />

        {/* 12. Final CTA Closer */}
        <FinalCTA onOpenOrderModal={handleOpenOrderModal} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile "اطلب الآن" Bar */}
      <MobileStickyBar onOpenOrderModal={handleOpenOrderModal} />

      {/* Fast Quick Order WhatsApp Modal */}
      <QuickOrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrderModal}
        selectedProduct={selectedProduct}
        prefilledFit={prefilledFit}
      />

      {/* Universal Store Image Studio Modal */}
      <ImageUploadModal
        isOpen={isImageStudioOpen}
        onClose={() => setIsImageStudioOpen(false)}
        initialSlotKey={studioInitialSlotKey}
      />
    </div>
  );
}

