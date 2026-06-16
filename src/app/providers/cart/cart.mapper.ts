import type {
  CartSummary,
  CartWarning,
  NormalizedSetPositionResponse,
  NormalizedSummary,
  SetPositionResponse,
} from "@/shared/types/cart.types";

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

export const normalizeSetResponse = (
  data: SetPositionResponse,
): NormalizedSetPositionResponse => {
  const warnings: Record<number, CartWarning> = {};

  const normalizedSummary = normalizeSummary(data.cart_summary);

  data.warnings.forEach((warning) => {
    const existing = warnings[warning.dish_id];
    if (existing?.code === "dish_unavailable") return;

    warnings[warning.dish_id] = { ...warning };
  });

  return { ...normalizedSummary, warnings };
};
