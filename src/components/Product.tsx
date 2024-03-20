import React from 'react';
import styled from 'styled-components';
import { ProductType } from '@/types/productsFetchResponse';
import Image from 'next/image';

const formattedValue = (value: string) => {
  const formatted = parseFloat(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

  return formatted;
};

const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 195px;
  height: 378px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 195px;
  background-color: #fff;
  height: 78px;
  justify-content: space-between;
  border-radius: 0 0 4px 4px;
  padding: 8px 12px;
`;

const LineSeparator = styled.div`
  display: block;
  content: '';
  height: 1px;
  background-color: var(--shapes);
`;

const TitleProduct = styled.h1`
  font-size: 16px;
  color: var(--text-dark-2);
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
`;

const PriceProduct = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--shapes-dark);
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
`;

const LinkImg = styled.a`
  height: 300px;
  border-radius: 8px 8px 0px 0px;

  & > * {
    border-radius: 8px 8px 0px 0px;
  }
`;

const Product = ({ product }: { product: ProductType }) => {
  return (
    <ProductItem>
      <LinkImg href="/">
        <Image src={product.image} alt="" width={195} height={300} />
      </LinkImg>
      <TextContainer>
        <TitleProduct>{product.name}</TitleProduct>
        <LineSeparator />
        <PriceProduct>{formattedValue(String(product.price))}</PriceProduct>
      </TextContainer>
    </ProductItem>
  );
};

export default Product;
