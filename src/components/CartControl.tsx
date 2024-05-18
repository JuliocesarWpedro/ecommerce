import React from 'react';
import { CartIcon } from './icons/CartIcon';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

const Container = styled.div`
  position: relative;
  justify-content: center;
  display: flex;
  cursor: pointer;
`;

const NumberCartProducts = styled.span`
  position: absolute;
  top: 14px;
  left: 13px;
  align-items: center;
  justify-content: center;
  color: #fff;
  display: flex;
  font-size: 10px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 0em;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background-color: var(--delete-color);
`;

const CartControl = () => {
  const router = useRouter();

  const { totalItems } = useCart();
  const handlePage = () => {
    router.push('/cart');
  };

  return (
    <Container onClick={handlePage}>
      <CartIcon />
      {totalItems > 0 && <NumberCartProducts>{totalItems}</NumberCartProducts>}
    </Container>
  );
};

export default CartControl;
