import type { Product } from "./product.types";

export type CartSummary = {
  total_dishes: number;
  positions: {
    dish_id: number;
    quantity: number;
  }[];
};

export type SetPositionPayload = {
  dish_id: number;
  quantity?: number;
  is_selected?: boolean;
};

export type CartWarning = {
  code: "dish_unavailable" | "max_per_order_exceeded";
  dish_id: number;
  message: string;
};

export type SetPositionResponse = {
  cart_summary: CartSummary;
  warnings: CartWarning[];
};

export type NormalizedSummary = {
  totalDishes: number;
  positions: Record<number, number>;
};

export type NormalizedSetPositionResponse = {
  totalDishes: number;
  positions: Record<number, number>;
  warnings: Record<number, CartWarning>;
};

export type CartResponse = {
  cart: {
    total_dishes: number;
    selected_price: number;
    positions: {
      dish: Product;
      quantity: number;
      is_available: boolean;
      is_selected: boolean;
    }[];
  };
  warnings: CartWarning[];
};

export type CartItem = {
  product: Product;
  quantity: number;
  isAvailable: boolean;
  isSelected: boolean;
  changed?: boolean;
};

export type CartState = {
  totalDishes: number;
  selectedPrice: number;
  positions: CartItem[];
  warnings: Record<number, CartWarning>;
};
