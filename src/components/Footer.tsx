'use client';
import React from 'react';
import styled from 'styled-components';

const TagFooter = styled.footer`
  display: flex;
  width: 100%;
  background-color: #fff;
  padding: 20px 160px;
  justify-content: center;
  align-items: center;
  text-align: center;
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
`;

const Footer = () => {
  return (
    <TagFooter>
      © {new Date().getFullYear()} Eccomerce. Todos os direitos reservados.
    </TagFooter>
  );
};

export default Footer;
