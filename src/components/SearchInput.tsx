import React from 'react';
import styled from 'styled-components';
import { SearchIcon } from './icons/SearchIcon';

const SearchContainer = styled.form`
  display: flex;
  background-color: var(--bg-secondary);
  padding: 9px 16px;
  font-size: 14px;
  font-weight: 400;
  border: none;
  outline: none;
  width: 352px;
  height: 42px;
  border-radius: 8px;
  line-height: 22px;
  letter-spacing: 0em;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 450px) {
    width: 300px;
  }

  @media (max-width: 360px) {
    width: 250px;
    padding: 9px 9px;
  }
`;

const TagInputSearch = styled.input`
  background-color: var(--bg-secondary);
  font-size: 14px;
  font-weight: 400;
  border: none;
  outline: none;
  width: 280px;
  @media (max-width: 450px) {
    width: 228px;
  }
  @media (max-width: 360px) {
    width: 200px;
  }
  height: 42px;
  border-radius: 8px;
  line-height: 22px;
  letter-spacing: 0em;
`;

const SearchInput = () => {
  const [inputValue, setInputValue] = React.useState<string>('');

  function handleSubmit(value: string) {
    const adjustedValue = inputValue.replace(/\s+(?=\S)/g, '+');
    window.history.pushState({}, '', `?search_query=${adjustedValue}`);
    setInputValue('');
  }

  return (
    <SearchContainer
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(inputValue);
      }}
    >
      <TagInputSearch
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Procurando por algo específico?"
      ></TagInputSearch>
      <SearchIcon
        onClick={() => {
          handleSubmit(inputValue);
        }}
      />
    </SearchContainer>
  );
};

export default SearchInput;
