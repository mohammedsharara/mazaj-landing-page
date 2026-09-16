export type Season = 'summer' | 'winter' | 'all';

export type ProductCategory = 'tshirts' | 'makhoot' | 'gym' | 'hoodies';

export interface PriceOptions {
  plain?: string; // سادة
  singleSide?: string; // جهة واحدة
  bothSides?: string; // جهتين
  fullPrint?: string; // مطبوع كامل
}

export interface ProductItem {
  id: string;
  name: string;
  season: Season;
  category: ProductCategory;
  categoryName: string;
  fabric: string;
  fit: string;
  sizes: string[];
  colors?: string[];
  colorImages?: Record<string, string>;
  price: string;
  priceOptions?: PriceOptions;
  image: string;
  tag?: string;
  description: string;
  warranty?: string;
  printNotice?: string;
}

export interface FabricItem {
  id: string;
  title: string;
  gsm?: string;
  feel: string;
  bestUse: string;
  suitableFit: string;
  summary: string;
  image: string;
}

export interface SizeMeasurement {
  size: string;
  chest: string;
  length: string;
  shoulder?: string;
  sleeve?: string;
  waist?: string;
}

export interface PrintingStep {
  number: string;
  title: string;
  desc: string;
  detail: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
