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
  const [currentPage, setCurrentPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(12);
  const [totalItems, setTotalItems] = React.useState<number | null>(null);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const { typesProducts } = useFilter();

  const { data } = useFetch<QuantityFetchResponse>(
    'https://api-storage-products.vercel.app/quantitys',
  );

  React.useEffect(() => {
    if (data) {
      if (FilterType[typesProducts].toString() === 'allProducts') {
        setTotalItems(Number(data.allProducts));
      }
      if (FilterType[typesProducts].toString() === 'mensClothing') {
        setTotalItems(Number(data.mensClothing));
      }
      if (FilterType[typesProducts].toString() === 'womansClothing') {
        setTotalItems(Number(data.womansClothing));
      }
    }
  }, [data, typesProducts]);

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
