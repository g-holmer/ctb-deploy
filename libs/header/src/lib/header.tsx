import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { SearchBoxComponent } from '@ctb/search-box-component';
/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const router = useRouter();
  const isActive = (string) => {
    let isEqual: string = '';
    if (router.pathname === string) {
      isEqual = 'true';
    } else {
      isEqual = 'false';
    }
    return isEqual;
  };

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
                <Anchor active={isActive('/')}>Home</Anchor>
              </Link>
            </li>
            <li>
              <Link href="/connectCafe">
                <Anchor active={isActive('/connectCafe')}>Connect Café</Anchor>
              </Link>
            </li>
            <li>
              <Link href="/signIn">
                <Anchor active={isActive('/signIn')}>Login</Anchor>
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
  box-shadow: 0px 12px 35px rgba(0, 0, 0, 0.6);
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
      }
    }
  }
`;
const Anchor = styled.a`
  color: ${(props) => (props.active === 'true' ? '#A3894C' : '#f5f5f5')};
  text-decoration: none;
  cursor: pointer;
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
