import { useSiteImages } from './useSiteImages';

export function useProductCustomImages() {
  const {
    imagesMap,
    getProductImage,
    isProductCustomized,
    updateSlot,
    resetSlot,
    resetAll,
  } = useSiteImages();

  return {
    overrides: imagesMap,
    getProductImage,
    hasCustomOverride: isProductCustomized,
    updateImage: (productId: string, imageUrl: string, colorName?: string) => {
      const key = colorName ? `product:${productId}:${colorName}` : `product:${productId}`;
      return updateSlot(key, imageUrl);
    },
    resetImage: (productId: string, colorName?: string) => {
      const key = colorName ? `product:${productId}:${colorName}` : `product:${productId}`;
      return resetSlot(key);
    },
    resetAll,
  };
}
