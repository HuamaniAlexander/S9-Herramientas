export type ScreenName = 
  | 'home' 
  | 'promotions' 
  | 'gallery' 
  | 'diagnostics' 
  | 'login' 
  | 'register';

export type DeviceFrameMode = 'responsive' | 'iphone' | 'android';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: 'keyboards' | 'mice' | 'monitors' | 'audio' | 'accessories';
  categoryLabel: string;
  description: string;
  priceClp: number;
  originalPriceClp?: number;
  discountPercent?: number;
  stockRemaining?: number;
  stockStatus: 'available' | 'limited' | 'in_stock';
  imageUrl: string;
  specs: {
    label: string;
    value: string;
  }[];
  highlightTag?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  code: string;
  imageUrl: string;
  aspectRatio: string;
  description: string;
  telemetry: {
    latency: string;
    chassis: string;
    sampling: string;
    tolerance: string;
    weight: string;
  };
}

export type HapticType = 
  | 'light' 
  | 'medium' 
  | 'heavy' 
  | 'selection' 
  | 'success' 
  | 'error' 
  | 'clack';

export type SwitchAudioProfile = 'linear-creamy' | 'blue-clicky' | 'magnetic-hall' | 'mute';
