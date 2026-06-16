import { useCart } from "@/shared/hooks/useCart";
import { useMemo } from "react";

export function useCartPage() {
  const { cartPositions, selectedPrice, warnings } = useCart();

  const selected = useMemo(
    () => cartPositions.filter((p) => p.is_selected),
    [cartPositions],
  );

  const selectedCount = useMemo(
    () => selected.reduce((sum, p) => sum + p.quantity, 0),
    [selected],
  );

  const discount = useMemo(
    () =>
      selected.reduce(
        (sum, p) => sum + (p.dish.price.base - p.dish.price.final) * p.quantity,
        0,
      ),
    [selected],
  );

  return {
    positions: cartPositions,
    selectedPrice,
    selectedCount,
    discount,
    hasWarnings: Object.keys(warnings).length > 0,
  };
}
