import { Fragment, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import styles from '../styles/profile.css.js';
import Character from '../components/Character';
import Meta from '../components/Meta.js';
import Nav from '../components/Nav.js';
import Footer from '../components/Footer.js';
import TalkTile from '../components/TalkTile.js';
import { LogoutButton } from '../components/AuthButtons';

import { useRouter } from 'next/router'
import Link from 'next/link';


const Profile = ({metaInfo, talks, login, logout, user, isLoggedIn}) => {
  const authObject = {login, logout, user, isLoggedIn};

  const router = useRouter();
  const { username: usernameParam } = router.query;

  useEffect(() => {
    setTimeout(() => {
      document.querySelector('.character-container')?.classList.remove('hide');
    }, 600);
  }, []);

  return (
    <Fragment>
    <Meta metaInfo={metaInfo} />
    <Nav {...authObject}/>
    <div className="profile-container">
      <div className="profile-head display-flex">
        <div className="character-relative">
          {talks?.length > 0 ? <Character characterStyles={talks[0].character}/> : null}
        </div>
        <div className="profile-username">
          <h1>{usernameParam}</h1>
          {
            isLoggedIn && user.username === usernameParam
            ? <LogoutButton logout={logout} renderElement={renderProps => <button {...renderProps} className="logout-button">Logout</button>} /> 
            : null 
          }
        </div>
      </div>
    </div>
    <div className="profile-talks-container">
    {
      talks?.map((val, index) => <TalkTile talkData={val} key={index} />)
    }
    </div>
    <Link href="create"><a className="create-button">+</a></Link>
    <Footer></Footer>
    <style jsx>{styles}</style>
    </Fragment>
  )
}

Profile.getInitialProps = async ctx => {
  let resData = [];
  const metaInfo = {
    title: `Talks from ${ctx.query.username}`,
    url: 'https://visconf.cc'+ctx.asPath,
    ogImage: `https://res.cloudinary.com/visconf/image/upload/c_fit,e_colorize:50,l_text:arial_45_bold:${ctx.query.username},r_0,w_450,y_-70/v1584122962/og/og-profile_kzamh8.png`
  }

  try{
    const response = await fetch(`${process.env.ENDPOINT}/get-talks-of-user?username=${ctx.query.username}`);
    resData = await response.json();
  }catch(err) {
    console.log(err);
    resData = {data:[]}
  }

  return {
    metaInfo,
    talks: resData.data
  }
}

export default Profile;
