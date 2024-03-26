import React from 'react';
import { ArrowIcon } from './icons/ArrowIcon';
import styled from 'styled-components';
import { usePagination } from '@/hooks/usePagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

interface PaginationSelectProps {
  selectedPage: boolean;
  $disabled: boolean;
  onClick: () => void;
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
    props.selectedPage ? 'var(--orange-low)' : 'var(--text-dark)'};
  background-color: ${(props) =>
    props.selectedPage ? '#fff' : 'var(--shapes)'};
  border: ${(props) =>
    props.selectedPage ? '1px solid var(--orange-low)' : 'none'};
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
  const slidesPerView = 4;

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      window.history.pushState({}, '', `?_page=${pageNumber}`);
    }
  };

  const handleNextPage = () => {
    if (currentPage >= 1 && currentPage < totalPages) {
      const nextPage = currentPage + 1;
      window.history.pushState({}, '', `?_page=${nextPage}`);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      window.history.pushState({}, '', `?_page=${previousPage}`);
    }
  };

  const renderPaginationSelects = () => {
    const paginationSelects = [];
    const startPage = Math.max(1, currentPage - Math.floor(slidesPerView / 2));
    const endPage = Math.min(startPage + slidesPerView - 1, totalPages);

    if (totalPages >= minPages) {
      for (let i = startPage; i <= endPage; i++) {
        paginationSelects.push(
          <SwiperSlide key={i} onClick={() => handlePageClick(i)}>
            <PaginationSelect
              $disabled={false}
              selectedPage={i === currentPage}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </PaginationSelect>
          </SwiperSlide>,
        );
      }
    }
    return paginationSelects;
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Swiper spaceBetween={5} slidesPerView={slidesPerView} loop={false}>
        {renderPaginationSelects()}
      </Swiper>
      <PaginationSelect
        $disabled={currentPage <= 1}
        selectedPage={false}
        onClick={handlePreviousPage}
      >
        <ArrowIcon rotationDeg="90deg" />
      </PaginationSelect>
      <PaginationSelect
        $disabled={currentPage >= totalPages}
        selectedPage={false}
        onClick={handleNextPage}
        style={{ marginLeft: '5px' }}
      >
        <ArrowIcon rotationDeg="-90deg" />
      </PaginationSelect>
    </div>
  );
};

export default PaginationListComponent;
