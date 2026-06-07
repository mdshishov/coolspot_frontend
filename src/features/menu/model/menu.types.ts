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
      status: "error";
      message: string;
    }
  | {
      status: "success";
      products: Product[];
    };
