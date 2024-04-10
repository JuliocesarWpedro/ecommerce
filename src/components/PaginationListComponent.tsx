import React from 'react';
import { ArrowIcon } from './icons/ArrowIcon';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FilterType, OrderProductsEnum } from '@/types/filterTypes';
import { useContextProducts } from '@/hooks/useContextProducts';

interface PaginationSelectProps {
  $selectedPage: boolean;
  $disabled: boolean;
  onClick: () => void;
}

const PaginationListContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 32px;
  gap: 5px;

  @media (max-width: 1120px) {
    padding-bottom: 0px;
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
  const {
    currentPage,
    totalPages,
    typesProducts,
    orderProducts,
    pageSearchQueryParam,
  } = useContextProducts();
  const minPages = 2;
  const slidesPerView = 4;

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 200);
  };

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      if (pageSearchQueryParam) {
        const searchValueAdjusted = pageSearchQueryParam.replace(
          /\s+(?=\S)/g,
          '+',
        );
        scrollToTop();
        if (orderProducts) {
          window.history.pushState(
            {},
            '',
            `?search_query=${searchValueAdjusted}&_sort=${OrderProductsEnum[
              orderProducts
            ].toString()}&_page=${pageNumber}`,
          );
        } else {
          window.history.pushState(
            {},
            '',
            `?search_query=${searchValueAdjusted}&_page=${pageNumber}`,
          );
          scrollToTop();
        }
      }
      if (!pageSearchQueryParam && orderProducts) {
        window.history.pushState(
          {},
          '',
          `?typeProduct=${FilterType[
            typesProducts
          ].toString()}&_sort=${OrderProductsEnum[
            orderProducts
          ].toString()}&_page=${pageNumber}`,
        );
        scrollToTop();
      }
      if (!pageSearchQueryParam && !orderProducts) {
        window.history.pushState(
          {},
          '',
          `?typeProduct=${FilterType[
            typesProducts
          ].toString()}&_page=${pageNumber}`,
        );
        scrollToTop();
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage >= 1 && currentPage < totalPages) {
      const nextPage = currentPage + 1;
      if (pageSearchQueryParam) {
        const searchValueAdjusted = pageSearchQueryParam.replace(
          /\s+(?=\S)/g,
          '+',
        );
        if (orderProducts) {
          window.history.pushState(
            {},
            '',
            `?search_query=${searchValueAdjusted}&_sort=${OrderProductsEnum[
              orderProducts
            ].toString()}&_page=${nextPage}`,
          );
          scrollToTop();
        } else {
          window.history.pushState(
            {},
            '',
            `?search_query=${searchValueAdjusted}&_page=${nextPage}`,
          );
          scrollToTop();
        }
      }
      if (!pageSearchQueryParam && orderProducts) {
        window.history.pushState(
          {},
          '',
          `?typeProduct=${FilterType[
            typesProducts
          ].toString()}&_sort=${OrderProductsEnum[
            orderProducts
          ].toString()}&_page=${nextPage}`,
        );
        scrollToTop();
      }
      if (!pageSearchQueryParam && !orderProducts) {
        window.history.pushState(
          {},
          '',
          `?typeProduct=${FilterType[
            typesProducts
          ].toString()}&_page=${nextPage}`,
        );
        scrollToTop();
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      if (pageSearchQueryParam) {
        const searchValueAdjusted = pageSearchQueryParam.replace(
          /\s+(?=\S)/g,
          '+',
        );
        if (orderProducts) {
          window.history.pushState(
            {},
            '',
            `?search_query=${searchValueAdjusted}&_sort=${OrderProductsEnum[
              orderProducts
            ].toString()}&_page=${previousPage}`,
          );
          scrollToTop();
        } else {
          window.history.pushState(
            {},
            '',
            `?search_query=${searchValueAdjusted}&_page=${previousPage}`,
          );
          scrollToTop();
        }
      }
      if (!pageSearchQueryParam && orderProducts) {
        window.history.pushState(
          {},
          '',
          `?typeProduct=${FilterType[
            typesProducts
          ].toString()}&_sort=${OrderProductsEnum[
            orderProducts
          ].toString()}&_page=${previousPage}`,
        );
        scrollToTop();
      }
      if (!pageSearchQueryParam && !orderProducts) {
        window.history.pushState(
          {},
          '',
          `?typeProduct=${FilterType[
            typesProducts
          ].toString()}&_page=${previousPage}`,
        );
        scrollToTop();
      }
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
              $selectedPage={i === currentPage}
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
    <PaginationListContainer>
      <Swiper spaceBetween={5} slidesPerView={slidesPerView} loop={false}>
        {renderPaginationSelects()}
      </Swiper>
      {totalPages >= minPages && (
        <>
          <PaginationSelect
            $disabled={currentPage <= 1}
            $selectedPage={false}
            onClick={handlePreviousPage}
          >
            <ArrowIcon rotationDeg="90deg" />
          </PaginationSelect>
          <PaginationSelect
            $disabled={currentPage >= totalPages}
            $selectedPage={false}
            onClick={handleNextPage}
          >
            <ArrowIcon rotationDeg="-90deg" />
          </PaginationSelect>
        </>
      )}
    </PaginationListContainer>
  );
};

export default PaginationListComponent;
