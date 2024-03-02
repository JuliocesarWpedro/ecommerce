export enum FilterType {
  'ALLPRODUCTS',
  'MENSCLOTHING',
  'JEWELERY',
  'ELETRONICS',
  'WOMENSCLOTHING',
}

export default interface OrderProducts {
  news: string;
  HigherLower: string;
  LowerHigher: string;
  bestSellers: string;
}
