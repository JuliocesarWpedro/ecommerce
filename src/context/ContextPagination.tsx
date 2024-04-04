import useFetch from '@/hooks/useFetch';
import { QuantityFetchResponse } from '@/types/productsFetchResponse';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useFilter } from '@/hooks/useFilter';
import { FilterType } from '@/types/filterTypes';

interface PaginationContextProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number | null;
  totalPages: number;
  setTotalItems: React.Dispatch<React.SetStateAction<number | null>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

export const PaginationContext = React.createContext<
  PaginationContextProps | undefined
>(undefined);

export function PaginationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const pageSearchParam = searchParams.get('_page');
  const typeProductSearchParam = searchParams.get('typeProduct');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(12);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const { setTypesProducts } = useFilter();
  const [totalItems, setTotalItems] = React.useState<number | null>(0);

  const { data } = useFetch<QuantityFetchResponse>(
    'https://api-storage-products.vercel.app/quantitys',
  );

  React.useEffect(() => {
    if (data) {
      if (!typeProductSearchParam) {
        setTotalItems(Number(data.allProducts));
      }
      if (typeProductSearchParam === 'allProducts') {
        setTotalItems(Number(data.allProducts));
        setTypesProducts(FilterType.allProducts);
      }
      if (typeProductSearchParam === 'mensClothing') {
        setTotalItems(Number(data.mensClothing));
        setTypesProducts(FilterType.mensClothing);
      }
      if (typeProductSearchParam === 'womansClothing') {
        setTotalItems(Number(data.womansClothing));
        setTypesProducts(FilterType.womansClothing);
      }
    }
  }, [data, typeProductSearchParam, setTypesProducts]);

  React.useEffect(() => {
    if (pageSearchParam && Number(pageSearchParam) !== 0) {
      setCurrentPage(Number(pageSearchParam));
    }
  }, [pageSearchParam]);

  React.useEffect(() => {
    if (totalItems) {
      setTotalPages(Math.ceil(totalItems / perPage));
    }
  }, [totalItems, perPage]);
  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        perPage,
        setPerPage,
        totalItems,
        totalPages,
        setTotalItems,
        setTotalPages,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}
