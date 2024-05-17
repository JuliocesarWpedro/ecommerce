'use client';
import React from 'react';
import styled from 'styled-components';
import Product from './Product';
import useQueryProducts from '@/hooks/useQueryProducts';
import Link from 'next/link';
import { ProductDataType } from '@/types/productsFetchResponse';
import SkeletonProducts from './SkeletonProducts';

const ContainerProducts = styled.div`
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  height: 100%;
  justify-content: center;
  gap: 32px;
  padding-bottom: 74px;
`;

export const LinkButton = styled(Link)`
  user-select: none;
  gap: 10px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 448px;
  height: 44px;
  text-decoration: none;
  border-radius: 4px;
  background-color: var(--text-dark-2);
  color: #fff;

  @media (max-width: 600px) {
    width: 100%;
    padding: 0px 20px;
  }
  @media (max-width: 330px) {
    width: 100%;
    padding: 0px 10px;
  }

  &:hover {
    background-color: #373742;
  }
`;

const ProductsList = () => {
  const { data, loading, isError } = useQueryProducts();
  return (
    <>
      {isError && <div>Erro encontrado!</div>}
      {!isError && (
        <ContainerProducts>
          {loading && <SkeletonProducts />}
          {!loading &&
            Array.isArray(data) &&
            data.map((product: ProductDataType) => (
              <Product key={product.id} product={product} />
            ))}
        </ContainerProducts>
      )}
    </>
  );
};

export default ProductsList;
