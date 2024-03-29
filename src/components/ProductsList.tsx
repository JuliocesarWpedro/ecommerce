import useFetch from '@/hooks/useFetch';
import {
  ProductType,
  ProductsFetchResponse,
} from '@/types/productsFetchResponse';
import React from 'react';
import styled from 'styled-components';
import Product from './Product';
import { usePagination } from '@/hooks/usePagination';
import { useFilter } from '@/hooks/useFilter';
import { FilterType } from '@/types/filterTypes';

const ContainerProducts = styled.div`
  min-height: 100vh;
  padding-top: 32px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

const ProductsList = () => {
  const { currentPage, perPage } = usePagination();
  const { typesProducts } = useFilter();
  const [fetchUrl, setFetchUrl] = React.useState<string>(
    `https://api-storage-products.vercel.app/products?_page=${currentPage}&_limit=${perPage}`,
  );

  React.useEffect(() => {
    let url = `https://api-storage-products.vercel.app/products?_page=${currentPage}&_limit=${perPage}`;

    if (typesProducts !== FilterType.allProducts) {
      const category = FilterType[typesProducts].toString();
      url = `https://api-storage-products.vercel.app/products?category=${category}&_page=${currentPage}&_limit=${perPage}`;
    }

    setFetchUrl(url);
  }, [typesProducts, currentPage, perPage]);

  const { data } = useFetch<ProductsFetchResponse>(fetchUrl);

  return (
    <ContainerProducts>
      {data &&
        Array.isArray(data) &&
        data.map((product: ProductType) => (
          <Product key={product.id} product={product} />
        ))}
    </ContainerProducts>
  );
};

export default ProductsList;
