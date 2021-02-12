import React from 'react';
import { Box } from '@material-ui/core';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface HeaderProps {}

const StyledHeader = styled(Box)`
  color: pink;
`;

export function Header(props: HeaderProps) {
  return (
    <StyledHeader>
      <h1>Welcome to header!</h1>
    </StyledHeader>
  );
}

export default Header;
