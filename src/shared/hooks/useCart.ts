import { useContext } from "react";

import { CartContext } from "@/app/providers/cart/CartProvider";

export function useAuth() {
  return useContext(CartContext);
}
