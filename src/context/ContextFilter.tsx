import { FilterType } from '@/types/filterTypes';
import React from 'react';

interface FilterContextProps {
  typesProducts: FilterType;
  setTypesProducts: React.Dispatch<React.SetStateAction<FilterType>>;
}
export const FilterContext = React.createContext<
  FilterContextProps | undefined
>(undefined);

export function FilterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [typesProducts, setTypesProducts] = React.useState(
    FilterType.allProducts,
  );

  return (
    <FilterContext.Provider value={{ typesProducts, setTypesProducts }}>
      {children}
    </FilterContext.Provider>
  );
}
