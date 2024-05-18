import React, { useEffect, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
type QuantityData = number;
export default function useQueryProducts() {
  const searchParams = useSearchParams();

  const _page = searchParams.get('_page') || '1';
  const typeProduct = searchParams.get('typeProduct');
  const _sort = searchParams.get('_sort');
  const search_query = searchParams.get('search_query');
  const perPage = 12;
  const queryProduct = search_query?.replace(/\s+(?=\S)/g, '%20');
  const baseUrl = 'https://api-storage-products.vercel.app/products';
  const [loading, setLoading] = React.useState<boolean>(false);

  const url = useMemo(() => {
    let constructedUrl = new URL(`${baseUrl}?_page=${_page}&_limit=12`);

    if (typeProduct && typeProduct !== 'allProducts') {
      constructedUrl.searchParams.append('category', typeProduct);
    }

    if (_sort) {
      let sortField = '';
      let order = '';

      if (_sort === 'news') {
        sortField = 'id';
        order = 'desc';
      } else if (_sort === 'LowerHigher') {
        sortField = 'price';
        order = 'asc';
      } else if (_sort === 'HigherLower') {
        sortField = 'price';
        order = 'desc';
      }

      if (sortField && order) {
        constructedUrl.searchParams.append('_sort', sortField);
        constructedUrl.searchParams.append('_order', order);
      }
    }

    if (queryProduct) {
      constructedUrl.searchParams.append('q', queryProduct);
    }

    return constructedUrl;
  }, [_page, typeProduct, _sort, queryProduct]);

  const fetchQuantity = useCallback(async () => {
    let urlQuantity = 'https://api-storage-products.vercel.app/quantitys';

    if (search_query) {
      urlQuantity = `https://api-storage-products.vercel.app/products?q=${search_query.replace(
        /\s+(?=\S)/g,
        '%20',
      )}`;
    }

    const response = await fetch(urlQuantity);
    if (!response.ok) {
      throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
    }

    const quantityData = await response.json();
    if (!search_query) {
      if (!typeProduct) {
        return Number(quantityData.allProducts);
      }
      if (typeProduct === 'allProducts') {
        return Number(quantityData.allProducts);
      }
      if (typeProduct === 'mensClothing') {
        return Number(quantityData.mensClothing);
      }
      if (typeProduct === 'womansClothing') {
        return Number(quantityData.womansClothing);
      }
    } else {
      return quantityData.length;
    }
    return null;
  }, [search_query, typeProduct]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
    }
    setLoading(false);
    return response.json();
  }, [url]);

  const { data: quantityData }: { data?: QuantityData } =
    useQuery<QuantityData>({
      queryKey: ['quantity', search_query, typeProduct],
      queryFn: fetchQuantity,
      staleTime: 1000 * 60 * 60 * 24,
    });

  const { data, isError, refetch, isLoading } = useQuery({
    queryKey: ['products', _page, perPage, queryProduct, _sort, typeProduct],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 60 * 24,
  });

  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return { loading, data, isError, refetch, quantityData, perPage };
}
