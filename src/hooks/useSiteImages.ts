import { useState, useEffect, useCallback } from 'react';
import { ProductItem } from '../types';
import {
  getAllCustomSiteImages,
  saveSlotImage,
  resetSlotImage,
  resetAllSiteImages,
  exportCustomImagesJson,
  importCustomImagesJson,
  SiteImagesMap,
} from '../utils/imageManager';
import { getAllImageSlots } from '../utils/imageSlotsRegistry';

export function useSiteImages() {
  const [imagesMap, setImagesMap] = useState<SiteImagesMap>(() => getAllCustomSiteImages());

  useEffect(() => {
    const handleUpdate = () => {
      setImagesMap(getAllCustomSiteImages());
    };

    window.addEventListener('mazajwear_images_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('mazajwear_images_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  /**
   * Retrieves current active image for a given slot key, falling back to defaultUrl
   */
  const getImage = useCallback(
    (slotKey: string, defaultUrl = ''): string => {
      if (imagesMap[slotKey]) {
        return imagesMap[slotKey];
      }
      return defaultUrl;
    },
    [imagesMap]
  );

  /**
   * Specifically resolves product images considering color variants
   */
  const getProductImage = useCallback(
    (product: ProductItem, selectedColor?: string | null): string => {
      // 1. Color variant override
      if (selectedColor) {
        const colorKey = `product:${product.id}:${selectedColor}`;
        if (imagesMap[colorKey]) {
          return imagesMap[colorKey];
        }
      }

      // 2. Product main image override
      const mainKey = `product:${product.id}`;
      if (imagesMap[mainKey]) {
        return imagesMap[mainKey];
      }

      // 3. Static color image from code
      if (selectedColor && product.colorImages && product.colorImages[selectedColor]) {
        return product.colorImages[selectedColor];
      }

      // 4. Default product image
      return product.image;
    },
    [imagesMap]
  );

  const isCustomized = useCallback(
    (slotKey: string): boolean => {
      return !!imagesMap[slotKey];
    },
    [imagesMap]
  );

  const isProductCustomized = useCallback(
    (productId: string, selectedColor?: string | null): boolean => {
      if (selectedColor && imagesMap[`product:${productId}:${selectedColor}`]) {
        return true;
      }
      return !!imagesMap[`product:${productId}`];
    },
    [imagesMap]
  );

  return {
    imagesMap,
    getImage,
    getProductImage,
    isCustomized,
    isProductCustomized,
    updateSlot: saveSlotImage,
    resetSlot: resetSlotImage,
    resetAll: resetAllSiteImages,
    exportJson: exportCustomImagesJson,
    importJson: importCustomImagesJson,
    allSlots: getAllImageSlots(),
  };
}
