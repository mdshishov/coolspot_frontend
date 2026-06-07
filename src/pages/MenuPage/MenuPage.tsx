import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useMenuMeta } from "@/features/menu/hooks/useMenuMeta";
import { useMenuResolver } from "@/features/menu/hooks/useMenuResolver";
import { useMenuProducts } from "@/features/menu/hooks/useMenuProducts";
import { MenuCategories } from "@/features/menu/ui/MenuCategories/MenuCategories";
import { MenuProducts } from "@/features/menu/ui/MenuProducts/MenuProducts";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import type { Product } from "@/shared/types/product.types";
import type { ProductGroup } from "./types";
import { buildGroups } from "./buildGroups";

function MenuPage() {
  const menuMeta = useMenuMeta();
  const resolved = useMenuResolver(menuMeta.meta);
  const productsState = useMenuProducts(resolved);

  const [activeGroup, setActiveGroup] = useState("all");

  if (
    menuMeta.loading ||
    resolved.status === "loading" ||
    productsState.status === "loading"
  ) {
    return <div></div>;
    // <Loader />;
  }

  if (resolved.status === "not_found") {
    return <NotFoundPage />;
  }

  if (resolved.status === "redirect") {
    return <Navigate to={resolved.to} replace />;
  }

  if (productsState.status === "error") {
    return <div></div>;
    // <ErrorBlock message={productsState.message} />;
  }

  const groups = buildGroups(
    productsState.products,
    menuMeta.meta!,
    resolved.isTag,
  );

  const visibleGroups =
    activeGroup === "all"
      ? groups
      : groups.filter((g) => g.slug === activeGroup);

  return (
    <>
      <MenuTabs
        groups={groups}
        active={activeGroup}
        onChange={setActiveGroup}
      />

      {visibleGroups.map((group: ProductGroup) => (
        <section key={group.slug}>
          <h2>{group.title}</h2>

          <ProductsGrid>
            {group.products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductsGrid>
        </section>
      ))}
    </>
  );
}
