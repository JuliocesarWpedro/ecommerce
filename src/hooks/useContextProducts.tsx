import { ProductsContext } from '@/context/ContextProducts';
import React from 'react';
export function useContextProducts() {
  const context = React.useContext(ProductsContext);
  if (!context) {
    throw new Error(
      'useContextProducts must be used within a ProductsContextProvider',
    );
  }
  return context;
}
