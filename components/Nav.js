import { Fragment } from "react";
import Link from 'next/link';

function Nav() {
  return (
    <Fragment>
      <nav>
        <Link href="/"><a className="brand-title">VisConf</a></Link>
        <div className="right-items">
          <Link href="create"><a>Create</a></Link>
          <Link href="[username]" as="saurabhdaware"><a>saurabhdaware</a></Link>
        </div>
        <style jsx>{/*css*/`
        a{
          text-decoration: none;
          padding: 20px 15px;
          display: inline-block;
          color: #ccc;
          font-size: 14pt;
        }

        a.brand-title{
          padding: 20px 15px;
        }


        nav{
          position: relative;
          top:0;
          left:0;
          width: 100%;
          display: block;
          padding: 0px 30px;
          box-sizing: border-box;
          background-color: #282828;
          color: #ccc;
        }
        .right-items{
          float: right;
        }
        `}</style>
      </nav>
      <div className="placeholder"></div>
    </Fragment>
  )
}

export default Nav;