import React from 'react';
import { ArrowIcon } from './icons/ArrowIcon';
import styled from 'styled-components';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Container = styled.div`
  position: relative;
`;

const OrderByTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-dark);
  gap: 8px;
  cursor: pointer;
`;

const OrderByOpen = styled.ul`
  z-index: 1;
  display: flex;
  padding: 12px 16px;
  width: 176px;
  border-radius: 4px;
  flex-direction: column;
  background-color: #fff;
  position: absolute;
  right: -15px;
  color: var(--text-dark);
  gap: 4px;
  cursor: pointer;
  list-style: none;

  @media (max-width: 525px) {
    width: 200px;
    right: -37px;
  }
`;

const OrderByOpenItem = styled.li`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  color: var(--text-dark);
  cursor: pointer;
  &:hover {
    color: var(--text-dark-2);
    font-weight: 600;
  }
`;

const ORDERBYOPTIONS = {
  news: 'Novidades',
  HigherLower: 'Preço: Maior - Menor',
  LowerHigher: 'Preço: Menor - Maior',
};

const OrderBy = () => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const dropDownModal = React.useRef<HTMLUListElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const orderByTagRef = React.useRef<HTMLDivElement>(null);
  const spanRef = React.useRef<HTMLSpanElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const typeProduct = searchParams.get('typeProduct');
  const search_query = searchParams.get('search_query');

  const handleClickOutsideLanguageDropdown = React.useCallback(
    (e: Event) => {
      const target = e.target as HTMLElement;

      if (
        openModal &&
        dropDownModal.current &&
        target !== orderByTagRef.current &&
        !orderByTagRef.current?.contains(target) &&
        target !== spanRef.current &&
        !spanRef.current?.contains(target) &&
        !dropDownModal.current.contains(target) &&
        !containerRef.current?.contains(target)
      ) {
        setOpenModal(false);
      }
    },
    [openModal],
  );

  const updateSearchParams = (
    params: URLSearchParams,
    updates: Record<string, string | null>,
  ) => {
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    return `${pathname}?${params.toString()}`;
  };

  const handleOrderProducts = (key: string) => {
    const params = new URLSearchParams(searchParams);
    const updates = {
      _page: '1',
      search_query: search_query ? search_query.replace(/\s+/g, '+') : null,
      _sort: key,
      typeProduct,
    };
    replace(updateSearchParams(params, updates));
    setOpenModal(false);
  };

  React.useEffect(() => {
    const handleClick = (e: Event) => {
      handleClickOutsideLanguageDropdown(e);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [handleClickOutsideLanguageDropdown]);

  return (
    <>
      <Container ref={containerRef}>
        <OrderByTag
          ref={orderByTagRef}
          onClick={() => setOpenModal((value) => !value)}
        >
          <span ref={spanRef}>Organizar por</span> <ArrowIcon rotationDeg="0" />
        </OrderByTag>
        {openModal && (
          <OrderByOpen ref={dropDownModal}>
            {Object.entries(ORDERBYOPTIONS).map(([key, value], index) => (
              <OrderByOpenItem
                key={index}
                onClick={() => handleOrderProducts(key)}
              >
                {value}
              </OrderByOpenItem>
            ))}
          </OrderByOpen>
        )}
      </Container>
    </>
  );
};

export default OrderBy;
