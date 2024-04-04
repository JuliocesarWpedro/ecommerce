export enum FilterType {
  'allProducts',
  'mensClothing',
  'womansClothing',
  'JEWELERY',
  'ELETRONICS',
}

export enum OrderProductsEnum {
  'news',
  'HigherLower',
  'LowerHigher',
  "bestSellers"
}

export default interface OrderProducts {
  news: string;
  HigherLower: string;
  LowerHigher: string;
  bestSellers?: string;
}
