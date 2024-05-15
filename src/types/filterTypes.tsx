export default interface FilterType {
  allProducts: 'allProducts';
  mensClothing: 'mensClothing';
  womansClothing: 'womansClothing';
}

export default interface OrderProducts {
  news: 'news' | 'Novidades';
  HigherLower: 'HigherLower' | 'Preço: Maior - Menor';
  LowerHigher: 'LowerHigher' | 'Preço: Menor - Maior';
}
