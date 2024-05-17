'use client';
import React from 'react';
import {
  FilterListTag,
  FilterItem,
} from './StyledContainers/FilterListStyledComponent';
import { useSearchParams } from 'next/navigation';

const FilterList = () => {
  const searchParams = useSearchParams();
  const typeProduct = searchParams.get('typeProduct');
  return (
    <>
      <FilterListTag>
        <FilterItem
          onClick={() => {
            window.history.pushState(
              {},
              '',
              `?typeProduct=allProducts&_page=1`,
            );
          }}
          $selectedcategory={
            typeProduct !== 'mensClothing' && typeProduct !== 'womansClothing'
              ? 1
              : 0
          }
        >
          Todos os Produtos
        </FilterItem>
        <FilterItem
          onClick={() => {
            window.history.pushState(
              {},
              '',
              `?typeProduct=mensClothing&_page=1`,
            );
          }}
          $selectedcategory={typeProduct === 'mensClothing' ? 1 : 0}
        >
          Roupas Masculinas
        </FilterItem>
        <FilterItem
          onClick={() => {
            window.history.pushState(
              {},
              '',
              `?typeProduct=womansClothing&_page=1`,
            );
          }}
          $selectedcategory={typeProduct === 'womansClothing' ? 1 : 0}
        >
          Roupas femininas
        </FilterItem>
      </FilterListTag>
    </>
  );
};

export default FilterList;
