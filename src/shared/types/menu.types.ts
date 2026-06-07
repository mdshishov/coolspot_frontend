export interface MenuMeta {
  categories: Category[];
  tags: Tag[];
}

export interface Category {
  title: string;
  slug: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  title: string;
  slug: string;
}

export interface Tag {
  title: string;
  slug: string;
}
