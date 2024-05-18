'use client';
import { Saira_Stencil_One } from 'next/font/google';
import SearchInput from '../components/SearchInput';
import { styled } from 'styled-components';
import CartControl from './CartControl';

const TagHeader = styled.header`
  padding: 20px 160px;
  div:first-child {
    max-width: 1425px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;

    @media (max-width: 760px) {
      flex-direction: column;
    }
  }

  background-color: #fff;
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

  @media (max-width: 330px) {
    font-size: 37px;
  }
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
      <div>
        <Logo href="/" className={sairaStencil.className}>
          E-commerce
        </Logo>
        <Container>
          <SearchInput />
          <CartControl />
        </Container>
      </div>
    </TagHeader>
  );
};

export default Header;
