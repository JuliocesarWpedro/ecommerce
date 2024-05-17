'use client';
import React, { Suspense } from 'react';
import styled from 'styled-components';
import OrderBy from './OrderBy';
import PaginationListComponent from './PaginationListComponent';
import { SearchParams } from '@/types/SearchParams';

const ContainerPagination = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;
  color: var(--text-dark);
  justify-content: flex-end;

  @media (max-width: 1120px) {
    gap: 30px;
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;
  }

  @media (max-width: 525px) {
    gap: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Pagination = () => {
  return (
    <ContainerPagination>
      <Suspense fallback={<div>Loading</div>}>
        <OrderBy />
      </Suspense>
      <PaginationListComponent />
    </ContainerPagination>
  );
};

export default Pagination;
