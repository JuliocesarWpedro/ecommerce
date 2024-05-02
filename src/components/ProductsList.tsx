import { ProductDataType } from '@/types/productsFetchResponse';
import React from 'react';
import styled from 'styled-components';
import Product from './Product';
import { FilterType, OrderProductsEnum } from '@/types/filterTypes';
import SkeletonProducts from './SkeletonProducts';
import { useQuery } from '@tanstack/react-query';
import { useContextProducts } from '@/hooks/useContextProducts';
import Link from 'next/link';

const ContainerProducts = styled.div`
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  height: 100%;
  justify-content: center;
  gap: 32px;
  padding-bottom: 74px;
`;

const NoProductsTitle = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  line-height: 60px;
  letter-spacing: 0em;
  color: var(--text-dark);
  @media (max-width: 580px) {
    font-size: 30px;
  }
  @media (max-width: 440px) {
    font-size: 20px;
  }
`;

export const LinkButton = styled(Link)`
  user-select: none;
  gap: 10px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 448px;
  height: 44px;
  text-decoration: none;
  border-radius: 4px;
  background-color: var(--text-dark-2);
  color: #fff;

  @media (max-width: 600px) {
    width: 100%;
    padding: 0px 20px;
  }
  @media (max-width: 330px) {
    width: 100%;
    padding: 0px 10px;
  }

  &:hover {
    background-color: #373742;
  }
`;

const ContainerNoProductsSearch = styled.div`
  display: flex;
  padding-top: 60px;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  text-align: center;
  height: calc(100vh - 100px - 38px - 60px);
`;

const ProductsList = () => {
  const {
    currentPage,
    perPage,
    typesProducts,
    orderProducts,
    valueSearchReplaced,
    setTotalItems,
    setTotalPages,
  } = useContextProducts();

  const [noProductsInSearch, setNoProductsInSearch] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (noProductsInSearch) {
      setTotalItems(0);
      setTotalPages(0);
    }
  }, [noProductsInSearch, setTotalItems, setTotalPages]);

  const fetchUrl = React.useMemo(() => {
    let url = `https://api-storage-products.vercel.app/products?_page=${currentPage}&_limit=${perPage}`;
    const category = FilterType[typesProducts].toString();

    if (typesProducts !== FilterType.allProducts) {
      url = `https://api-storage-products.vercel.app/products?category=${category}&_page=${currentPage}&_limit=${perPage}`;
    }
    if (orderProducts) {
      if (orderProducts === OrderProductsEnum.news) {
        if (typesProducts === FilterType.allProducts) {
          url = `https://api-storage-products.vercel.app/products?_sort=id&_order=asc&_page=${currentPage}&_limit=${perPage}`;
        } else {
          url = `https://api-storage-products.vercel.app/products?category=${category}&_sort=id&_order=asc&_page=${currentPage}&_limit=${perPage}`;
        }
      }
      if (orderProducts === OrderProductsEnum.LowerHigher) {
        if (typesProducts !== FilterType.allProducts) {
          url = `https://api-storage-products.vercel.app/products?category=${category}&_sort=price&_order=asc&_page=${currentPage}&_limit=${perPage}`;
        } else {
          url = `https://api-storage-products.vercel.app/products?_sort=price&_order=asc&_page=${currentPage}&_limit=${perPage}`;
        }
      }
      if (orderProducts === OrderProductsEnum.HigherLower) {
        if (typesProducts !== FilterType.allProducts) {
          url = `https://api-storage-products.vercel.app/products?category=${category}&_sort=price&_order=desc&_page=${currentPage}&_limit=${perPage}`;
        } else {
          url = `https://api-storage-products.vercel.app/products?_sort=price&_order=desc&_page=${currentPage}&_limit=${perPage}`;
        }
      }
    }
    if (valueSearchReplaced) {
      url = `https://api-storage-products.vercel.app/products?q=${valueSearchReplaced}&_page=${currentPage}&_limit=${perPage}`;
    }

    return url;
  }, [typesProducts, currentPage, perPage, orderProducts, valueSearchReplaced]);

  const fetchData = async () => {
    const response = await fetch(fetchUrl);
    return response.json();
  };

  const { isPending, data } = useQuery({
    queryKey: [
      'products',
      currentPage,
      perPage,
      typesProducts,
      orderProducts,
      valueSearchReplaced,
    ],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 60 * 24,
  });

  React.useEffect(() => {
    if (valueSearchReplaced && !isPending && (!data || data.length === 0)) {
      setNoProductsInSearch(true);
    } else {
      setNoProductsInSearch(false);
    }
  }, [valueSearchReplaced, data, isPending]);

  const orderedProducts = React.useMemo(() => {
    if (data && Array.isArray(data)) {
      if (
        orderProducts &&
        OrderProductsEnum[orderProducts].toString() === 'news'
      ) {
        return data.sort((a, b) => +b.id - +a.id);
      }
      if (
        orderProducts &&
        OrderProductsEnum[orderProducts].toString() === 'LowerHigher'
      ) {
        return data.sort((a, b) => a.price - b.price);
      }
      if (
        orderProducts &&
        OrderProductsEnum[orderProducts].toString() === 'HigherLower'
      ) {
        return data.sort((a, b) => b.price - a.price);
      }
    }
    return null;
  }, [data, orderProducts]);

  return (
    <>
      {noProductsInSearch && (
        <ContainerNoProductsSearch>
          <NoProductsTitle>Nenhum produto encontrado!</NoProductsTitle>
          <LinkButton href={'/'}>Volte para a Home</LinkButton>
        </ContainerNoProductsSearch>
      )}
      {!noProductsInSearch && (
        <ContainerProducts>
          {isPending && <SkeletonProducts />}
          {!isPending &&
            data &&
            Array.isArray(data) &&
            !orderedProducts &&
            data.map((product: ProductDataType) => (
              <Product key={product.id} product={product} />
            ))}
          {!isPending &&
            data &&
            Array.isArray(data) &&
            orderedProducts &&
            orderedProducts.map((product: ProductDataType) => (
              <Product key={product.id} product={product} />
            ))}
        </ContainerProducts>
      )}
    </>
  );
};

export default ProductsList;
