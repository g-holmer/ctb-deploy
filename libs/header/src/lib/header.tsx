import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { SearchBoxComponent } from '@ctb/search-box-component';
/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <StyledHeader>
      <HeaderUpper>
        <Logotype>
          <p>Logotype</p>
        </Logotype>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="">
                <a>Connect Café</a>
              </Link>
            </li>
            <li>
              <Link href="/signIn">
                <a>Login</a>
              </Link>
            </li>
          </ul>
        </nav>
      </HeaderUpper>

      <SearchBoxComponent isHeader={true} />
    </StyledHeader>
  );
}
const StyledHeader = styled.header`
  z-index: 100;
  position: fixed;
  top: 0;
  width: 100%;
  background: #111;
  color: #f5f5f5;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  border-bottom: 1px solid #5c5c5c;

  nav {
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
const Logotype = styled.div`
  margin: 10px 0 0 4vw;
`;
const HeaderUpper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default Header;
