import { useContext } from "react";

import { CartContext } from "@/app/providers/cart/CartProvider";

export function useCart() {
  return useContext(CartContext);
}
