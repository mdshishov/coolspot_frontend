import type { MenuMeta } from "@/shared/types/menu.types";
import type { MenuLink } from "./menu.types";

const TAGS_ORDER = [
  { slug: "new", title: "Новинки" },
  { slug: "seasonal", title: "Сезонное меню" },
];

export function buildMenuLinks(meta: MenuMeta): MenuLink[] {
  const links: MenuLink[] = [];

  const tagsMap = new Map(meta.tags.map((tag) => [tag.slug, tag]));
  TAGS_ORDER.forEach((config) => {
    const tag = tagsMap.get(config.slug);
    if (!tag) return;

    links.push({
      slug: tag.slug,
      title: config.title ?? tag.title,
    });
  });

  meta.categories.forEach(({ slug, title }) => {
    links.push({ slug, title });
  });
  return links;
}
