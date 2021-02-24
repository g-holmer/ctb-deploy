import React from 'react';
import styled from 'styled-components';
import { Header } from '@ctb/header';
import Home from './homePage';
export function Index(props) {
  return (
    <>
      <Home />
    </>
  );
}

export default Index;

// export async function getStaticProps(context) {
//   const res = await fetch('/companiesMockData.json');
//   const data = await res.json();
//   return {
//     props: { companies: { data } }, // will be passed to the page component as props
//     revalidate: 60,
//   };
// }
