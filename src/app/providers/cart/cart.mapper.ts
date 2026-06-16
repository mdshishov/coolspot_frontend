import type {
  CartResponse,
  CartState,
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

export const normalizeWarnings = (
  warnings: CartWarning[],
): Record<number, CartWarning> => {
  const map: Record<number, CartWarning> = {};

  warnings.forEach((warning) => {
    const current = map[warning.dish_id];
    if (current?.code === "dish_unavailable") {
      return;
    }
    map[warning.dish_id] = warning;
  });

  return map;
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

export const normalizeCart = (data: CartResponse): CartState => {
  const warnings: Record<number, CartWarning> = {};

  data.warnings.forEach((warning) => {
    warnings[warning.dish_id] = warning;
  });

  return {
    totalDishes: data.cart.total_dishes,
    selectedPrice: data.cart.selected_price,
    warnings,
    positions: data.cart.positions.map((p) => ({
      product: p.dish,
      quantity: p.quantity,
      isAvailable: p.is_available,
      isSelected: p.is_selected,
      changed: !!warnings[p.dish.id],
    })),
  };
};
