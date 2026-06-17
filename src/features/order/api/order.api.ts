import { api } from "@/app/api/axios";

import type {
  CreateOrderPayload,
  CreateOrderResponse,
  CreateOrderError,
  Order,
} from "../model/order.types";

export const orderApi = {
  async create(
    payload: CreateOrderPayload,
  ): Promise<CreateOrderResponse | CreateOrderError> {
    const response = await api.post<CreateOrderResponse | CreateOrderError>(
      "/orders/create/",
      payload,
    );
    return response.data;
  },

  async getAll(): Promise<Order[]> {
    const response = await api.get<Order[]>("/orders/");

    return response.data;
  },
};
