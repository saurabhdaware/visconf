import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import styles from '../styles/profile.css.js';
import Character from '../components/Character';
import { Fragment, useEffect } from 'react';
import Meta from '../components/Meta.js';
import Nav from '../components/Nav.js';

import {setCharacterStyles} from '../scripts/helpers';
import TalkTile from '../components/TalkTile.js';

{/* <div>
  {
    talks.data.map(val => 
      <div key={val.slug}>
        "{val.talkTitle}" @{val.eventName}
        <div>
          <Link href="/[username]/[slug]" as="/saurabhdaware/visconf-intro">
            <a>{val.slug}</a>
          </Link>
        </div>
      </div>
    )
  }
</div> */}

const Profile = ({metaInfo, talks, login, logout, user, isLoggedIn}) => {
  const authObject = {login, logout, user, isLoggedIn};

  useEffect(() => {
    setCharacterStyles(talks[talks.length - 1]);
    setTimeout(() => {
      document.querySelector('.character-container').classList.remove('hide');
    }, 600);
  }, []);

  return (
    <Fragment>
    <Meta metaInfo={metaInfo} />
    <Nav {...authObject}/>
    <div className="profile-container">
      <div className="profile-head display-flex">
        <div className="character-relative">
          <Character/>
        </div>
        <span className="profile-username">saurabhdaware</span>
      </div>
    </div>
    <div className="profile-talks-container">
    {
      talks?.map((val, index) => <TalkTile talkData={val} key={index} />)
    }
    </div>
    <style jsx>{styles}</style>
    </Fragment>
  )
}

Profile.getInitialProps = async ctx => {
  // const response = await fetch(`${process.env.ENDPOINT}/get-talks-of-user?username=${ctx.query.username}`);
  let resData = [];
  const metaInfo = {
    title: `Talks from ${ctx.query.username}`,
    url: 'https://visconf.cc'+ctx.asPath
  }

  // try{
  //   resData = await response.json();
  // }catch(err) {
  //   resData = []
  // }

  resData = {
    "success":true,
    "data":[
      {
        "username":"saurabhdaware",
        "talkTitle":"VisConf Intro",
        "slug":"visconf-intro",
        "eventName":"VisConf",
        "uid":"525097a7-6149-42d9-b17e-afcfc0e48e1c",
        "character":{
          "hairStyle":"short",
          "hairColor":"#111111",
          "skinColor":"#e2c4a1",
          "tshirtColor":"#0099ff"
        }
      },
      {
        "username":"saurabhdaware",
        "talkTitle":"Web Performance Hacks at Mumbai JS",
        "slug":"web-performance-hacks-at-mumbai-js",
        "eventName":"Mumbai Javascript",
        "uid":"525097a7-6149-42d9-b17e-afcfc0e48e1c",
        "character":{
          "hairStyle":"short",
          "hairColor":"#111111",
          "skinColor":"#c4a27a",
          "tshirtColor":"#f8f8f8"
        }
      }
    ]
  }

  return {
    metaInfo,
    talks: resData.data
  }
}

export default Profile;
