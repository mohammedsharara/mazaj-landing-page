// Universal image management and persistence for Mazaj Wear
// Supports products, hero, fabrics, printing, and real proof gallery

const SITE_STORAGE_KEY = 'mazajwear_site_custom_images';
const LEGACY_PRODUCT_KEY = 'mazajwear_custom_product_images';

export interface SiteImagesMap {
  [slotKey: string]: string;
}

/**
 * Slot definitions metadata for easy categorization in the Image Studio
 */
export interface ImageSlotMeta {
  key: string;
  category: 'hero' | 'products' | 'fabrics' | 'printing' | 'gallery';
  categoryLabel: string;
  title: string;
  description: string;
  defaultImage: string;
  aspectRatio?: string;
  subOption?: string;
}

export function getAllCustomSiteImages(): SiteImagesMap {
  try {
    const raw = localStorage.getItem(SITE_STORAGE_KEY);
    const siteMap: SiteImagesMap = raw ? JSON.parse(raw) : {};

    // Merge with legacy product storage if exists
    const legacyRaw = localStorage.getItem(LEGACY_PRODUCT_KEY);
    if (legacyRaw) {
      try {
        const legacy = JSON.parse(legacyRaw);
        for (const prodId in legacy) {
          if (legacy[prodId].mainImage && !siteMap[`product:${prodId}`]) {
            siteMap[`product:${prodId}`] = legacy[prodId].mainImage;
          }
          if (legacy[prodId].colorImages) {
            for (const col in legacy[prodId].colorImages) {
              const colKey = `product:${prodId}:${col}`;
              if (!siteMap[colKey]) {
                siteMap[colKey] = legacy[prodId].colorImages[col];
              }
            }
          }
        }
      } catch (e) {
        // ignore
      }
    }

    return siteMap;
  } catch (e) {
    console.error('Failed to parse site custom images', e);
    return {};
  }
}

export function saveSlotImage(slotKey: string, imageUrl: string): SiteImagesMap {
  const current = getAllCustomSiteImages();
  current[slotKey] = imageUrl;

  try {
    localStorage.setItem(SITE_STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event('mazajwear_images_updated'));
  } catch (e) {
    console.error('Failed to save slot image to localStorage', e);
  }

  return current;
}

export function resetSlotImage(slotKey: string): SiteImagesMap {
  const current = getAllCustomSiteImages();
  if (current[slotKey]) {
    delete current[slotKey];
    localStorage.setItem(SITE_STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event('mazajwear_images_updated'));
  }
  return current;
}

export function resetAllSiteImages(): void {
  localStorage.removeItem(SITE_STORAGE_KEY);
  localStorage.removeItem(LEGACY_PRODUCT_KEY);
  window.dispatchEvent(new Event('mazajwear_images_updated'));
}

export function exportCustomImagesJson(): string {
  const images = getAllCustomSiteImages();
  return JSON.stringify(images, null, 2);
}

export function importCustomImagesJson(jsonStr: string): boolean {
  try {
    const parsed = JSON.parse(jsonStr);
    if (typeof parsed === 'object' && parsed !== null) {
      localStorage.setItem(SITE_STORAGE_KEY, JSON.stringify(parsed));
      window.dispatchEvent(new Event('mazajwear_images_updated'));
      return true;
    }
  } catch (e) {
    console.error('Invalid JSON import', e);
  }
  return false;
}

/**
 * Resizes an image file and compresses to high-quality JPEG Data URL
 * Uses smart sizing to prevent exceeding browser localStorage quota
 */
export function compressImageFile(file: File, maxDim = 1280, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
