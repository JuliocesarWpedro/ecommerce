export enum FilterType {
  'allProducts',
  'mensClothing',
  'womansClothing',
  'JEWELERY',
  'ELETRONICS',
}

export enum OrderProductsEnum {
  'bestSellers',
  'news',
  'HigherLower',
  'LowerHigher',
}

export default interface OrderProducts {
  news: string;
  HigherLower: string;
  LowerHigher: string;
  bestSellers?: string;
}
