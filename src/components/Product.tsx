'use client';
import React from 'react';
import styled from 'styled-components';
import { ProductDataType } from '@/types/productsFetchResponse';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FormatPrice from '@/utilities/FormatPrice';

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

const ContainerImg = styled.div`
  height: 300px;
  cursor: pointer;
  border-radius: 8px 8px 0px 0px;

  img {
    object-fit: cover;
    border-radius: 8px 8px 0px 0px;
  }
`;

const Product = ({ product }: { product: ProductDataType }) => {
  const router = useRouter();

  const handlePageProduct = (id: number) => {
    router.push(`product/${id}`);
  };

  return (
    <ProductItem>
      <ContainerImg onClick={() => handlePageProduct(product.id)}>
        <Image
          src={product.image}
          alt=""
          width={195}
          height={300}
          priority={true}
        />
      </ContainerImg>
      <TextContainer>
        <TitleProduct>{product.name}</TitleProduct>
        <LineSeparator />
        <PriceProduct>{FormatPrice(String(product.price))}</PriceProduct>
      </TextContainer>
    </ProductItem>
  );
};

export default Product;
