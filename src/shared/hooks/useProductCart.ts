import { useEffect, useMemo, useState } from "react";

import { useCart } from "@/shared/hooks/useCart";
import { useToast } from "@/shared/hooks/useToast";
import { useAuth } from "@/shared/hooks/useAuth";
import { useAuthModal } from "@/shared/hooks/useAuthModal";

import type { Product } from "@/shared/types/product.types";

export function useProductCart(product: Product) {
  const { getProductQuantity, setQuantity, warnings } = useCart();
  const { isAuthenticated } = useAuth();
  const { open } = useAuthModal();
  const { showInfo } = useToast();

  const [isAvailable, setIsAvailable] = useState(product.is_available);
  const [maxPerOrder, setMaxPerOrder] = useState(product.max_per_order);

  const cartQuantity = useMemo(
    () => getProductQuantity(product.id),
    [getProductQuantity, product.id],
  );

  useEffect(() => {
    setIsAvailable(product.is_available);

    setMaxPerOrder(product.max_per_order);
  }, [product]);

  useEffect(() => {
    const warning = warnings[product.id];
    if (!warning) return;

    switch (warning.code) {
      case "dish_unavailable":
        setIsAvailable(false);
        showInfo(`Позиция «${product.title}» временно недоступна для заказа.`);
        break;

      case "max_per_order_exceeded":
        setMaxPerOrder(cartQuantity);
        showInfo(
          "Были изменены ограничения на максимальное количество данной позиции.",
        );
        break;
    }
  }, [warnings, product.id, cartQuantity]);

  const update = async (quantity: number) => {
    if (!isAvailable) return;
    if (!isAuthenticated) {
      open();
      return;
    }

    const next = Math.max(0, quantity);
    if (maxPerOrder !== null && next > maxPerOrder) return;

    await setQuantity(product.id, next);
  };

  return {
    cartQuantity,
    isAvailable,
    maxPerOrder,

    increase: () => update(cartQuantity + 1),
    decrease: () => update(cartQuantity - 1),
    add: () => update(1),
  };
}
