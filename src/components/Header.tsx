'use client';
import { Saira_Stencil_One } from 'next/font/google';

import { styled } from 'styled-components';

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

const Header = () => {
  return (
    <TagHeader>
      <TagLogo className={sairaStencil.className}>capputeeno</TagLogo>
    </TagHeader>
  );
};

export default Header;
