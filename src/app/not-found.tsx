'use client';

import ReturnArrowIcon from '@/components/icons/ReturnArrowIcon';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px 160px;
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

const NotFoundTitle = styled.h1`
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 40px;
  line-height: 60px;
  letter-spacing: 0em;
  color: var(--text-dark-2);
`;

export const LinkButton = styled(Link)`
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
  border-radius: 4px 0px 0px 0px;
  background-color: var(--bg-secondary);
  color: var(--text-dark-2);

  @media (max-width: 600px) {
    width: 100%;
    padding: 0px 20px;
  }
  @media (max-width: 330px) {
    width: 100%;
    padding: 0px 10px;
  }

  &:hover {
    background-color: var(--bg-primary);
  }
`;

const notFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle>Página não encontrada!</NotFoundTitle>
      <LinkButton href={'/'}>
        <p>Volte para a Home!</p>
        <ReturnArrowIcon />
      </LinkButton>
    </NotFoundContainer>
  );
};

export default notFound;
