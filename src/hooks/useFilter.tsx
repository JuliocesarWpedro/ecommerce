import { FilterContext } from '@/context/ContextFilter';
import React from 'react';

export function useFilter() {
  const context = React.useContext(FilterContext);
  if (!context) {
    throw new Error('useCart must be used within a FilterContextProvider');
  }
  return context;
}
