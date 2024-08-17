import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import Navbar from "../components/Navbar";

const App = ({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) => (
  <SessionProvider session={pageProps.session}>
    <Navbar />
    <Component {...pageProps} />
  </SessionProvider>
);

export default App;
