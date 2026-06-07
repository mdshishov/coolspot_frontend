import { useMemo } from "react";
import { useParams } from "react-router-dom";

import type { MenuResolveResult } from "../model/menu.types";
import type { MenuMeta } from "@/shared/types/menu.types";

export function useMenuResolver(meta: MenuMeta | null): MenuResolveResult {
  const { categorySlug } = useParams();

  return useMemo<MenuResolveResult>(() => {
    if (!meta) return { status: "loading" };

    if (!categorySlug) {
      const newTag = meta.tags.find((tag) => tag.slug === "new");
      if (newTag) return { status: "redirect", to: `/menu/${newTag.slug}` };

      const kitchenCategory = meta.categories.find(
        (category) => category.slug === "kitchen",
      );
      if (kitchenCategory)
        return { status: "redirect", to: `/menu/${kitchenCategory.slug}` };

      if (meta.categories.length === 0) return { status: "not_found" };
      return { status: "redirect", to: `/menu/${meta.categories[0].slug}` };
    }

    const tag = meta.tags.find((tag) => tag.slug === categorySlug);
    if (tag) {
      return {
        status: "success",
        isTag: true,
        apiParams: {
          tag: categorySlug,
        },
      };
    }

    const category = meta.categories.find(
      (category) => category.slug === categorySlug,
    );
    if (!category) return { status: "not_found" };
    return {
      status: "success",
      isTag: false,
      apiParams: {
        category: categorySlug,
      },
    };
  }, [meta, categorySlug]);
}
