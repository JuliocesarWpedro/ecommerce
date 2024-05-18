'use client';
import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { CartValue } from '@/types/cart';
import DeleteIcon from './icons/DeleteIcon';
import FormatPrice from '@/utilities/FormatPrice';
import { CartContext, useCart } from '@/context/CartContext';

interface CartItemProps {
  product: CartValue;
}

const ProductContainer = styled.div`
  border-radius: 8px;
  display: flex;
  img {
    width: 256px;
    height: 211px;
    object-fit: cover;
  }

  @media (max-width: 600px) {
    flex-direction: column;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const TextProduct = styled.div`
  padding: 11px 24px 11px 31px;
  gap: 5px;
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
    align-items: center;

    span {
      color: #09090a;
      font-size: 16px;
      font-weight: 600;
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

const CartItem = ({ product }: CartItemProps) => {
  const { handleDeleteItem, handleUpdateQuantity } = useCart();

  const handleChangeQuantity = (e: ChangeEvent<HTMLSelectElement>) => {
    handleUpdateQuantity(product.id, Number(e.target.value));
  };

  return (
    <ProductContainer key={product.id}>
      <Image width="256" alt="Product Image" height="211" src={product.image} />
      <TextProduct>
        <div>
          <h2>{product.name}</h2>
          <span
            onClick={() => handleDeleteItem(product.id)}
            style={{ cursor: 'pointer' }}
          >
            {<DeleteIcon />}
          </span>
        </div>
        <p>
          Aqui vem um texto descritivo do produto, esta caixa de texto servirá
          apenas de exemplo para que simule algum texto que venha a ser inserido
          nesse campo, descrevendo tal produto.
        </p>
        <div>
          <SelectQuantity
            value={product.quantity}
            onChange={handleChangeQuantity}
          >
            {[...Array(5)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </SelectQuantity>
          <span>{FormatPrice(String(product.price))}</span>
        </div>
      </TextProduct>
    </ProductContainer>
  );
};

export default CartItem;
