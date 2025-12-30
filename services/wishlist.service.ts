import { apiClient } from '@/lib/api';
import { Wishlist, WishlistItem } from '@/types/wishlist';

const mapWishlist = (data: any): Wishlist => {
  const items: WishlistItem[] = (data.items || []).map((item: any) => ({
    id: item.id,
    productId: item.product_id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    imageUrl: item.image_url,
    stockQuantity: item.stock_quantity,
    createdAt: item.created_at,
  }));

  return {
    id: data.id,
    items,
    totalItems: data.totalItems ?? items.length,
  };
};

export const wishlistService = {
  async getWishlist() {
    const response = await apiClient.get<Wishlist>('/api/wishlist');
    return { ...response, data: mapWishlist(response.data) };
  },

  async addItem(productId: string | number) {
    const response = await apiClient.post<Wishlist>('/api/wishlist/items', { productId });
    return { ...response, data: mapWishlist(response.data) };
  },

  async removeItem(itemId: string | number) {
    const response = await apiClient.delete<Wishlist>(`/api/wishlist/items/${itemId}`);
    return { ...response, data: mapWishlist(response.data) };
  },

  async clearWishlist() {
    const response = await apiClient.delete<Wishlist>('/api/wishlist');
    return { ...response, data: mapWishlist(response.data) };
  },
};