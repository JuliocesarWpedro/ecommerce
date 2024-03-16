import useFetch from '@/hooks/useFetch';
import {
  ProductType,
  ProductsFetchResponse,
} from '@/types/productsFetchResponse';
import React from 'react';
import styled from 'styled-components';
import Product from './Product';

const ContainerProducts = styled.div`
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
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [perPage, setPerPage] = React.useState<number>(10);
  const { data } = useFetch<ProductsFetchResponse>(
    'https://api-storage-products.vercel.app/products',
  );
  console.log(data);
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
