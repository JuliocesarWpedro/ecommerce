export interface ProductType {
  id: string;
  title: string;
  price: string;
  category: string;
  image: string;
}

export interface ProductsFetchResponse {
  products: ProductType[];
}
