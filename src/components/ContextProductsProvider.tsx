'use client';
import { ProductsContextProvider } from '@/context/ContextProducts';
const SimpleFallback = () => <div suppressHydrationWarning>Loading...</div>;
export const ContextProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ProductsContextProvider>{children}</ProductsContextProvider>;
};
