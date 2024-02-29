import React from 'react';
import styled from 'styled-components';

const TagInputSearch = styled.input`
  background-color: var(--bg-secondary);
  font-size: 14px;
  font-weight: 400;
  border: none;
  outline: none;
  width: 280px;
  height: 42px;
  border-radius: 8px;
  line-height: 22px;
  letter-spacing: 0em;
`;

const SearchInput = () => {
  return <TagInputSearch placeholder="Procurando por algo específico?" />;
};

export default SearchInput;
