export type Role = 'CUSTOMER' | 'PRO' | 'ADMIN';

export type OrderStatus =
  | 'PENDING'
  | 'PAYMENT_FAILED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentStatus = 'UNPAID' | 'PAID' | 'REFUNDED' | 'PARTIALLY_REFUNDED';

export interface ProductSpecificationType {
  id?: string;
  brand: string;
  modelNumber?: string | null;
  voltage?: string | null;
  amperage?: string | null;
  wattage?: string | null;
  frequency?: string | null;
  ipRating?: string | null;
  ikRating?: string | null;
  curveType?: string | null;
  polesCount?: string | null;
  differentialSensitivity?: string | null;
  cableCrossSection?: string | null;
  certification?: string | null;
  material?: string | null;
  weightKg?: number | null;
  warrantyYears?: number;
  countryOfOrigin?: string | null;
  extraSpecs?: Record<string, unknown> | null;
}

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  sku: string;
  barcode?: string | null;
  description: string;
  shortDescription?: string | null;
  priceInCents: number;
  compareAtPriceInCents?: number | null;
  costPriceInCents?: number | null;
  taxRate: number;
  stock: number;
  lowStockThreshold: number;
  isPublished: boolean;
  isFeatured: boolean;
  images: string[];
  categoryId: string;
  subCategoryId?: string | null;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  specification?: ProductSpecificationType | null;
  reviewsCount?: number;
  averageRating?: number;
}

export interface CartItemType {
  product: ProductType;
  quantity: number;
}

export interface FilterState {
  search: string;
  category: string;
  brand: string[];
  voltage: string[];
  amperage: string[];
  ipRating: string[];
  minPrice: number;
  maxPrice: number;
  onlyInStock: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'stock';
}
