import type { MenuProductsResult } from "../../model/menu.types";

type Props = {
  state: MenuProductsResult;
};

export function MenuProducts({ state }: Props) {
  if (state.status === "loading" || state.status === "error") {
    return;
    // return <ProductsSkeleton />;
  }

  return (
    <>
      {state.products.map((product) => (
        // <ProductCard key={product.id} product={product} />
        <div key={product.id}> {product.title}</div>
      ))}
    </>
  );
}
