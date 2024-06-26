'use client';
import ReturnIcon from '@/components/icons/ReturnIcon';
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

  h1 {
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 40px;
    line-height: 60px;
    letter-spacing: 0em;
    color: var(--text-dark-2);
  }
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

  svg {
    path {
      color: #fff;
      stroke: #fff;
    }
  }

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

const notFound = () => {
  return (
    <NotFoundContainer>
      <h1>Página não encontrada!</h1>
      <LinkButton href={'/'}>
        <p>Volte para a Home!</p>
        <ReturnIcon />
      </LinkButton>
    </NotFoundContainer>
  );
};

export default notFound;
