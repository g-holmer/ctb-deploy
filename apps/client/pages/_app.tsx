import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthContextProvider } from '@ctb/auth-context';
import { Header } from '@ctb/header';
function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to client!</title>
      </Head>
      <div className="app">
        <Header />
        <main>
          <AuthContextProvider>
            <Component {...pageProps} />
          </AuthContextProvider>
        </main>
      </div>
    </>
  );
}

export default CustomApp;
