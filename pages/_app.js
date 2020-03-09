import Layout from "../components/Layout";
import { Fragment } from "react";
import Head from "next/head";

import { useAuth } from '../scripts/hooks';


function MyApp({ Component, pageProps }) {
  const authServices = useAuth();

  return (
    <Fragment>
      <Head>
      </Head>
      <Layout>
        <Component {...pageProps} {...authServices} />
      </Layout>
    </Fragment>
  )
}

export default MyApp;