import { FilterType } from '@/types/FilterTypes';
import FilterItemProps from '@/types/productsCategorys';
import React from 'react';
import styled from 'styled-components';

const FilterListTag = styled.ul`
  display: flex;
  gap: 40px;
`;

const FilterItem = styled.li<FilterItemProps>`
  display: flex;
  align-items: center;
  gap: 40px;
  font-size: 16px;
  font-weight: ${(props) => (props.selectedCategory ? '600' : '400')};
  line-height: 22px;
  text-transform: uppercase;
  letter-spacing: 0em;
  cursor: pointer;
  text-align: center;
  color: ${(props) =>
    props.selectedCategory
      ? 'var(--text-dark-2: #41414D)'
      : 'var(--text-dark)'};
  border-bottom: ${(props) =>
    props.selectedCategory ? '4px solid var(--orange-low)' : 'none'};
`;

const FilterList = () => {
  const [types, setTypes] = React.useState(FilterType.ALLPRODUCTS);
  return (
    <FilterListTag>
      <FilterItem
        onClick={() => setTypes(FilterType.ALLPRODUCTS)}
        selectedCategory={types === FilterType.ALLPRODUCTS ? true : false}
      >
        Todos os Produtos
      </FilterItem>
      <FilterItem
        onClick={() => setTypes(FilterType.MENSCLOTHING)}
        selectedCategory={types === FilterType.MENSCLOTHING ? true : false}
      >
        Blusas Masculinas
      </FilterItem>
      <FilterItem
        onClick={() => setTypes(FilterType.WOMENSCLOTHING)}
        selectedCategory={types === FilterType.WOMENSCLOTHING ? true : false}
      >
        Blusas femininas
      </FilterItem>
    </FilterListTag>
  );
};

export default FilterList;
