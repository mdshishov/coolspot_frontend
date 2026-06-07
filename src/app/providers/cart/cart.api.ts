import { api } from "../../api/axios";
import type {
  CartSummary,
  SetPositionPayload,
} from "@/shared/types/cart.types";

export const cartApi = {
  async getSummary(): Promise<CartSummary> {
    const response = await api.get<CartSummary>("/cart/summary");
    return response.data;
  },

  async setPosition(payload: SetPositionPayload): Promise<CartSummary> {
    const response = await api.post<CartSummary>("/cart/set-position", payload);
    return response.data;
  },
};
