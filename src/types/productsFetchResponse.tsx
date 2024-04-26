export interface ProductDataType {
  id: number;
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
  products: ProductDataType[];
}

export interface QuantityFetchResponse {
  allProducts: number;
  mensClothing: number;
  womansClothing: number;
}
