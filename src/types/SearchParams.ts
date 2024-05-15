import FilterType from './filterTypes';

export interface SearchParams {
  searchParams: {
    search_query?: string;
    _page?: string;
    _sort?: 'news' | 'HigherLower' | 'LowerHigher';
    typeProduct?: 'allProducts' | 'mensClothing' | 'womansClothing';
  };
}
