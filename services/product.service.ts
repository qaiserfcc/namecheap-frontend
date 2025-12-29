import { apiClient } from '@/lib/api-client';
import { Product } from '@/types/product';

/**
 * Product Service
 * 
 * Handles all product-related API calls to the backend Product service
 */

export const productService = {
  /**
   * Get all products with optional filters
   */
  async getProducts(params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return apiClient.get<Product[]>(`/api/products${query}`);
  },

  /**
   * Get a single product by ID
   */
  async getProductById(id: string) {
    return apiClient.get<Product>(`/api/products/${id}`);
  },

  /**
   * Get product categories
   */
  async getCategories() {
    return apiClient.get<string[]>('/api/products/categories');
  },

  /**
   * Search products
   */
  async searchProducts(query: string) {
    return apiClient.get<Product[]>(`/api/products/search?q=${encodeURIComponent(query)}`);
  },
};
