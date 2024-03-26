import { PaginationContext } from '@/components/context/ContextPagination';
import React from 'react';

export function usePagination() {
  const context = React.useContext(PaginationContext);
  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return context;
}
