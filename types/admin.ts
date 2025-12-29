export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  recentOrders: Order[];
  topProducts: Product[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  sub_category: string;
  stock_quantity: number;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id?: number;
  product_id?: number;
  name: string;
  sku: string;
  price: number;
  stock_quantity: number;
  attributes: { [key: string]: string };
}

export interface Order {
  id: number;
  user_id: number;
  user_email?: string;
  user_name?: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'completed' | 'failed';
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  variant_id?: number;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: 'customer' | 'admin';
  is_active: boolean;
  created_at: string;
}

export interface Discount {
  id: number;
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_discount_amount?: number;
  usage_limit?: number;
  used_count: number;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
}

export interface CSVProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  sub_category: string;
  stock_quantity: number;
  image_url: string;
  variants?: string; // JSON string of variants
}
