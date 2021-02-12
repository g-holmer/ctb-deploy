import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface HeaderProps {}

const StyledHeader = styled.header`
  z-index: 100;
  position: fixed;
  width: 100%;
  background: #111;
  color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #5c5c5c;

  div {
    margin-left: 4vw;
    margin: 10px;
  }
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

export function Header(props: HeaderProps) {
  return (
    <StyledHeader>
      <div>
        <p>Logotype</p>
      </div>
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
    </StyledHeader>
  );
}

export default Header;
