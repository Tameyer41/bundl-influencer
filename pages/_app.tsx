import React from "react";
import type { ExtendedAppProps } from "@lib/types";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import Layout from "components/layout/Layout";
import Head from "next/head";

import "@lib/styles/index.css";
import WithAuth from "@lib/auth/WithAuth";
import { SWRConfig } from "swr";

export const queryClient = new QueryClient();

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: ExtendedAppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" sizes="196x196" href="favicon.png" />
      </Head>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <QueryClientProvider client={queryClient}>
          {Component.auth ? (
            <WithAuth options={Component.auth}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </WithAuth>
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
