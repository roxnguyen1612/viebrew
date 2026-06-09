export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string; // 'All Coffee' | 'Iced Coffee' | 'Hot Brew' | 'Non-Caffeine' | 'Pastries'
  sub?: string; // e.g. "Daily Special", "House Special"
  isBestseller?: boolean;
  tag?: 'Hot' | 'Iced' | 'Vegan' | 'Both';
  calories?: string;
  quality?: string;
}

export interface Customization {
  milk: string; // 'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'Soy Milk'
  sugar: string; // '0%' | '25%' | '50%' | '75%' | '100%'
  ice: string; // 'No Ice' | 'Less Ice' | 'Regular' | 'Extra Ice'
}

export interface CartItem {
  id: string; // Unique cart session ID
  product: Product;
  quantity: number;
  customization: Customization;
}

export type Screen = 'WELCOME' | 'HOME' | 'PRODUCT_DETAIL' | 'CART' | 'SELECT_LOCATION' | 'ORDER_CONFIRMED' | 'PROFILE';

export interface SavedAddress {
  label: string; // 'Home' | 'Work'
  address: string;
}

export interface Order {
  id: string;
  date: string;
  items: {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  serviceFee: number;
  total: number;
  status: 'pending' | 'brewing' | 'completed';
  estimatedTime: number; // minutes
  pickupLocation: string;
  isDelivery: boolean;
  deliveryAddress?: string;
}
