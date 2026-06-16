import type { MenuMeta } from "@/shared/types/menu.types";
import type { Product } from "@/shared/types/product.types";

export type MenuMetaResult = {
  meta: MenuMeta | null;
  loading: boolean;
};

export type MenuResolveResult =
  | { status: "loading" }
  | { status: "not_found" }
  | {
      status: "redirect";
      to: string;
    }
  | {
      status: "success";
      isTag: boolean;
      apiParams: {
        category?: string;
        tag?: string;
      };
    };

export type MenuProductsResult =
  | { status: "loading" }
  | {
      status: "success";
      products: Product[];
    };

export type ProductGroup = {
  slug: string;
  title: string;
  products: Product[];
};

export type MenuLink = {
  slug: string;
  title: string;
};
