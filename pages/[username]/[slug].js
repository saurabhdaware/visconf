import { Fragment } from 'react';
import Meta from '../../components/Meta';
import Talk from '../../components/Talk';

const Main = ({metaInfo}) => {
  return (
    <Fragment>
      <Meta metaInfo={metaInfo} />
      <Talk />
    </Fragment>
  );
}

Main.getInitialProps = async ctx  => {
  return {
    metaInfo: {
      title: `${ctx.query.slug.replace(/-/g, ' ')} by ${ctx.query.username} | VisConf`
    }
  }
}

export default Main;