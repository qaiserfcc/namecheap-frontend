import { apiClient } from '@/lib/api-client';
import { Cart, CartItem } from '@/types/cart';

const mapCart = (data: any): Cart => {
  const items: CartItem[] = (data.items || []).map((item: any) => ({
    id: item.id,
    productId: item.product_id,
    name: item.name,
    description: item.description,
    imageUrl: item.image_url,
    quantity: item.quantity,
    price: Number(item.price),
  }));

  const subtotal = items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0);

  return {
    id: data.id,
    items,
    subtotal,
    total: Number(data.total ?? subtotal),
  };
};

/**
 * Cart Service
 * 
 * Handles all shopping cart-related API calls to the backend Cart service
 */

export const cartService = {
  /**
   * Get user's cart
   */
  async getCart() {
    const response = await apiClient.get<Cart>('/api/cart');
    return { ...response, data: mapCart(response.data) };
  },

  /**
   * Add item to cart
   */
  async addToCart(productId: string | number, quantity: number) {
    const response = await apiClient.post<Cart>('/api/cart/items', { productId, quantity });
    return { ...response, data: mapCart(response.data) };
  },

  /**
   * Update cart item quantity
   */
  async updateCartItem(itemId: string | number, quantity: number) {
    const response = await apiClient.put<Cart>(`/api/cart/items/${itemId}`, { quantity });
    return { ...response, data: mapCart(response.data) };
  },

  /**
   * Remove item from cart
   */
  async removeFromCart(itemId: string | number) {
    const response = await apiClient.delete<Cart>(`/api/cart/items/${itemId}`);
    return { ...response, data: mapCart(response.data) };
  },

  /**
   * Clear entire cart
   */
  async clearCart() {
    return apiClient.delete<void>('/api/cart');
  },

  /**
   * Apply discount code
   */
  async applyDiscount(code: string) {
    return apiClient.post<Cart>('/api/cart/discount', { code });
  },

  /**
   * Remove discount
   */
  async removeDiscount() {
    return apiClient.delete<Cart>('/api/cart/discount');
  },
};
