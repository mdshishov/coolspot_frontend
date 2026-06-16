import { useMemo, useState } from "react";

import type { Product } from "@/shared/types/product.types";
import type { ProductGroup } from "@/pages/MenuPage/types";

import { MenuCard } from "../MenuCard/MenuCard";

import styles from "./ProductsGrid.module.scss";
import { Button } from "@/shared/ui/Button/Button";
import { MenuCardSkeleton } from "../MenuCard/MenuCardSkeleton";

type Props = {
  groups: ProductGroup[];
  loading?: boolean;
  noAll?: boolean;
};

const ALL = "all";

export function ProductsGrid({
  groups,
  loading = false,
  noAll = false,
}: Props) {
  if (loading) {
    return (
      <div className={styles.root}>
        <nav className={styles.tabs}>
          <div className={styles.skeletonTab} />
          <div className={styles.skeletonTab} />
          <div className={styles.skeletonTab} />
          <div className={styles.skeletonTab} />
        </nav>

        <div className={styles.grid}>
          {Array(9)
            .fill(0)
            .map((_, i) => (
              <MenuCardSkeleton key={i} />
            ))}
        </div>
      </div>
    );
  }

  const [active, setActive] = useState(noAll ? groups[0].slug : ALL);

  const tabs = useMemo(() => {
    if (groups.length === 1) {
      return [
        {
          slug: groups[0].slug,
          title: "Всё",
        },
      ];
    }

    if (noAll) return groups.map(({ slug, title }) => ({ slug, title }));

    return [
      {
        slug: ALL,
        title: "Всё",
      },
      ...groups.map(({ slug, title }) => ({ slug, title })),
    ];
  }, [groups]);

  const visibleGroups =
    active === ALL ? groups : groups.filter((g) => g.slug === active);

  return (
    <div className={styles.root}>
      <nav className={styles.tabs}>
        {tabs.map((tab) => (
          <Button
            key={tab.slug}
            variant={active === tab.slug ? "primary" : "tab"}
            onClick={() => setActive(tab.slug)}
            text={tab.title}
          />
        ))}
      </nav>

      <div className={styles.grid}>
        {visibleGroups.map((group) =>
          group.products.map((product: Product) => (
            <MenuCard key={product.id} product={product} />
          )),
        )}
      </div>
    </div>
  );
}
