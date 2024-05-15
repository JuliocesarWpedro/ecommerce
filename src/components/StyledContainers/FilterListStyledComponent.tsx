'use client';
import FilterItemProps from '@/types/productsCategorys';
import styled from 'styled-components';

export const FilterListTag = styled.ul`
  display: flex;
  gap: 40px;

  @media (max-width: 420px) {
    gap: 20px;
  }
`;

export const FilterItem = styled.li<FilterItemProps>`
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
    props.$selectedcategory ? 'var(--text-dark-2)' : 'var(--text-dark)'};
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
