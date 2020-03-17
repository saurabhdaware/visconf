import Layout from "../components/Layout";
import { Fragment } from "react";
import Head from "next/head";
import Router from 'next/router'
import withGA from "next-ga";

import { useAuth } from '../scripts/hooks';

import NProgress from 'nprogress'

Router.events.on('routeChangeStart', url => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())


function MyApp({ Component, pageProps }) {
  const authServices = useAuth();

  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/nprogress@0.2.0/nprogress.css" />
      </Head>
      <Layout>
        <Component {...pageProps} {...authServices} />
      </Layout>
    </Fragment>
  )
}

export default withGA("UA-160907444-1", Router)(MyApp);