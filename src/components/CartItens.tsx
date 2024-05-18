import React from 'react';
import styled from 'styled-components';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import FormatPrice from '@/utilities/FormatPrice';
import { CartValue } from '@/types/cart';
import CartItem from './CartItem';
import { useCart } from '@/context/CartContext';

const CartProductsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 32px;

  @media (max-width: 880px) {
    flex-direction: column;
  }
`;

const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 16px 24px;
  width: 30%;

  h2 {
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    color: var(--text-dark-2);
    text-transform: uppercase;
    margin-bottom: 17px;
  }

  button {
    cursor: pointer;
    background-color: #51b853;
    margin-top: 40px;
    padding: 10px 0;
    border-radius: 4px 0px 0px 0px;
    opacity: 0px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    color: #f5f5fa;
    border: none;
    outline: none;
  }

  span {
    margin-top: 20px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: var(--text-dark-2);
  }
  @media (max-width: 880px) {
    width: 100%;
  }
`;

const ProductsContent = styled.div`
  width: 65%;

  @media (max-width: 880px) {
    width: 100%;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  gap: 10px;
  align-items: center;

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: var(--text-dark-2);
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 8px;
  border-top: 1px solid #dce2e5;
  p {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: var(--text-dark-2);
  }
`;
const ContainerProducts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const TotalCart = styled.div`
  margin-bottom: 23px;
  h2 {
    font-size: 24px;
    font-weight: 500;
    line-height: 36px;
    color: var(--text-dark-2);
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  p {
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    span {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
    }
  }
`;

const CartItens = () => {
  const { cartItems, freightPrice, totalPrice, totalPriceWithfreight } =
    useCart();

  return (
    <CartProductsContainer>
      <ProductsContent>
        <TotalCart>
          <h2>Seu carrinho</h2>
          <p>
            Total ({cartItems.length}{' '}
            {cartItems.length == 1 ? 'produto' : 'produtos'}){' '}
            <span>{FormatPrice(String(totalPrice(cartItems)))}</span>
          </p>
          <p>Máximo de 5 unidades por produto.</p>
        </TotalCart>
        <ContainerProducts>
          {cartItems.length == 0 && <h1>Nenhum produto encontrado!</h1>}
          {Array.isArray(cartItems) &&
            cartItems.map((item) => <CartItem key={item.id} product={item} />)}
        </ContainerProducts>
      </ProductsContent>
      <OrderSummary>
        <h2>Resumo do pedido</h2>
        <PriceContainer>
          <p>Subtotal de produtos</p>
          <p>{FormatPrice(String(totalPrice(cartItems)))}</p>
        </PriceContainer>
        <PriceContainer>
          <p>Entrega</p>
          <p>{FormatPrice(String(freightPrice))}</p>
        </PriceContainer>
        <span>Frete grátis em compras acima de R$ 500,00</span>
        <TotalPrice>
          <p>Total</p>
          <p>{totalPriceWithfreight}</p>
        </TotalPrice>

        <button>Finalizar a compra</button>
      </OrderSummary>
    </CartProductsContainer>
  );
};

export default CartItens;
