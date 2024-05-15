'use client';
import React from 'react';
import {
  FilterListTag,
  FilterItem,
} from './StyledContainers/FilterListStyledComponent';
import { SearchParams } from '@/types/SearchParams';

const FilterList = (params: SearchParams) => {
  return (
    <>
      <h1>verdade</h1>
      {/* <FilterListTag>
        <FilterItem
          onClick={() => {
            if (!(typesProducts === FilterType.allProducts)) {
              setOrderProducts(null);
            }
            window.history.pushState(
              {},
              '',
              `?typeProduct=allProducts&_page=1`,
            );
          }}
          $selectedcategory={typesProducts === FilterType.allProducts ? 1 : 0}
        >
          Todos os Produtos
        </FilterItem>
        <FilterItem
          onClick={() => {
            if (!(typesProducts === FilterType.mensClothing)) {
              setOrderProducts(null);
            }
            window.history.pushState(
              {},
              '',
              `?typeProduct=mensClothing&_page=1`,
            );
          }}
          $selectedcategory={typesProducts === FilterType.mensClothing ? 1 : 0}
        >
          Roupas Masculinas
        </FilterItem>
        <FilterItem
          onClick={() => {
            if (!(typesProducts === FilterType.womansClothing)) {
              setOrderProducts(null);
            }
            window.history.pushState(
              {},
              '',
              `?typeProduct=womansClothing&_page=1`,
            );
          }}
          $selectedcategory={
            typesProducts === FilterType.womansClothing ? 1 : 0
          }
        >
          Roupas femininas
        </FilterItem>
      </FilterListTag> */}
    </>
  );
};

export default FilterList;
