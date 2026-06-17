import type { Product } from "@/shared/types/product.types";
import type { CartWarning } from "@/shared/types/cart.types";

export type CreateOrderPayload = {
  address: string;
  comment?: string;
};

export type OrderPosition = {
  dish: Product;
  dish_title: string;
  dish_price: number;
  quantity: number;
  total_price: number;
};

export type Order = {
  id: number;
  status: string;
  address: string;
  comment?: string;
  created_at: string;
  total_price: number;
  positions: OrderPosition[];
};

export type CreateOrderResponse = Order;

export type CreateOrderError = {
  warnings: CartWarning[];
};
