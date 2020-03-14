import Nav from '../components/Nav';
import Meta from '../components/Meta';
import Footer from '../components/Footer';

const Sponsor = ({user, login, isLoggedIn}) => {
  const authServices = {user, login, isLoggedIn}
  return (
    <div>
      <Meta/>
      <Nav {...authServices}/>
      <div className="sponsor-page">
        <h1>Individual Sponsors</h1>
        If you're an individual who wants to support VisConf directly, you can Buy Me a Coffee!
        <br/><br/><a href="https://www.buymeacoffee.com/saurabhdaware" target="_blank" rel="noopener noreferer"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" className="buy-me-a-coffee-button shadow"/></a>
        <br/><br/><br/>
        <h1>Sponsorship Plans for Organizations</h1>
        <h2>Gold Sponsors</h2>
        <div className="sponsor-info">
          <img src="https://res.cloudinary.com/visconf/image/upload/v1584186805/sponsors/sponsor-1_neeqlg.png"/>
          <ul>
            <li>Name and Logo in Talk page</li>
            <li>Name and Logo in Footer</li>
          </ul>
        </div>
        <h2>Silver Sponsors</h2>
        <div className="sponsor-info">
          <img src="https://res.cloudinary.com/visconf/image/upload/v1584186603/sponsors/sponsor-2_oos6iq.png"/>
          <ul>
            <li>Name and Logo in Footer</li>
          </ul>
        </div>
        <div style={{fontSize: '16pt', marginTop: '40px'}}>
          You can email us at 
          &nbsp;<a style={{textDecoration: 'none', color: '#09f'}} href="mailto:visconfcc@gmail.com">visconfcc@gmail.com</a> for sponsorships!
        </div>
      </div> 


      <Footer/>
      <style jsx>{/* css */`
      .sponsor-page{
        padding: 100px;
        color: #222;
        font-size: 14pt;
      }
      .buy-me-a-coffee-button{
        height: 51px;
        width: 230px;
        border-radius: 8px;
      }
      .sponsor-info > img{
        width: 500px;
      }

      @media (max-width: 768px){
        .sponsor-page{
          padding: 50px 10px;
        }
        .sponsor-info > img{
          width: 100%;
        }
      }
      `}</style>
    </div>
  )
}

export default Sponsor;