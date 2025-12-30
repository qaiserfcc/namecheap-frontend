import { apiClient } from '@/lib/api';
import type { AdminStats, Product, ProductVariant, Order, User, Discount, CSVProduct } from '@/types/admin';

class AdminService {
  async getDashboardStats(): Promise<AdminStats> {
    const response = await apiClient.get<AdminStats>('/api/admin/dashboard');
    return response.data;
  }

  private buildQuery(params?: Record<string, string | number | boolean | undefined>) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === '') return;
        queryParams.set(key, String(value));
      });
    }
    const query = queryParams.toString();
    return query ? `?${query}` : '';
  }

  private normalizeDiscountPayload(discount: Partial<Discount> & Record<string, any>) {
    return {
      code: discount.code,
      description: discount.description,
      discountType: discount.discountType ?? discount.discount_type,
      discountValue: discount.discountValue ?? discount.discount_value,
      minOrderAmount: discount.minOrderAmount ?? discount.min_order_amount,
      maxDiscountAmount: discount.maxDiscountAmount ?? discount.max_discount_amount,
      usageLimit: discount.usageLimit ?? discount.usage_limit,
      validFrom: discount.validFrom ?? discount.valid_from,
      validUntil: discount.validUntil ?? discount.valid_until,
      isActive: discount.isActive ?? discount.is_active,
    };
  }

  // Product Management
  async getProducts(params?: { category?: string; search?: string }): Promise<Product[]> {
    const query = this.buildQuery({ category: params?.category, search: params?.search });
    const response = await apiClient.get(`/api/admin/products${query}`);
    return response.data;
  }

  async getProduct(id: number): Promise<Product> {
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data;
  }

  async createProduct(product: Partial<Product>): Promise<Product> {
    const response = await apiClient.post('/api/products', product);
    return response.data;
  }

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    const response = await apiClient.put(`/api/products/${id}`, product);
    return response.data;
  }

  async deleteProduct(id: number): Promise<void> {
    await apiClient.delete(`/api/products/${id}`);
  }

  async toggleProductStatus(id: number): Promise<Product> {
    const response = await apiClient.patch(`/api/products/${id}/toggle`, {});
    return response.data;
  }

  // Product Variants
  async createVariant(productId: number, variant: ProductVariant): Promise<ProductVariant> {
    const response = await apiClient.post(`/api/products/${productId}/variants`, variant);
    return response.data;
  }

  async updateVariant(productId: number, variantId: number, variant: Partial<ProductVariant>): Promise<ProductVariant> {
    const response = await apiClient.put(`/api/products/${productId}/variants/${variantId}`, variant);
    return response.data;
  }

  async deleteVariant(productId: number, variantId: number): Promise<void> {
    await apiClient.delete(`/api/products/${productId}/variants/${variantId}`);
  }

  // Bulk Upload
  async uploadProductsCSV(file: File): Promise<{ success: number; failed: number; errors: string[] }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/api/products/bulk-upload', formData);
    return response.data;
  }

  async downloadCSVTemplate(): Promise<Blob> {
    const response = await apiClient.get<Blob>('/api/products/csv-template', { responseType: 'blob' });
    return response.data;
  }

  // Order Management
  async getOrders(params?: { status?: string; page?: number }): Promise<Order[]> {
    const query = this.buildQuery({ status: params?.status, page: params?.page });
    const response = await apiClient.get(`/api/admin/orders${query}`);
    return response.data;
  }

  async getOrder(id: number): Promise<Order> {
    const response = await apiClient.get(`/api/orders/${id}`);
    return response.data;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const response = await apiClient.put(`/api/orders/${id}/status`, { status });
    return response.data;
  }

  // User Management
  async getUsers(params?: { role?: string; search?: string }): Promise<User[]> {
    const query = this.buildQuery({ role: params?.role, q: params?.search });
    const response = await apiClient.get(`/api/admin/users${query}`);
    return response.data;
  }

  async updateUserRole(id: number, role: 'customer' | 'admin'): Promise<User> {
    const response = await apiClient.put(`/api/admin/users/${id}/role`, { role });
    return response.data;
  }

  async toggleUserStatus(id: number): Promise<User> {
    const response = await apiClient.patch(`/api/admin/users/${id}/toggle`, {});
    return response.data;
  }

  // Discount Management
  async getDiscounts(): Promise<Discount[]> {
    const response = await apiClient.get('/api/discounts');
    return response.data;
  }

  async createDiscount(discount: Partial<Discount>): Promise<Discount> {
    const response = await apiClient.post('/api/discounts', this.normalizeDiscountPayload(discount));
    return response.data;
  }

  async updateDiscount(id: number, discount: Partial<Discount>): Promise<Discount> {
    const response = await apiClient.put(`/api/discounts/${id}`, this.normalizeDiscountPayload(discount));
    return response.data;
  }

  async deleteDiscount(id: number): Promise<void> {
    await apiClient.delete(`/api/discounts/${id}`);
  }

  async toggleDiscountStatus(id: number): Promise<Discount> {
    const response = await apiClient.patch(`/api/discounts/${id}/toggle`, {});
    return response.data;
  }
}

export const adminService = new AdminService();
