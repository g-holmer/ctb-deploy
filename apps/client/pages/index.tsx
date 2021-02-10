import React from 'react';
import styled from 'styled-components';
import { Header } from '@ctb/header';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage>
      <h2>Resources &amp; Tools</h2>
      <Header />
    </StyledPage>
  );
}

export default Index;
