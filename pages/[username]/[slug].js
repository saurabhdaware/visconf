import Head from 'next/head';
import { Fragment } from 'react';

const Talk = ({queryParams}) => {
  return (
    <Fragment>
      <Head>
        <title>{queryParams.slug} by {queryParams.username}</title>
      </Head>
      <div>
        <p>Hello Next.js</p>
      </div>
    </Fragment>
  );
}

Talk.getInitialProps = async ({ req, res, match, history, location, ...ctx })  => {
  return {
    queryParams: ctx.query
  }
}

export default Talk;