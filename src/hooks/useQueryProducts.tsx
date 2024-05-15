import React, { useState, useEffect } from 'react';
import { SearchParams } from '@/types/SearchParams';
import { useSearchParams } from 'next/navigation';

export default function useQueryProducts(params: SearchParams) {
  const searchParams = useSearchParams();

  const _page = searchParams.get('_page') || '1';
  const typeProduct = searchParams.get('typeProduct');
  const _sort = searchParams.get('_sort');
  const search_query = searchParams.get('search_query');
  const perPage = 12;
  const queryProduct = search_query?.replace(/\s+(?=\S)/g, '%20');

  const [quantity, setQuantity] = useState<null | number>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchQuantity = async () => {
      setIsLoading(true);
      setIsError(false);

      let urlQuantity = 'https://api-storage-products.vercel.app/quantitys';

      if (search_query) {
        urlQuantity = `https://api-storage-products.vercel.app/products?q=${search_query.replace(
          /\s+(?=\S)/g,
          '%20',
        )}`;
      }

      try {
        const response = await fetch(urlQuantity);

        if (!response.ok) {
          throw new Error(
            `Erro ao buscar quantidade de produtos: ${response.statusText}`,
          );
        }

        const quantityData = await response.json();

        if (!search_query) {
          if (!typeProduct) {
            setQuantity(Number(quantityData.allProducts));
          } else if (typeProduct === 'allProducts') {
            setQuantity(Number(quantityData.allProducts));
          } else if (typeProduct === 'mensClothing') {
            setQuantity(Number(quantityData.mensClothing));
          } else if (typeProduct === 'womansClothing') {
            setQuantity(Number(quantityData.womansClothing));
          }
        } else {
          setQuantity(quantityData.length);
        }
      } catch (error) {
        setQuantity(null);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuantity();
  }, [search_query, typeProduct]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      let url = 'https://api-storage-products.vercel.app/products';
      let params = `?_page=${_page}&_limit=${perPage}`;

      if (typeProduct && typeProduct !== 'allProducts') {
        params += `&category=${typeProduct}`;
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
          params += `&_sort=${sortField}&_order=${order}`;
        }
      }

      if (queryProduct) {
        params += `&q=${queryProduct}`;
      }

      url += params;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [_page, perPage, typeProduct, _sort, queryProduct]);

  return { isLoading, data, isError, quantity, perPage };
}
