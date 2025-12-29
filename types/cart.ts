export interface CartItem {
  id: number | string;
  productId: number | string;
  name: string;
  description?: string;
  imageUrl?: string;
  quantity: number;
  price: number;
}

export interface Cart {
  id: number | string;
  items: CartItem[];
  subtotal?: number;
  discount?: number;
  total: number | string;
  discountCode?: string;
  createdAt?: string;
  updatedAt?: string;
}
