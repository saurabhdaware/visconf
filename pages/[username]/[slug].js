import { Fragment } from 'react';
import Meta from '../../components/Meta';
import Talk from '../../components/Talk';
import fetch from 'isomorphic-unfetch';
import {defaultUser} from '../../scripts/helpers';
import styles from '../../styles/talk.css.js';

const Main = ({metaInfo, fetchedData}) => {
  return (
    <Fragment>
      <Meta metaInfo={metaInfo} />
      <Talk fetchedData={fetchedData}/>
      <style jsx global>{styles}</style>
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
    const response = await fetch(`${process.env.endpoint}/get-talk?username=${ctx.query.username}&slug=${ctx.query.slug}`);
    if(!response) {
      return errResponse;
    }

    data = await response.json();
    if(!data.success) {
      return errResponse;
    }
  }catch(err) {
    console.log(err.message);
    return errResponse;
  }


  return {
    metaInfo: {
      title: `${data.message.talkTitle} @${data.message.eventName} - by ${ctx.query.username} | VisConf`,
      ogImage: `https://res.cloudinary.com/saurabhdaware/image/upload/c_fit,e_colorize:60,l_text:arial_30_bold:${data.message.talkTitle},r_0,w_450,y_-80/g_south_east,c_fit,e_colorize:60,l_text:arial_20:${ctx.query.username},r_0,w_450,y_100,x_80/g_north_west,c_fit,e_colorize:60,l_text:arial_17_bold:${data.message.eventName},r_0,w_100,y_205,x_70/v1581939374/npm/talksog.png`,
      url: 'https://visconf.cc'+ctx.asPath
    },
    fetchedData: data.message
  }
}

export default Main;