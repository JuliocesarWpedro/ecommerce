'use client';
import { Saira_Stencil_One } from 'next/font/google';
import SearchInput from '../components/SearchInput';
import { styled } from 'styled-components';

import CartControl from './CartControl';

const TagHeader = styled.header`
  display: flex;
  width: 100%;
  background-color: #fff;
  padding: 20px 160px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1050px) {
    padding: 20px 100px;
  }

  @media (max-width: 950px) {
    padding: 20px 80px;
  }

  @media (max-width: 800px) {
    padding: 20px 60px;
  }

  @media (max-width: 780px) {
    padding: 20px 50px;
  }

  @media (max-width: 760px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const sairaStencil = Saira_Stencil_One({
  weight: ['400'],
  subsets: ['latin'],
});

const Logo = styled.a`
  font-size: 40px;
  font-weight: 400;
  text-decoration: none;
  line-height: 60px;
  letter-spacing: 0em;
  color: var(--logo-color);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Header = () => {
  return (
    <TagHeader>
      <Logo href="/" className={sairaStencil.className}>
        E-commerce
      </Logo>
      <Container>
        <SearchInput />
        <CartControl />
      </Container>
    </TagHeader>
  );
};

export default Header;
