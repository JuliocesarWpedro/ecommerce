import React from 'react';
import { ArrowIcon } from './icons/ArrowIcon';
import styled from 'styled-components';
import { usePagination } from '@/hooks/usePagination';

interface PaginationSelectProps extends React.HTMLAttributes<HTMLLIElement> {
  $selectedPage?: boolean;
  $disabled?: boolean;
}

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

const PaginationSelect = styled.li<PaginationSelectProps>`
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: ${(props) =>
    props.$selectedPage ? 'var(--orange-low)' : 'var(--text-dark)'};
  background-color: ${(props) =>
    props.$selectedPage ? '#fff' : 'var(--shapes)'};
  background-color: ${(props) =>
    props.$selectedPage
      ? '#fff'
      : props.$disabled
      ? '#DCE2E63D'
      : 'var(--shapes)'};
  border: ${(props) =>
    props.$selectedPage ? '1px solid var(--orange-low)' : 'none'};
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
  const { currentPage, totalPages } = usePagination();
  const minPages = 2;
  const maxPagesToShow = 4;

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      window.history.pushState({}, '', `?_page=${pageNumber}`);
    }
  };

  const handleNextPage = (increment: number) => {
    if (currentPage >= 1 && currentPage < totalPages) {
      const nextPage = currentPage + increment;
      window.history.pushState({}, '', `?_page=${nextPage}`);
    }
  };

  const handlePreviousPage = (increment: number) => {
    if (currentPage > 1) {
      const previousPage = currentPage - increment;
      window.history.pushState({}, '', `?_page=${previousPage}`);
    }
  };

  const renderPaginationSelects = () => {
    const paginationSelects = [];
    const pagesToShow = Math.min(totalPages, maxPagesToShow);
    if (totalPages >= minPages) {
      for (let i = 1; i <= pagesToShow; i++) {
        paginationSelects.push(
          <PaginationSelect
            key={i}
            $selectedPage={i === currentPage}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </PaginationSelect>,
        );
      }
    }
    return paginationSelects;
  };

  return (
    <PaginationList>
      {renderPaginationSelects()}
      {totalPages >= minPages && (
        <>
          <PaginationSelect
            $disabled={currentPage <= 1}
            onClick={() => handlePreviousPage(1)}
          >
            <ArrowIcon rotationDeg="90deg" />
          </PaginationSelect>
          <PaginationSelect
            $disabled={currentPage >= totalPages}
            onClick={() => handleNextPage(1)}
          >
            <ArrowIcon rotationDeg="-90deg" />
          </PaginationSelect>
        </>
      )}
    </PaginationList>
  );
};

export default PaginationListComponent;
