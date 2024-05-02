'use client';
import { ProductsContextProvider } from '@/context/ContextProducts';

export const ContextProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ProductsContextProvider>{children}</ProductsContextProvider>;
};
