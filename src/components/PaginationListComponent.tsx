import React from 'react';
import { ArrowIcon } from './icons/ArrowIcon';
import styled from 'styled-components';

const PaginationList = styled.ul`
  display: flex;
  gap: 2px;
  color: var(--text-dark);
  align-items: center;
  list-style: none;
  justify-content: center;

  @media (max-width: 1120px) {
    gap: 10px;
  }
`;

const PaginationSelect = styled.li`
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--shapes);
  border-radius: 8px;
  color: var(--text-dark);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  @media (max-width: 1120px) {
    width: 45px;
    height: 45px;
  }

  @media (max-width: 580px) {
    width: 37px;
    height: 37px;
  }
`;

const PaginationListComponent = () => {
  return (
    <PaginationList>
      <PaginationSelect>1</PaginationSelect>
      <PaginationSelect>2</PaginationSelect>
      <PaginationSelect>3</PaginationSelect>
      <PaginationSelect>4</PaginationSelect>
      <PaginationSelect>
        <ArrowIcon rotationDeg="90deg" />
      </PaginationSelect>
      <PaginationSelect>
        <ArrowIcon rotationDeg="-90deg" />
      </PaginationSelect>
    </PaginationList>
  );
};

export default PaginationListComponent;
