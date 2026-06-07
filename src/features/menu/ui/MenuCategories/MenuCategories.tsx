import type { MenuMeta } from "@/shared/types/menu.types";

type Props = {
  meta: MenuMeta | null;
  loading: boolean;
};

export const MenuCategories = ({ meta, loading }: Props) => {
  if (loading || !meta) {
    return;
    // return <CategoriesSkeleton />;
  }

  return (
    <>
      {meta.categories.map((category) => (
        <button key={category.slug}>{category.title}</button>
      ))}
    </>
  );
};
