export interface ProductType {
  id: string;
  category: 'womansClothing' | 'mensClothing';
  name: string;
  price: number;
  parcelamento: number[];
  color: string;
  image: string;
  size: string[];
  date: string;
}

export interface ProductsFetchResponse {
  products: ProductType[];
}

export interface QuantityFetchResponse {
  allProducts: string;
  mensClothing: string;
  womansClothing: string;
}
