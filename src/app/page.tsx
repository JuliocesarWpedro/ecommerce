import FilterList from '@/components/FilterList';
import {
  MainContainer,
  ContainerFilterAndPagination,
  ContainerPaginationBottom,
} from '@/components/StyledContainers/PageStyledComponent';

import ProductsList from '@/components/ProductsList';
import PaginationListComponent from '@/components/PaginationListComponent';
import Pagination from '@/components/Pagination';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <MainContainer>
          <ContainerFilterAndPagination>
            <Suspense fallback={<div>Loading</div>}>
              <FilterList />
            </Suspense>
            <Pagination />
          </ContainerFilterAndPagination>
          <Suspense fallback={<div>Loading</div>}>
            <ProductsList></ProductsList>
          </Suspense>
          <ContainerPaginationBottom>
            <Suspense fallback={<div>Loading</div>}>
              <PaginationListComponent />
            </Suspense>
          </ContainerPaginationBottom>
        </MainContainer>
      </Suspense>
    </>
  );
}
