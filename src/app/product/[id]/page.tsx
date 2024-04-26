'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { ProductDataType } from '@/types/productsFetchResponse';
import { CartIcon } from '@/components/icons/CartIcon';
import ReturnIcon from '@/components/icons/ReturnIcon';

const ContainerProductPage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-secondary);
  padding: 20px 160px;
  margin: 0 auto;
  justify-content: space-between;
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

const ContainerProductInformations = styled.section`
  display: flex;
  gap: 32px;

  img {
    max-width: 640px;
    width: 50%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    object-fit: cover;
  }
`;

const ContainerReturn = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  width: max-content;
  font-weight: 500;
  color: var(--text-dark);
  cursor: pointer;
  margin-bottom: 17px;
  padding: 5px;

  &:hover {
    color: var(--text-dark-2);

    svg {
      path {
        stroke: var(--text-dark-2);
        color: var(--text-dark-2);
      }
    }
  }
`;

const ContainerDescription = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  button {
    mix-blend-mode: multiply;
    align-self: flex-end;
    background: #115d8c;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: #f5f5fa;
    text-transform: uppercase;
    outline: none;
    border: none;
    padding: 10px 0;
    cursor: pointer;
    user-select: none;

    svg {
      path {
        stroke: #f5f5fa;
        color: #f5f5fa;
      }
    }
  }
`;

const ProductInfo = styled.div`
  div {
    p {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: var(--text-dark-2);
    }

    h2 {
      font-size: 32px;
      font-weight: 300;
      line-height: 48px;
      color: var(--text-dark-2);
    }
    margin-bottom: 20px;
  }

  h3 {
    font-size: 32px;
    font-weight: 600;
    line-height: 30px;
    color: var(--shapes-dark);
  }
  span {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    color: var(--text-dark-2);
  }

  div {
    margin-top: 24px;
    h5 {
      text-transform: uppercase;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      color: #737380;
    }
    p {
      margin-top: 8px;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
      color: #41414d;
    }
  }
`;

const InstallmentPrice = styled.h4`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  margin-bottom: 20px;

  p {
    padding-top: 5px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-dark-2);
  }
  span {
    text-transform: uppercase;
    font-size: 24px;
    font-weight: 600;
    line-height: 24px;
    color: #000;
  }
`;

const SizeNumbers = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    user-select: none;
    padding: 15px 30px;
    font-size: 22px;
    background: #115d8c;
    color: #fff;
  }
`;

const formattedValue = (value: string) => {
  const formatted = parseFloat(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
  const noSpace = formatted.replace(/\s/g, '');
  return noSpace;
};

const ProductPage = ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const router = useRouter();
  const handleNavigate = () => {
    router.back();
  };

  const fetchUrl = `https://api-storage-products.vercel.app/products/${id}`;

  const fetchData = async () => {
    const response = await fetch(fetchUrl);
    return response.json();
  };

  const { isLoading, data } = useQuery<ProductDataType>({
    queryKey: ['product', id],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const formatSizes = (sizes: string[]) => {
    const formattedSizes =
      sizes.length > 1
        ? sizes.slice(0, -1).join(', ') + ' e ' + sizes[sizes.length - 1]
        : sizes.join('');
    return formattedSizes;
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && data && (
        <ContainerProductPage>
          <ContainerReturn onClick={handleNavigate}>
            <p>Voltar</p> <ReturnIcon />
          </ContainerReturn>
          <ContainerProductInformations>
            <Image
              width={640}
              height={580}
              src={data.image}
              alt="Product Image"
            />
            <ContainerDescription>
              <ProductInfo>
                <div>
                  <p>
                    {data.category === 'womansClothing'
                      ? 'Blusa feminina'
                      : 'Blusa Masculina'}
                  </p>
                  <h2>{data.name}</h2>
                </div>
                <h3>{formattedValue(String(data.price))}</h3>
                <InstallmentPrice>
                  <p>Parcelamos em até</p>
                  <span>
                    {data.parcelamento[0]}x de{' '}
                    {formattedValue(String(data.parcelamento[1]).trim()).trim()}
                  </span>
                </InstallmentPrice>
                <span>
                  *Frete de R$40,00 para todo o Brasil. Grátis para compras
                  acima de R$900,00.
                </span>
                <div>
                  <h5>Descrição</h5>
                  <p>
                    {data.name} disponível nos tamanhos {formatSizes(data.size)}
                  </p>
                </div>
              </ProductInfo>

              <SizeNumbers>
                {data.size.map((item, index) =>
                  item
                    .split(',')
                    .map((size, subIndex) => (
                      <p key={`${index}-${subIndex}`}>{size.trim()}</p>
                    )),
                )}
              </SizeNumbers>

              <button>
                <CartIcon /> Adicionar ao carrinho
              </button>
            </ContainerDescription>
          </ContainerProductInformations>
        </ContainerProductPage>
      )}
    </>
  );
};

export default ProductPage;