import OrderProducts, {
  FilterType,
  OrderProductsEnum,
} from '@/types/filterTypes';
import { useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const [typesProducts, setTypesProducts] = React.useState(
    FilterType.allProducts,
  );

  const [orderProducts, setOrderProducts] =
    React.useState<OrderProductsEnum | null>(null);

  const sortSearchParam = searchParams.get('_sort');
  const orderSearchParam = searchParams.get('_order');

  React.useEffect(() => {
    if (sortSearchParam && OrderProductsEnum.hasOwnProperty(sortSearchParam)) {
      if (sortSearchParam === 'news') {
        setOrderProducts(OrderProductsEnum['news']);
      }
      if (sortSearchParam === 'HigherLower') {
        setOrderProducts(OrderProductsEnum['HigherLower']);
      }
      if (sortSearchParam === 'LowerHigher') {
        setOrderProducts(OrderProductsEnum['LowerHigher']);
      }
    }
  }, [sortSearchParam]);

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
