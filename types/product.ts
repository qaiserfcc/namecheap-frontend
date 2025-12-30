export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number; // originalPrice in ProductCard
  category: string;
  image?: string; // imageUrl in ProductCard
  images?: string[];
  stock: number;
  rating?: number;
  reviews?: number; // reviewCount in ProductCard
  sku?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  inStock?: boolean;
}
