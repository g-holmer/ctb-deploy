import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthContextProvider } from '@ctb/auth-context';
import { Header } from '@ctb/header';
import { Footer } from '@ctb/footer';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '@ctb/theme-provider';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
      <Head>
        <title>Welcome to client!</title>
      </Head>

      <AuthContextProvider>
        <Header />
        <main style={{ top: '60.8px', position: 'relative' }}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </main>
        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default CustomApp;
