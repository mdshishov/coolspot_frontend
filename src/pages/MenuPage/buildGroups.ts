import type { MenuMeta } from "@/shared/types/menu.types";
import type { Product } from "@/shared/types/product.types";
import type { ProductGroup } from "./types";

function getProductPriority(product: Product): number {
  const tags = new Set(product.tags.map((t) => t.slug));

  let score = 0;

  if (product.price.discount_percent > 0) score -= 100;
  if (tags.has("new")) score -= 10;
  if (tags.has("seasonal")) score -= 5;

  return score;
}

export function buildGroups(
  products: Product[],
  meta: MenuMeta,
  isTag: boolean,
): ProductGroup[] {
  const orderedGroups: Array<{ slug: string; title: string }> = isTag
    ? meta.categories.map((c) => ({
        slug: c.slug,
        title: c.title,
      }))
    : meta.categories.flatMap((c) =>
        c.subcategories.map((s) => ({
          slug: s.slug,
          title: s.title,
        })),
      );

  const subcategoryToCategory: Record<string, string> = {};

  if (isTag) {
    for (const category of meta.categories) {
      for (const sub of category.subcategories) {
        subcategoryToCategory[sub.slug] = category.slug;
      }
    }
  }

  const groups: Record<string, ProductGroup> = {};

  for (const g of orderedGroups) {
    groups[g.slug] = {
      slug: g.slug,
      title: g.title,
      products: [],
    };
  }

  for (const product of products) {
    const groupSlug = isTag
      ? subcategoryToCategory[product.subcategory.slug]
      : product.subcategory.slug;

    if (!groupSlug || !groups[groupSlug]) continue;

    groups[groupSlug].products.push(product);
  }

  return orderedGroups
    .map((g) => groups[g.slug])
    .filter((group) => group.products.length > 0)
    .map((group) => ({
      ...group,
      products: group.products.sort(
        (a, b) => getProductPriority(a) - getProductPriority(b),
      ),
    }));
}
