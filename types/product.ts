export interface Wholesaler {
  id: string;
  name: string;
  logo: string;
  country: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  origin: string;
  altitude: string;
  processing: string;
  roastLevel: string;
  flavor: string;
  acidity: string;
  body: string;
  certifications: string[];
  images: string[];
  image: string;
  wholesaler: Wholesaler;
  rating: number;
  reviews: number;
} 