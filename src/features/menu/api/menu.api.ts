import { api } from "@/app/api/axios";
import type { MenuMeta } from "@/shared/types/menu.types";
import type { Product } from "@/shared/types/product.types";

export const menuApi = {
  async getMeta() {
    const response = await api.get<MenuMeta>("/menu/meta");
    return response.data;
  },

  async getProducts(params: { category?: string; tag?: string }) {
    const response = await api.get<Product[]>("/menu", { params });
    return response.data;
  },
};
