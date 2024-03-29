export enum FilterType {
  'allProducts',
  'mensClothing',
  'womansClothing',
  'JEWELERY',
  'ELETRONICS',
}

export default interface OrderProducts {
  news: string;
  HigherLower: string;
  LowerHigher: string;
  bestSellers: string;
}
