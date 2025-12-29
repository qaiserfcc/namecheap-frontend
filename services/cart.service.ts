import { apiClient } from '@/lib/api-client';
import { Cart, CartItem } from '@/types/cart';

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
    return apiClient.get<Cart>('/api/cart');
  },

  /**
   * Add item to cart
   */
  async addToCart(productId: string, quantity: number) {
    return apiClient.post<Cart>('/api/cart/items', { productId, quantity });
  },

  /**
   * Update cart item quantity
   */
  async updateCartItem(itemId: string, quantity: number) {
    return apiClient.put<Cart>(`/api/cart/items/${itemId}`, { quantity });
  },

  /**
   * Remove item from cart
   */
  async removeFromCart(itemId: string) {
    return apiClient.delete<Cart>(`/api/cart/items/${itemId}`);
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
