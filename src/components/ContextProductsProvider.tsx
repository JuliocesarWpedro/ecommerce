'use client';
import { ProductsContextProvider } from '@/context/ContextProducts';
import { Suspense } from 'react';

export const ContextProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ProductsContextProvider>
      <Suspense fallback={<div>Loading</div>}>{children}</Suspense>
    </ProductsContextProvider>
  );
};
