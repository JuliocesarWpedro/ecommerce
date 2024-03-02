import React from 'react';
import { ArrowIcon } from './icons/ArrowIcon';
import styled from 'styled-components';
import OrderProducts from '@/types/FilterTypes';

const Container = styled.div`
  position: relative;
`;

const OrderByTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-dark);
  gap: 8px;
  cursor: pointer;
`;

const OrderByOpen = styled.ul`
  z-index: 1;
  display: flex;
  padding: 12px 16px;
  width: 176px;
  border-radius: 4px;
  flex-direction: column;
  background-color: #fff;
  position: absolute;
  right: -15px;
  color: var(--text-dark);
  gap: 4px;
  cursor: pointer;
  list-style: none;

  @media (max-width: 525px) {
    width: 200px;
    right: -37px;
  }
`;

const OrderByOpenItem = styled.li`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  color: var(--text-dark);
  cursor: pointer;
  &:hover {
    color: var(--text-dark-2);
    font-weight: 600;
  }
`;

const ORDERBYOPTIONS: OrderProducts = {
  news: 'Novidades',
  HigherLower: 'Preço: Maior - Menor',
  LowerHigher: 'Preço: Menor - Maior',
  bestSellers: 'Mais Vendidos',
};

const OrderBy = () => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [orderProducts, setOrderProducts] =
    React.useState<OrderProducts | null>(null);
  return (
    <Container>
      <OrderByTag onClick={() => setOpenModal((value) => !value)}>
        <span>Organizar por</span> <ArrowIcon rotationDeg="0" />
      </OrderByTag>
      {openModal && (
        <OrderByOpen>
          {Object.entries(ORDERBYOPTIONS).map(([key, value], index) => (
            <OrderByOpenItem
              key={index}
              onClick={() => {
                setOpenModal((value) => !value);
                setOrderProducts(value);
              }}
            >
              {value}
            </OrderByOpenItem>
          ))}
        </OrderByOpen>
      )}
    </Container>
  );
};

export default OrderBy;
