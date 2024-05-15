// import React from 'react';
// import { useSearchParams } from 'next/navigation';
// import { FilterType, OrderProductsEnum } from '@/types/filterTypes';
// import { useQuery } from '@tanstack/react-query';

// interface ProductsContextProps {
//   currentPage: number;
//   setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
//   perPage: number;
//   setPerPage: React.Dispatch<React.SetStateAction<number>>;
//   totalItems: number | null;
//   totalPages: number;
//   setTotalItems: React.Dispatch<React.SetStateAction<number | null>>;
//   setTotalPages: React.Dispatch<React.SetStateAction<number>>;
//   valueSearchReplaced: string | null;
//   pageSearchQueryParam: string | null;
//   setValueSearchReplaced: React.Dispatch<React.SetStateAction<string | null>>;
//   typesProducts: FilterType;
//   setTypesProducts: React.Dispatch<React.SetStateAction<FilterType>>;
//   orderProducts: OrderProductsEnum | null;
//   setOrderProducts: React.Dispatch<
//     React.SetStateAction<OrderProductsEnum | null>
//   >;
// }

// export const ProductsContext = React.createContext<
//   ProductsContextProps | undefined
// >(undefined);

// export function ProductsContextProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const searchParams = useSearchParams();
//   const pageSearchParam = searchParams.get('_page');
//   const typeProductSearchParam = searchParams.get('typeProduct');
//   const [currentPage, setCurrentPage] = React.useState(1);
//   const [perPage, setPerPage] = React.useState(12);
//   const [totalPages, setTotalPages] = React.useState<number>(0);
//   const [totalItems, setTotalItems] = React.useState<number | null>(0);
//   const [typesProducts, setTypesProducts] = React.useState(
//     FilterType.allProducts,
//   );
//   const [orderProducts, setOrderProducts] =
//     React.useState<OrderProductsEnum | null>(null);
//   const sortSearchParam = searchParams.get('_sort');
//   const pageSearchQueryParam = searchParams.get('search_query');
//   const [valueSearchReplaced, setValueSearchReplaced] = React.useState<
//     string | null
//   >(null);
//   let url = 'https://api-storage-products.vercel.app/quantitys';

//   if (pageSearchQueryParam) {
//     const valueSearchReplaced = pageSearchQueryParam.replace(
//       /\s+(?=\S)/g,
//       '%20',
//     );
//     url = `https://api-storage-products.vercel.app/products?q=${valueSearchReplaced}`;
//   }

//   const fetchData = async () => {
//     const response = await fetch(url);
//     return response.json();
//   };

//   const { data } = useQuery({
//     queryKey: [totalItems, pageSearchQueryParam],
//     queryFn: fetchData,
//     staleTime: 1000 * 60 * 60 * 24,
//   });

//   React.useEffect(() => {
//     if (sortSearchParam && OrderProductsEnum.hasOwnProperty(sortSearchParam)) {
//       if (sortSearchParam === 'news') {
//         setOrderProducts(OrderProductsEnum['news']);
//       }
//       if (sortSearchParam === 'HigherLower') {
//         setOrderProducts(OrderProductsEnum['HigherLower']);
//       }
//       if (sortSearchParam === 'LowerHigher') {
//         setOrderProducts(OrderProductsEnum['LowerHigher']);
//       }
//     }
//   }, [sortSearchParam]);
//   React.useEffect(() => {
//     if (pageSearchQueryParam) {
//       setValueSearchReplaced(pageSearchQueryParam.replace(/\s+(?=\S)/g, '%20'));
//     } else {
//       setValueSearchReplaced(null);
//     }
//   }, [pageSearchQueryParam]);

//   React.useEffect(() => {
//     if (data) {
//       if (!pageSearchQueryParam) {
//         if (!typeProductSearchParam) {
//           setTotalItems(Number(data.allProducts));
//         }
//         if (typeProductSearchParam === 'allProducts') {
//           setTotalItems(Number(data.allProducts));
//           setTypesProducts(FilterType.allProducts);
//         }
//         if (typeProductSearchParam === 'mensClothing') {
//           setTotalItems(Number(data.mensClothing));
//           setTypesProducts(FilterType.mensClothing);
//         }
//         if (typeProductSearchParam === 'womansClothing') {
//           setTotalItems(Number(data.womansClothing));
//           setTypesProducts(FilterType.womansClothing);
//         }
//       }
//       if (pageSearchQueryParam && Array.isArray(data)) {
//         setTotalItems(data.length);
//       }
//     }
//   }, [data, typeProductSearchParam, setTypesProducts, pageSearchQueryParam]);

//   React.useEffect(() => {
//     if (pageSearchParam && Number(pageSearchParam) !== 0) {
//       setCurrentPage(Number(pageSearchParam));
//     }
//   }, [pageSearchParam]);

//   React.useEffect(() => {
//     if (totalItems) {
//       setTotalPages(Math.ceil(totalItems / perPage));
//     }
//   }, [totalItems, perPage]);

//   React.useEffect(() => {
//     if (!pageSearchParam && currentPage > totalPages) {
//       setCurrentPage(1);
//     }
//   }, [totalPages, currentPage, pageSearchParam]);

//   return (
//     <ProductsContext.Provider
//       value={{
//         currentPage,
//         setCurrentPage,
//         perPage,
//         setPerPage,
//         totalItems,
//         totalPages,
//         setTotalItems,
//         setTotalPages,
//         valueSearchReplaced,
//         pageSearchQueryParam,
//         setValueSearchReplaced,
//         typesProducts,
//         setTypesProducts,
//         orderProducts,
//         setOrderProducts,
//       }}
//     >
//       {children}
//     </ProductsContext.Provider>
//   );
// }
