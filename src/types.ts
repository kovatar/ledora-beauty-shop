export interface Product {
  id: string;
  title: string;
  englishTitle?: string;
  brand: string;
  brandFa: string;
  subBrand?: 'ldora-care' | 'ldora-herbal' | 'ldora-beauty' | 'pristive' | 'ellix' | 'elen-beauty' | string;
  subBrandFa?: string;
  category: 'skincare' | 'makeup' | 'haircare' | 'fragrance' | 'health-body';
  categoryFa: string;
  price: number; // in Toman
  discountPercent: number; // 0 to 100
  finalPrice: number; // in Toman
  rating: number; // 1 to 5
  reviewCount: number;
  image: string;
  secondaryImage: string;
  stock: number;
  isFlashSale?: boolean;
  flashRemainingStock?: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isDermApproved?: boolean;
  skinType?: string[];
  volume?: string;
  origin?: string;
  ingredients?: string[];
  description?: string;
  usageInstructions?: string;
  guaranteedAuthentic: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CategoryItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  color: string;
  badge?: string;
}

export interface BrandItem {
  id: string;
  name: string;
  nameFa: string;
  logo: string;
  tagline: string;
}

export interface ActiveFilters {
  searchQuery: string;
  category: string;
  brand: string;
  subBrand: string;
  skinType: string;
  onlyInStock: boolean;
  onlyDiscounted: boolean;
  sortBy: 'recommended' | 'bestselling' | 'cheapest' | 'priciest' | 'newest' | 'discounted';
}

export interface UserProfile {
  name: string;
  phone: string;
  isLoggedIn: boolean;
  walletBalance: number;
  clubPoints: number;
}
