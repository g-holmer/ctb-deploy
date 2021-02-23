import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FooterProps {}

const StyledFooter = styled.footer`
  top: 61px;
  box-shadow: 0px -12px 35px rgba(0, 0, 0, 0.6);
  width: 100%;
  background: #111;
  min-height: 70px;
  color: #f5f5f5;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #5c5c5c;
  div {
    margin-left: 4vw;
    margin: 1vw;
  }
  nav {
    margin: 1vw;
    margin-right: 4vw;
    ul {
      display: flex;
      margin: 0;
      padding: 0;

      li {
        margin-left: 4vw;
        list-style: none;
        a {
          color: #f5f5f5;
          text-decoration: none;
        }
      }
    }
  }
`;

export function Footer(props: FooterProps) {
  return (
    <StyledFooter>
      <p style={{ fontSize: '12px' }}>© Café Table Booking 2021</p>
    </StyledFooter>
  );
}

export default Footer;
