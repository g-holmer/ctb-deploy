import React from 'react';
import styled from 'styled-components';
import { Header } from '@ctb/header';
import { UserContextProvider } from '../contexts/UserContextProvider';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  return (
    <StyledPage>
      <h2>Resources &amp; Tools</h2>
      <UserContextProvider>
        <Header />
      </UserContextProvider>
    </StyledPage>
  );
}

export default Index;
