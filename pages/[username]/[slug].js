import { Fragment } from 'react';
import Meta from '../../components/Meta';
import Talk from '../../components/Talk';
import fetch from 'isomorphic-unfetch';
import {defaultUser} from '../../scripts/helpers';

const Main = ({metaInfo, fetchedData}) => {
  return (
    <Fragment>
      <Meta metaInfo={metaInfo} />
      <Talk fetchedData={fetchedData}/>
    </Fragment>
  );
}

Main.getInitialProps = async ctx  => {
  const errResponse = {
    metaInfo: {
      title: `${ctx.query.slug.replace(/-/g, ' ')} by ${ctx.query.username} | VisConf`
    },
    fetchedData: defaultUser
  }
  
  let data;
  try{
    const response = await fetch(`${process.env.ENDPOINT}/get-talk?username=${ctx.query.username}&slug=${ctx.query.slug}`);
    if(!response) {
      return errResponse;
    }

    data = await response.json();
    if(!data.success) {
      return errResponse;
    }
  }catch(err) {
    console.log(err);
    return errResponse;
  }

  if(!data.message) {
    console.log("No data.message");
    console.log(data);
    return errResponse
  }

  return {
    metaInfo: {
      title: `${data.message.talkTitle} @${data.message.eventName} - by ${ctx.query.username} | VisConf`,
      ogImage: `https://res.cloudinary.com/visconf/image/upload/g_north_west,c_fit,e_colorize:60,l_text:arial_30_bold:${data.message.talkTitle},r_0,w_430,y_40,x_190/g_south_east,c_fit,e_colorize:60,l_text:arial_20:${ctx.query.username},r_0,w_500,y_100,x_50/v1584124133/og/og-talk_aprfkp.png`,
      url: 'https://visconf.cc'+ctx.asPath
    },
    fetchedData: data.message
  }
}

export default Main;