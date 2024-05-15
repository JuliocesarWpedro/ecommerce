import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import ReturnIcon from '@/components/icons/ReturnIcon';
import DeleteIcon from '@/components/icons/DeleteIcon';

const CartProductsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 32px;
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
`;

const ProductsContent = styled.div`
  width: 65%;
`;

const ProductContainer = styled.div`
  border-radius: 8px;
  display: flex;
  img {
    width: 256px;
    height: 211px;
    object-fit: cover;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: var(--text-dark-2);
  }
`;

const TextProduct = styled.div`
  padding: 16px 24px 16px 31px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div:first-child {
    display: flex;
    justify-content: space-between;

    h2 {
      font-size: 20px;
      font-weight: 300;
      line-height: 30px;
      text-align: left;
      color: var(--text-dark-2);
    }
  }

  p {
    color: var(--text-dark-2);
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    text-align: left;
  }

  div:last-child {
    display: flex;
    justify-content: space-between;
    align-items: end;

    span {
      color: #09090a;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
    }
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

const SelectQuantity = styled.select`
  padding: 8px;
  border: 1.5px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-secondary);
  color: var(--text-dark);
  font-weight: 400;
  font-size: 16px;
`;

const CartItem = () => {
  return (
    <CartProductsContainer>
      <ProductsContent>
        <TotalCart>
          <h2>Seu carrinho</h2>
          <p>
            Total (3 produtos) <span>R$161,00</span>
          </p>
        </TotalCart>
        <div>
          <ProductContainer>
            <Image
              width="256"
              alt="Product Image"
              height="211"
              src="/imagetext.webp"
            />
            <TextProduct>
              <div>
                <h2>Caneca de cerâmica rústica</h2>
                <DeleteIcon />
              </div>
              <p>
                Aqui vem um texto descritivo do produto, esta caixa de texto
                servirá apenas de exemplo para que simule algum texto que venha
                a ser inserido nesse campo, descrevendo tal produto.
              </p>
              <div>
                <SelectQuantity>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </SelectQuantity>
                <span>R$ 40,00</span>
              </div>
            </TextProduct>
          </ProductContainer>
        </div>
      </ProductsContent>
      <OrderSummary>
        <h2>Resumo do pedido</h2>
        <PriceContainer>
          <p>Subtotal de produtos</p>
          <p>R$ 161,00</p>
        </PriceContainer>
        <PriceContainer>
          <p>Entrega</p>
          <p>R$ 40,00</p>
        </PriceContainer>
        <TotalPrice>
          <p>Total</p>
          <p>R$ 201,00</p>
        </TotalPrice>
        <button>Finalizar a compra</button>
      </OrderSummary>
    </CartProductsContainer>
  );
};

export default CartItem;
