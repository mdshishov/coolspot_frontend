import { api } from "../../api/axios";
import type {
  CartResponse,
  CartSummary,
  SetPositionPayload,
  SetPositionResponse,
} from "@/shared/types/cart.types";

export const cartApi = {
  async getSummary(): Promise<CartSummary> {
    const response = await api.get<CartSummary>("/cart/summary/");
    return response.data;
  },

  async setPosition(payload: SetPositionPayload): Promise<SetPositionResponse> {
    const response = await api.post<SetPositionResponse>(
      "/cart/set-position/",
      payload,
    );
    return response.data;
  },

  async getCart(): Promise<CartResponse> {
    const response = await api.get<CartResponse>("/cart/");
    return response.data;
  },
};
