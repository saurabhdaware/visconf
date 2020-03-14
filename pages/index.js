import Nav from '../components/Nav';
import Meta from '../components/Meta';
import Footer from '../components/Footer';
import Link from 'next/link';

const Index = ({user, login, isLoggedIn}) => {
  const authServices = {user, login, isLoggedIn}
  return (
    <div>
      <Meta/>
      <Nav {...authServices}/>
      <div className="index-page">
        <div className="index-header">
          <div>
            <h1 className="index-title">VisConf</h1>
            <span>Generate animated version of your talk from transcript and slides!</span><br/>
            <Link href="/[username]/[slug]" as="/me/test"><a className="btn">I dont even know what VisConf is</a></Link>
            <Link href="create"><a className="btn">Create your VisTalk</a></Link>
          </div>
        </div>
        <main className="index-content-container">
          <h2>VisConf, Why?</h2>
          <div>
            A lot of times in small meetups, it is not possible for organizers to record talks. Using VisConf, you can generate an animated version of talk from transcript and slides. Thus giving speakers a platform to create and share their meetup talks. <br/><br/>You can create & customize your character and publish your talk  (we call it VisTalk!).<br/>
            <img className="responsive-image" src="https://res.cloudinary.com/visconf/image/upload/e_bgremoval/v1584111107/speakers_nhzksa.png" />
          </div>
          
          <br/><br/><h2>VisConf, How?</h2>
          <div>
            Writing your talk on VisConf is as easy as writing a blog! (+ you need to convert `.ppt` files to `.pdf`)

            <ul>
              <li>Convert your .ppt to .pdf</li>
              <li>Head to <Link href="create"><a>Create a VisTalk</a></Link> page, link your .pdf file, write your transcript and hit PUBLISH 🎉 <br/>(actually hit Preview first and check if it is correct then hit publish .__. )</li>
            </ul>
          </div>

          <br/><br/><h2>Sponsor us ♥️</h2>
          If you're an individual who wants to support VisConf directly, you can Buy Me a Coffee!
          <br/><a href="https://www.buymeacoffee.com/saurabhdaware" target="_blank" rel="noopener noreferer"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" width="200" style={{borderRadius: '8px'}} alt="Buy Me A Coffee" className="buy-me-a-coffee-button shadow"/></a>
          <br/><br/>
          If you're an organization, you can head to our <Link href="sponsor"><a>Sponsor</a></Link> page for more information.
        </main>
      </div> 


      <Footer/>
      <style jsx>{/* css */`
      .index-page{
        color: #222;
      }
      .btn{
        text-decoration: none;
        padding: 10px 20px;
        background-color: #222;
        color: #999;
        border-radius: 5px;
        margin: 10px;
        display: inline-block;
      }
      .index-header{
        width: 100%;
        background-color: #efe13d;
        text-align: center;
        padding: 100px 0px;
      }
      .index-title{
        display: block;
        font-size: 36pt;
        font-weight: bold;
        margin: 5px 0px;
      }
      
      .index-content-container{
        padding: 100px;
      }

      @media (max-width: 768px){
        .index-content-container{
          padding: 60px 30px;
        }
        .index-header{
          padding:100px 30px;
          box-sizing: border-box;
        }
        .responsive-image{
          width: 100%;
        }
      }
      `}</style>
    </div>
  )
}

export default Index;