'use client';

import styled from 'styled-components';
export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--bg-secondary);
  padding: 0 160px;
  margin: 0 auto;
  justify-content: space-between;
  @media (max-width: 1050px) {
    padding: 0 100px;
  }
  @media (max-width: 950px) {
    padding: 0 80px;
  }
  @media (max-width: 800px) {
    padding: 0 60px;
  }
  @media (max-width: 780px) {
    padding: 0 50px;
  }
`;

export const ContainerFilterAndPagination = styled.div`
  margin-top: 34px;
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 1120px) {
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }
`;

export const ContainerPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 1120px) {
    justify-content: center;
    padding-bottom: 20px;
  }
`;
