import { api } from "@/app/api/axios";

import type {
  CreateOrderPayload,
  CreateOrderResponse,
  CreateOrderError,
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
};
