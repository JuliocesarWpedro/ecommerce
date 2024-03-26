import useFetch from '@/hooks/useFetch';
import { ProductsFetchResponse } from '@/types/productsFetchResponse';
import React from 'react';
import { useSearchParams } from 'next/navigation';

interface CartContextProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number | null;
  totalPages: number;
}

export const PaginationContext = React.createContext<
  CartContextProps | undefined
>(undefined);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const pageSearchParam = searchParams.get('_page');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(9);
  const [totalItems, setTotalItems] = React.useState<number | null>(null);
  const [totalPages, setTotalPages] = React.useState<number>(0);

  const { data } = useFetch<ProductsFetchResponse>(
    'https://api-storage-products.vercel.app/products',
  );

  React.useEffect(() => {
    if (data) {
      setTotalItems(data.length);
    }
  }, [data]);

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
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}
