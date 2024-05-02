'use client';

import { useQuery } from '@tanstack/react-query';
import { ProductDataType } from '@/types/productsFetchResponse';

interface ProductDataFetcherProps {
  id: number;
}

const ProductDataFetch = ({ id }: ProductDataFetcherProps) => {
  const fetchUrl = `https://api-storage-products.vercel.app/products/${id}`;

  const fetchProductData = async () => {
    const response = await fetch(fetchUrl);
    return response.json();
  };

  const { isLoading, data, error } = useQuery<ProductDataType>({
    queryKey: ['product', id],
    queryFn: fetchProductData,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return { isLoading, data, error };
};

export default ProductDataFetch;
