'use client';
import styled from 'styled-components';
const LoadingProduct = styled.div`
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

const ContainerProductsLoading = styled.div`
  padding-top: 80px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  height: 100%;
  justify-content: center;
  gap: 32px;
`;

const SkeletonProducts = () => {
  const loadingProducts = Array.from({ length: 12 }, (_, index) => (
    <LoadingProduct key={index} />
  ));

  return <ContainerProductsLoading>{loadingProducts}</ContainerProductsLoading>;
};

export default SkeletonProducts;
