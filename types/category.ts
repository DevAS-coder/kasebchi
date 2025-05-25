export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'; 