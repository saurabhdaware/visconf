/* global gapi */

import { Fragment } from "react";
import Link from 'next/link';
import { LoginButton } from "./AuthButtons";

function Nav({login, user, isLoggedIn}) {
  return (
    <Fragment>
      <nav>
        <Link href="/"><a className="brand-title">VisConf</a></Link>
        <div className="right-items">
          <Link href="create"><a className="create-button-item">+ &nbsp;Create</a></Link>
          {
            isLoggedIn
            ? <Link 
                href="[username]" 
                as={user.username}
              >
                <a><img className="profile-image" src={user.imageUrl}/> <span style={{marginLeft: '40px'}}>{user.name}</span></a>
              </Link>
            : <LoginButton login={login} />
          }

          {/* <Link href="[username]" as="saurabhdaware"><a><i className="material-icons icon-pos-fix">face</i> {user.name}</a></Link> */}
        </div>
        <style jsx global>{/*css*/`
        nav a{
          text-decoration: none;
          padding: 20px 23px;
          display: inline-block;
          color: #ccc;
          font-size: 14pt;
          border-bottom: 3px solid transparent;
          cursor: pointer;
        }
        nav .profile-image{
          position: absolute;
          border-radius: 100%;
          height: 30px;
        }
        .icon-pos-fix{
          position: relative;
          top: 3px;
        }

        nav > .right-items > a:hover{
          background-color: #333;
          border-bottom: 3px solid #ff0;
          transition: all .3s ease;
        }

        nav a.brand-title{
          padding: 20px 35px;
          font-weight: bold;
        }


        nav{
          position: relative;
          top:0;
          left:0;
          width: 100%;
          display: block;
          padding: 0px 0px;
          box-sizing: border-box;
          background-color: #282828;
          color: #ccc;
        }
        nav .right-items{
          float: right;
        }

        @media (max-width: 768px) {
          .right-items .create-button-item{
            display: none;
          }
        }
        `}</style>
      </nav>
      <div className="placeholder"></div>
    </Fragment>
  )
}

export default Nav;