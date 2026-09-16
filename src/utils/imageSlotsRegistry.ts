import { PRODUCTS, FABRICS } from '../data/content';
import { ImageSlotMeta } from './imageManager';

export const HERO_DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85';

export const PRINTING_DEFAULT_IMAGES = {
  'printing:step-1':
    '/images/printing/design.png',
  'printing:step-2':
    '/images/printing/dtf-film.png',
  'printing:step-3':
    '/images/printing/heat-press.png',
};

export const GALLERY_DEFAULT_ITEMS = [
  {
    key: 'gallery:item-1',
    title: 'تيشيرت أوفرسايز مكحوت طباعة يابانية',
    defaultImage:
      '/images/gallery/gallery-1.jpg',
    description: 'صورة واقعية لتيشيرت مكحوت رصاصي مع تصميم أنمي/ستريتوير خلفي عالي الدقة.',
  },
  {
    key: 'gallery:item-2',
    title: 'هودي شتوي أسود فليس طباعة صدر وظهر',
    defaultImage:
      '/images/gallery/gallery-2.jpg',
    description: 'صورة واقعية لهودي شتوي مبطن قطن ناعم مع طباعة شعار وبراند خاص.',
  },
  {
    key: 'gallery:item-3',
    title: 'تيشيرت أبيض قطن طبيعي 100% طباعة سينمائية',
    defaultImage:
      '/images/gallery/gallery-3.jpg',
    description: 'ألوان زاهية وتباين فائق على القماش الأبيض بضمان عدم التشقق.',
  },
  {
    key: 'gallery:item-4',
    title: 'تجهيز طلبية زبون وتغليف مزاج وير الفاخر',
    defaultImage:
      '/images/gallery/gallery-4.jpg',
    description: 'جاهزية الشحن والتوصيل لكافة محافظات العراق بسعر 4,000 د.ع فقط.',
  },
];

/**
 * Builds the complete flat list of all image slots available on the website
 */
export function getAllImageSlots(): ImageSlotMeta[] {
  const slots: ImageSlotMeta[] = [];

  // 1. Hero banner
  slots.push({
    key: 'hero:banner',
    category: 'hero',
    categoryLabel: 'واجهة المتجر الرئيسية (Hero)',
    title: 'صورة الواجهة الرئيسية للموقع',
    description: 'الصورة الكبرى البارزة أعلى الموقع بجانب عنوان مزاج وير الرئيسي.',
    defaultImage: HERO_DEFAULT_IMAGE,
    aspectRatio: '4/5',
  });

  // 2. All Products + Color variants
  PRODUCTS.forEach((product) => {
    // Main image
    slots.push({
      key: `product:${product.id}`,
      category: 'products',
      categoryLabel: 'المنتجات والتيشيرتات',
      title: product.name,
      description: `الصورة الأساسية المعروضة لمنتج: ${product.name} (${product.categoryName}).`,
      defaultImage: product.image,
      aspectRatio: '4/4.2',
    });

    // Color variant images
    if (product.colors && product.colors.length > 0) {
      product.colors.forEach((colorName) => {
        const colorDefault =
          product.colorImages && product.colorImages[colorName]
            ? product.colorImages[colorName]
            : product.image;

        slots.push({
          key: `product:${product.id}:${colorName}`,
          category: 'products',
          categoryLabel: 'المنتجات والتيشيرتات',
          title: `${product.name} - لون (${colorName})`,
          description: `صورة المنتج المخصصة عند اختيار لون ${colorName}.`,
          defaultImage: colorDefault,
          aspectRatio: '4/4.2',
          subOption: colorName,
        });
      });
    }
  });

  // 3. Fabrics
  FABRICS.forEach((fabric) => {
    slots.push({
      key: `fabric:${fabric.id}`,
      category: 'fabrics',
      categoryLabel: 'معرض دليل الخامات',
      title: fabric.title,
      description: `صورة تفاصيل نسيج وقماش: ${fabric.title} (${fabric.gsm}).`,
      defaultImage: fabric.image,
      aspectRatio: '16/10',
    });
  });

  // 4. Printing Process
  slots.push({
    key: 'printing:step-1',
    category: 'printing',
    categoryLabel: 'مراحل وتقنية الطباعة',
    title: '1. معالجة وتجهيز دقيق للملف',
    description: 'صورة شاشة التصميم الرقمي وضبط أبعاد العمل.',
    defaultImage: PRINTING_DEFAULT_IMAGES['printing:step-1'],
    aspectRatio: '16/9',
  });
  slots.push({
    key: 'printing:step-2',
    category: 'printing',
    categoryLabel: 'مراحل وتقنية الطباعة',
    title: '2. طباعة DTF بأحبار يابانية أصلية',
    description: 'صورة مكينة وطابعة فيلم DTF فائقة الوضوح.',
    defaultImage: PRINTING_DEFAULT_IMAGES['printing:step-2'],
    aspectRatio: '16/9',
  });
  slots.push({
    key: 'printing:step-3',
    category: 'printing',
    categoryLabel: 'مراحل وتقنية الطباعة',
    title: '3. كبس حراري وفحص الجودة',
    description: 'صورة ماكينة الكبس الحراري والتثبيت على الأقمشة.',
    defaultImage: PRINTING_DEFAULT_IMAGES['printing:step-3'],
    aspectRatio: '16/9',
  });

  // 5. Real Gallery Lookbook
  GALLERY_DEFAULT_ITEMS.forEach((item) => {
    slots.push({
      key: item.key,
      category: 'gallery',
      categoryLabel: 'معرض الأعمال والصور الواقعية',
      title: item.title,
      description: item.description,
      defaultImage: item.defaultImage,
      aspectRatio: '4/3',
    });
  });

  return slots;
}
