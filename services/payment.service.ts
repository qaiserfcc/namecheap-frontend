import { apiClient } from '@/lib/api-client';
import { PaymentMethod, PaymentIntent } from '@/types/payment';

/**
 * Payment Service
 * 
 * Handles all payment-related API calls to the backend Payment service
 */

export const paymentService = {
  /**
   * Get available payment methods
   */
  async getPaymentMethods() {
    return apiClient.get<PaymentMethod[]>('/api/payments/methods');
  },

  /**
   * Create payment intent
   */
  async createPaymentIntent(orderId: string) {
    return apiClient.post<PaymentIntent>('/api/payments/intent', { orderId });
  },

  /**
   * Confirm payment
   */
  async confirmPayment(paymentIntentId: string, paymentMethodId: string) {
    return apiClient.post<{ success: boolean; order: any }>('/api/payments/confirm', {
      paymentIntentId,
      paymentMethodId,
    });
  },

  /**
   * Add payment method
   */
  async addPaymentMethod(data: Partial<PaymentMethod>) {
    return apiClient.post<PaymentMethod>('/api/payments/methods', data);
  },

  /**
   * Remove payment method
   */
  async removePaymentMethod(id: string) {
    return apiClient.delete<void>(`/api/payments/methods/${id}`);
  },
};
