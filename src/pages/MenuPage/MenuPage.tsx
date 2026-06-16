import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useMenuMeta } from "@/features/menu/hooks/useMenuMeta";
import { useMenuResolver } from "@/features/menu/hooks/useMenuResolver";
import { useMenuProducts } from "@/features/menu/hooks/useMenuProducts";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import { buildGroups } from "@/features/menu/model/buildGroups";
import { ProductsGrid } from "@/widgets/ProductsGrid/ProductsGrid";
import { Header } from "@/widgets/Header/Header";
import { MenuLinks } from "@/widgets/MenuLinks/MenuLinks";
import { buildMenuLinks } from "@/features/menu/model/buildMenuLinks";
import { MenuLinksSkeleton } from "@/widgets/MenuLinks/MenuLinksSkeleton";

export function MenuPage() {
  useEffect(() => {
    document.title = "Меню | CoolSpot";
  }, []);

  const menuMeta = useMenuMeta();
  const resolved = useMenuResolver(menuMeta.meta);
  const productsState = useMenuProducts(resolved);

  if (menuMeta.loading || resolved.status === "loading") {
    return (
      <>
        <Header>
          <MenuLinksSkeleton />
        </Header>
        <ProductsGrid groups={[]} loading={true}></ProductsGrid>
      </>
    );
  }

  if (resolved.status === "not_found") {
    return <NotFoundPage />;
  }
  if (resolved.status === "redirect") {
    return <Navigate to={resolved.to} replace />;
  }

  if (productsState.status === "loading") {
    return (
      <>
        <Header>
          <MenuLinks items={buildMenuLinks(menuMeta.meta!)} />
        </Header>
        <ProductsGrid groups={[]} loading={true}></ProductsGrid>
      </>
    );
  }

  const groups = buildGroups(
    productsState.products,
    menuMeta.meta!,
    resolved.isTag,
  );

  return (
    <>
      <Header>
        <MenuLinks items={buildMenuLinks(menuMeta.meta!)} />
      </Header>
      <ProductsGrid groups={groups}></ProductsGrid>
    </>
  );
}
