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
import { FilterType, OrderProductsEnum } from '@/types/filterTypes';
import SkeletonProducts from './SkeletonProducts';

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

const LoadingProduct = styled.div`
  background: #f3f3f3;
  display: flex;
  flex-direction: column;
  width: 195px;
  height: 378px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  @keyframes pulse {
    50% {
      opacity: 0.5;
    }
  }
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const ProductsList = () => {
  const { currentPage, perPage } = usePagination();
  const { typesProducts, orderProducts } = useFilter();
  const [fetchUrl, setFetchUrl] = React.useState<string>(
    `https://api-storage-products.vercel.app/products?_page=${currentPage}&_limit=${perPage}`,
  );

  React.useEffect(() => {
    let url = `https://api-storage-products.vercel.app/products?_page=${currentPage}&_limit=${perPage}`;

    if (typesProducts !== FilterType.allProducts) {
      const category = FilterType[typesProducts].toString();
      url = `https://api-storage-products.vercel.app/products?category=${category}&_page=${currentPage}&_limit=${perPage}`;
    }
    if (orderProducts) {
      const category = FilterType[typesProducts].toString();
      if (orderProducts === OrderProductsEnum.news) {
        if (typesProducts !== FilterType.allProducts) {
          url = `https://api-storage-products.vercel.app/products?category=${category}&_sort=id&_order=asc&_page=${currentPage}&_limit=${perPage}`;
        } else {
          url = `https://api-storage-products.vercel.app/products?_sort=id&_order=asc&_page=${currentPage}&_limit=${perPage}`;
        }
      }
      if (orderProducts === OrderProductsEnum.LowerHigher) {
        if (typesProducts !== FilterType.allProducts) {
          url = `https://api-storage-products.vercel.app/products?category=${category}&_sort=price&_order=asc&_page=${currentPage}&_limit=${perPage}`;
        } else {
          url = `https://api-storage-products.vercel.app/products?_sort=price&_order=asc&_page=${currentPage}&_limit=${perPage}`;
        }
      }
      if (orderProducts === OrderProductsEnum.HigherLower) {
        if (typesProducts !== FilterType.allProducts) {
          url = `https://api-storage-products.vercel.app/products?category=${category}&_sort=price&_order=desc&_page=${currentPage}&_limit=${perPage}`;
        } else {
          url = `https://api-storage-products.vercel.app/products?_sort=price&_order=desc&_page=${currentPage}&_limit=${perPage}`;
        }
      }
    }
    setFetchUrl(url);
  }, [typesProducts, currentPage, perPage, orderProducts]);

  const { data, loading } = useFetch<ProductsFetchResponse>(fetchUrl);

  const orderedProducts = React.useMemo(() => {
    if (data && Array.isArray(data)) {
      if (
        orderProducts &&
        OrderProductsEnum[orderProducts].toString() === 'news'
      ) {
        return data.sort((a, b) => +b.id - +a.id);
      }
      if (
        orderProducts &&
        OrderProductsEnum[orderProducts].toString() === 'LowerHigher'
      ) {
        return data.sort((a, b) => a.price - b.price);
      }
      if (
        orderProducts &&
        OrderProductsEnum[orderProducts].toString() === 'HigherLower'
      ) {
        return data.sort((a, b) => b.price - a.price);
      }
    }
    return null;
  }, [data, orderProducts]);

  return (
    <ContainerProducts>
      {loading && <SkeletonProducts />}
      {!loading &&
        data &&
        Array.isArray(data) &&
        !orderedProducts &&
        data.map((product: ProductType) => (
          <Product key={product.id} product={product} />
        ))}
      {!loading &&
        data &&
        Array.isArray(data) &&
        orderedProducts &&
        orderedProducts.map((product: ProductType) => (
          <Product key={product.id} product={product} />
        ))}
    </ContainerProducts>
  );
};

export default ProductsList;
