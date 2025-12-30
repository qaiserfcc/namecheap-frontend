import { apiClient } from '@/lib/api';
import { Product } from '@/types/product';

/**
 * Product Service
 * 
 * Handles all product-related API calls to the backend Product service
 */

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Domain Package',
    description: 'Get started with our premium domain registration and hosting bundle',
    price: 99.99,
    discountPrice: 149.99,
    image: '/products/domain-1.jpg',
    category: 'Domains',
    stock: 100,
    rating: 5,
    reviews: 234,
  },
  {
    id: '2',
    name: 'SSL Certificate Pro',
    description: 'Secure your website with industry-leading SSL encryption',
    price: 49.99,
    discountPrice: 79.99,
    image: '/products/ssl-1.jpg',
    category: 'Security',
    stock: 50,
    rating: 4.8,
    reviews: 189,
  },
  {
    id: '3',
    name: 'Web Hosting Plus',
    description: 'Fast, reliable hosting with 99.9% uptime guarantee',
    price: 79.99,
    image: '/products/hosting-1.jpg',
    category: 'Hosting',
    stock: 75,
    rating: 4.9,
    reviews: 567,
  },
  {
    id: '4',
    name: 'Email Professional',
    description: 'Professional email hosting for your business',
    price: 29.99,
    image: '/products/email-1.jpg',
    category: 'Email',
    stock: 120,
    rating: 4.7,
    reviews: 342,
  },
  {
    id: '5',
    name: 'Domain Privacy',
    description: 'Protect your personal information with domain privacy',
    price: 9.99,
    discountPrice: 14.99,
    image: '/products/privacy-1.jpg',
    category: 'Security',
    stock: 200,
    rating: 4.6,
    reviews: 123,
  },
  {
    id: '6',
    name: 'Website Builder',
    description: 'Build your professional website with drag-and-drop ease',
    price: 39.99,
    image: '/products/builder-1.jpg',
    category: 'Hosting',
    stock: 90,
    rating: 4.5,
    reviews: 278,
  },
  {
    id: '7',
    name: 'VPS Hosting',
    description: 'Dedicated resources for high-performance applications',
    price: 199.99,
    image: '/products/vps-1.jpg',
    category: 'Hosting',
    stock: 30,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: '8',
    name: 'CDN Service',
    description: 'Speed up your website with global content delivery',
    price: 59.99,
    image: '/products/cdn-1.jpg',
    category: 'Hosting',
    stock: 0,
    rating: 4.7,
    reviews: 89,
  },
];

export const productService = {
  /**
   * Get all products with optional filters
   */
  async getProducts(params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<Product[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.append('category', params.category);
      if (params?.search) queryParams.append('search', params.search);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const response = await apiClient.get(`/products${query}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return defaultProducts;
    }
  },

  /**
   * Get a single product by ID
   */
  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch product ${id}:`, error);
      const fallback = defaultProducts.find(p => p.id === id);
      return fallback || null;
    }
  },

  /**
   * Get product categories
   */
  async getCategories(): Promise<string[]> {
    try {
      const response = await apiClient.get('/products/categories');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return ['Domains', 'Hosting', 'Security', 'Email'];
    }
  },

  /**
   * Search products
   */
  async searchProducts(query: string): Promise<Product[]> {
    try {
      const response = await apiClient.get(`/products/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Failed to search products:', error);
      const searchLower = query.toLowerCase();
      return defaultProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      );
    }
  },

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await apiClient.get(`/products/featured?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
      return defaultProducts.slice(0, limit);
    }
  },
};
