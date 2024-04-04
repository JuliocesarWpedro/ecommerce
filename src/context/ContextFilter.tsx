import OrderProducts, {
  FilterType,
  OrderProductsEnum,
} from '@/types/filterTypes';
import React from 'react';

interface FilterContextProps {
  typesProducts: FilterType;
  setTypesProducts: React.Dispatch<React.SetStateAction<FilterType>>;
  orderProducts: OrderProductsEnum | null;
  setOrderProducts: React.Dispatch<
    React.SetStateAction<OrderProductsEnum | null>
  >;
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
  const [orderProducts, setOrderProducts] =
    React.useState<OrderProductsEnum | null>(null);

  if (orderProducts) {
    console.log(OrderProductsEnum[orderProducts].toString());
  }

  return (
    <FilterContext.Provider
      value={{
        typesProducts,
        setTypesProducts,
        orderProducts,
        setOrderProducts,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
