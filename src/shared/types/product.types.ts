export interface Product {
  id: number;
  is_available: boolean;
  title: string;
  description: string;
  composition: string;
  price: ProductPrice;
  weight: ProductWeight;
  nutrition: ProductNutrition;
  max_per_order: number;
  subcategory: ProductSubcategory;
  tags: ProductTag[];
  images: ProductImages;
}

export interface ProductPrice {
  base: number;
  discount_percent: number;
  final: number;
}

export interface ProductWeight {
  value: number;
  unit: string;
  display: string;
}

export interface ProductNutrition {
  per_100: NutritionValues;
  total: NutritionValues;
}

export interface NutritionValues {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

export interface ProductSubcategory {
  slug: string;
  title: string;

  category: {
    title: string;
    slug: string;
  };
}

export interface ProductTag {
  title: string;
  slug: string;
}

export interface ProductImages {
  main: {
    url: string;
    alt: string;
  };

  card: {
    url: string;
    alt: string;
  };
}
