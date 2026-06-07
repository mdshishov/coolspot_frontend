import type { CartSummary } from "@/shared/types/cart.types";

export type NormalizedSummary = {
  totalDishes: number;
  positions: Record<number, number>;
};

export const normalizeSummary = (data: CartSummary): NormalizedSummary => {
  const map: Record<number, number> = {};

  data.positions.forEach((p) => {
    map[p.dish_id] = p.quantity;
  });

  return {
    totalDishes: data.total_dishes,
    positions: map,
  };
};
