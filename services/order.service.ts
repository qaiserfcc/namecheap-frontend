import { apiClient } from '@/lib/api';
import { Order, CreateOrderData } from '@/types/order';

/**
 * Order Service
 * 
 * Handles all order-related API calls to the backend Order service
 */

export const orderService = {
  /**
   * Get all orders for the current user
   */
  async getOrders(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return apiClient.get<Order[]>(`/api/orders${query}`);
  },

  /**
   * Get a single order by ID
   */
  async getOrderById(id: string) {
    return apiClient.get<Order>(`/api/orders/${id}`);
  },

  /**
   * Create a new order
   */
  async createOrder(data: CreateOrderData) {
    return apiClient.post<Order>('/api/orders', data);
  },

  /**
   * Cancel an order
   */
  async cancelOrder(id: string) {
    return apiClient.post<Order>(`/api/orders/${id}/cancel`);
  },

  /**
   * Get order tracking information
   */
  async getOrderTracking(id: string) {
    return apiClient.get<{ status: string; tracking: any }>(`/api/orders/${id}/tracking`);
  },
};
