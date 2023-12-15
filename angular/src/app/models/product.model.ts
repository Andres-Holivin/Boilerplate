export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
  thumbnail: string;
}
export interface ListProduct {
  products: Product[];
  total: number;
}
