import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthContextProvider } from '@ctb/auth-context';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to client!</title>
      </Head>
      <div className="app">
        <header className="flex"></header>
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
