import { FilterType } from '@/types/filterTypes';
import FilterItemProps from '@/types/productsCategorys';
import React from 'react';
import styled from 'styled-components';

const FilterListTag = styled.ul`
  display: flex;
  gap: 40px;

  @media (max-width: 420px) {
    gap: 20px;
  }
`;

const FilterItem = styled.li<FilterItemProps>`
  display: flex;
  align-items: center;
  gap: 40px;
  font-size: 16px;
  font-weight: ${(props) => (props.$selectedcategory ? '600' : '400')};
  line-height: 22px;
  text-transform: uppercase;
  letter-spacing: 0em;
  cursor: pointer;
  text-align: center;
  color: ${(props) =>
    props.$selectedcategory
      ? 'var(--text-dark-2: #41414D)'
      : 'var(--text-dark)'};
  border-bottom: ${(props) =>
    props.$selectedcategory ? '4px solid var(--orange-low)' : 'none'};
  @media (max-width: 420px) {
    font-size: 14px;
  }
  &:hover {
    font-weight: 600;
    color: var(--text-dark-2);
  }
`;

const FilterList = () => {
  const [typesProducts, setTypesProducts] = React.useState(
    FilterType.ALLPRODUCTS,
  );

  return (
    <FilterListTag>
      <FilterItem
        onClick={() => setTypesProducts(FilterType.ALLPRODUCTS)}
        $selectedcategory={typesProducts === FilterType.ALLPRODUCTS ? 1 : 0}
      >
        Todos os Produtos
      </FilterItem>
      <FilterItem
        onClick={() => setTypesProducts(FilterType.MENSCLOTHING)}
        $selectedcategory={typesProducts === FilterType.MENSCLOTHING ? 1 : 0}
      >
        Blusas Masculinas
      </FilterItem>
      <FilterItem
        onClick={() => setTypesProducts(FilterType.WOMENSCLOTHING)}
        $selectedcategory={typesProducts === FilterType.WOMENSCLOTHING ? 1 : 0}
      >
        Blusas femininas
      </FilterItem>
    </FilterListTag>
  );
};

export default FilterList;
