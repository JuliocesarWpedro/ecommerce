import { ProductDataType } from '@/types/productsFetchResponse';
import Product from '../components/Product';
import { Metadata } from 'next';
import FilterList from '@/components/FilterList';
// import Pagination from '@/components/Pagination';
// import PaginationListComponent from '@/components/PaginationListComponent';
// import ProductsList from '@/components/ProductsList';
import {
  MainContainer,
  ContainerFilterAndPagination,
  ContainerPagination,
} from '@/components/StyledContainers/PageStyledComponent';

import { SearchParams } from '@/types/SearchParams';
import ProductsList from '@/components/ProductsList';
import PaginationListComponent from '@/components/PaginationListComponent';
import Pagination from '@/components/Pagination';

export default async function Home(params: SearchParams) {
  return (
    <>
      <MainContainer>
        <ContainerFilterAndPagination>
          <FilterList searchParams={params.searchParams} />
          <Pagination searchParams={params.searchParams} />
        </ContainerFilterAndPagination>
        <ProductsList searchParams={params.searchParams}></ProductsList>
        <ContainerPagination>
          <PaginationListComponent searchParams={params.searchParams} />
        </ContainerPagination>
      </MainContainer>
    </>
  );
}
