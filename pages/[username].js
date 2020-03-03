import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import styles from '../styles/profile.css.js';
import Character from '../components/Character';


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

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-head display-flex">
        <div className="character-relative">
          <Character />
        </div>
        Saurabh Dawar
        {/* {talks.data[0]?.username} */}
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

// Profile.getInitialProps = async ctx => {
//   const response = await fetch(`${process.env.endpoint}/get-talks-of-user?username=${ctx.query.username}`);
//   try{
//     const data = await response.json();
//     return {talks: data}
//   }catch(err) {
//     return {talks: {data:[]}}
//   }
// }

export default Profile;
