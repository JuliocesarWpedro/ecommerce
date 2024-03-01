import React from 'react';
import { CartIcon } from './icons/CartIcon';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  justify-content: center;
  display: flex;
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
  return (
    <Container>
      <CartIcon />
      <NumberCartProducts>1</NumberCartProducts>
    </Container>
  );
};

export default CartControl;
