import { SessionProvider } from "next-auth/react";
import { api } from "@/utils/api";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import type { Session } from "next-auth";
import type { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

// Add generic type
type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout<P>;
};

const MyApp = ({
  Component,
  pageProps,
}: AppPropsWithLayout<{ session: Session }>) => {
  if (Component.getLayout) {
    return (
      <SessionProvider session={pageProps.session}>
        {Component.getLayout(
          <>
            <Component {...pageProps} />
            <div id="portal"></div>
          </>
        )}
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
        <div id="portal"></div>
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
