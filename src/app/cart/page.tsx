'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import ReturnIcon from '@/components/icons/ReturnIcon';
import CartItens from '@/components/CartItens';

const ContainerProductPage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-secondary);
  padding: 20px 160px;
  margin: 0 auto;
  min-height: 100vh;
  height: max-content;
  @media (max-width: 1050px) {
    padding: 20px 100px;
  }

  @media (max-width: 950px) {
    padding: 20px 80px;
  }

  @media (max-width: 800px) {
    padding: 20px 60px;
  }

  @media (max-width: 780px) {
    padding: 20px 50px;
  }
`;

const ContainerReturn = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  width: max-content;
  font-weight: 500;
  color: var(--text-dark);
  cursor: pointer;
  margin-bottom: 17px;
  padding: 5px;

  &:hover {
    color: var(--text-dark-2);

    svg {
      path {
        stroke: var(--text-dark-2);
        color: var(--text-dark-2);
      }
    }
  }
`;

const ProductPage = () => {
  const router = useRouter();
  const handleNavigate = () => {
    router.back();
  };

  return (
    <>
      <ContainerProductPage>
        <ContainerReturn onClick={handleNavigate}>
          <p>Voltar</p> <ReturnIcon />
        </ContainerReturn>
        <CartItens />
      </ContainerProductPage>
    </>
  );
};

export default ProductPage;
