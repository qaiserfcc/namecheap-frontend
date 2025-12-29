export interface WishlistItem {
  id: number | string;
  productId: number | string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  stockQuantity?: number;
  createdAt?: string;
}

export interface Wishlist {
  id: number | string;
  items: WishlistItem[];
  totalItems: number;
}