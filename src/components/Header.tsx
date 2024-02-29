'use client';
import { Saira_Stencil_One } from 'next/font/google';
import SearchInput from '../components/SearchInput';
import { styled } from 'styled-components';
import { SearchIcon } from './icons/SearchIcon';

const TagHeader = styled.header`
  display: flex;
  width: 100%;
  padding: 20px 160px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

const sairaStencil = Saira_Stencil_One({
  weight: ['400'],
  subsets: ['latin'],
});

const TagLogo = styled.a`
  font-size: 40px;
  font-weight: 400;
  line-height: 60px;
  letter-spacing: 0em;
  color: var(--logo-color);
`;

const SearchContainer = styled.div`
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
`;

const Header = () => {
  return (
    <TagHeader>
      <TagLogo className={sairaStencil.className}>capputeeno</TagLogo>
      <SearchContainer>
        <SearchInput />
        <SearchIcon />
      </SearchContainer>
    </TagHeader>
  );
};

export default Header;
