import type { Product } from "@/shared/types/product.types";

export type ProductGroup = {
  slug: string;
  title: string;
  products: Product[];
};
