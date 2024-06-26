'use client';
import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowIcon } from './icons/ArrowIcon';
import useQueryProducts from '@/hooks/useQueryProducts';

interface PaginationSelectProps {
  $selectedPage: boolean;
  $disabled: boolean;
  onClick: () => void;
}

type Updates = {
  _page?: number | undefined | null;
  search_query?: string | undefined | null;
  _sort?: string | 'news' | 'HigherLower' | 'LowerHigher' | null;
  typeProduct?:
    | string
    | 'allProducts'
    | 'mensClothing'
    | 'womansClothing'
    | undefined
    | null;
};

const PaginationListContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 32px;
  gap: 5px;
  @media (max-width: 1120px) {
    padding-bottom: 0;
  }
`;

const PaginationSelect = styled.li<PaginationSelectProps>`
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: ${({ $selectedPage }) =>
    $selectedPage ? 'var(--orange-low)' : 'var(--text-dark)'};
  background-color: ${({ $selectedPage }) =>
    $selectedPage ? '#fff' : 'var(--shapes)'};
  border: ${({ $selectedPage }) =>
    $selectedPage ? '1px solid var(--orange-low)' : 'none'};
  font-size: 16px;
  font-weight: 400;
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
  const { quantityData, perPage, loading } = useQueryProducts();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const _page = searchParams.get('_page');
  const typeProduct = searchParams.get('typeProduct');
  const _sort = searchParams.get('_sort');
  const search_query = searchParams.get('search_query');

  const currentPage = Number(_page) && _page !== null ? parseInt(_page, 10) : 1;
  const slidesPerView = 4;
  const totalPages =
    quantityData && perPage > 0 ? Math.ceil(quantityData / perPage) : 0;

  const updateSearchParams = (params: URLSearchParams, updates: Updates) => {
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });
    return `${pathname}?${params.toString()}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      const params = new URLSearchParams(searchParams);
      const updates = {
        _page: pageNumber,
        search_query: search_query ? search_query.replace(/\s+/g, '+') : null,
        _sort,
        typeProduct,
      };
      replace(updateSearchParams(params, updates));
      scrollToTop();
    }
  };

  const handleNextPage = () => {
    if (currentPage >= 1 && currentPage < totalPages) {
      handlePageClick(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const renderPaginationSelects = () => {
    const paginationSelects = [];
    const startPage = Math.max(1, currentPage - Math.floor(slidesPerView / 2));
    const endPage = Math.min(startPage + slidesPerView - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      paginationSelects.push(
        <SwiperSlide key={i}>
          <PaginationSelect
            $selectedPage={i === currentPage}
            $disabled={false}
            onClick={() => {
              handlePageClick(i);
            }}
          >
            {i}
          </PaginationSelect>
        </SwiperSlide>,
      );
    }

    return paginationSelects;
  };

  return !loading ? (
    <PaginationListContainer>
      <ul>
        {totalPages >= 2 && (
          <Swiper spaceBetween={5} slidesPerView={slidesPerView} loop={false}>
            {renderPaginationSelects()}
          </Swiper>
        )}
      </ul>
      {totalPages >= 2 && (
        <>
          <PaginationSelect
            $selectedPage={false}
            $disabled={currentPage <= 1}
            onClick={handlePreviousPage}
          >
            <ArrowIcon rotationDeg="90deg" />
          </PaginationSelect>
          <PaginationSelect
            $selectedPage={false}
            $disabled={currentPage >= totalPages}
            onClick={handleNextPage}
          >
            <ArrowIcon rotationDeg="-90deg" />
          </PaginationSelect>
        </>
      )}
    </PaginationListContainer>
  ) : null;
};

export default PaginationListComponent;
