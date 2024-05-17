import FilterList from '@/components/FilterList';
import {
  MainContainer,
  ContainerFilterAndPagination,
  ContainerPagination,
} from '@/components/StyledContainers/PageStyledComponent';

import ProductsList from '@/components/ProductsList';
import PaginationListComponent from '@/components/PaginationListComponent';
import Pagination from '@/components/Pagination';

export default async function Home() {
  return (
    <>
      <MainContainer>
        <ContainerFilterAndPagination>
          <FilterList />
          <Pagination />
        </ContainerFilterAndPagination>
        <ProductsList></ProductsList>
        <ContainerPagination>
          <PaginationListComponent />
        </ContainerPagination>
      </MainContainer>
    </>
  );
}
