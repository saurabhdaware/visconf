import Link from 'next/link';
import { sponsorData } from '../scripts/helpers';

function Footer() {
  return (
    <footer className="shadow">
      <div className="row">
        <div className="col">
          <Link href="/"><a>Home</a></Link>
          <Link href="create"><a>Create</a></Link>
          <a href="https://github.com/saurabhdaware/visconf/blob/master/LICENSE">License <i className="material-icons ext-link">call_made</i></a>
          <a href="https://github.com/saurabhdaware/visconf/blob/master/CONTRIBUTING.md">Contributing <i className="material-icons ext-link">call_made</i></a>
        </div>
        <div className="col">
          <a href="https://github.com/saurabhdaware/visconf">GitHub Repo <i className="material-icons ext-link">call_made</i></a>
          <a href="https://github.com/saurabhdaware/visconf#dependencies">Dependencies <i className="material-icons ext-link">call_made</i></a>
          <a href="mailto:visconfcc@gmail.com">Drop an email&nbsp;<i className="material-icons ext-link">mail</i></a>
          <a href="https://twitter.com/visconf">Tweet us @visconf<i className="material-icons ext-link">call_made</i></a>
        </div>
      </div>
      <div className="footer-sponsors-container">
        <div style={{fontSize: '15pt', color: '#ddd', marginBottom: '30px'}}>- Sponsors -</div>
        <div className="footer-sponsors">
          {
            sponsorData(100).map((sponsor, index) => (
              <div key={index}>
                <a href={sponsor.href} target="_blank" rel="noopener norefferer">
                  <img src={sponsor.image}/>
                  <span className="sponsor-name">{sponsor.name} <i className="material-icons ext-link">call_made</i></span>
                </a>
              </div>
            ))
          }
        </div>
        <Link href="sponsor"><a className="footer-button btn">Sponsor us 🌻</a></Link>
      </div>
      <div className="footer-copyright">
        <i className="material-icons icon-pos-fix">copyright</i> 
        &nbsp;{new Date().getFullYear()} <a href="https://github.com/saurabhdaware">saurabhdaware</a>
      </div>
      <style jsx>{/* css */`
      footer *{
        box-sizing: border-box;
      }
      .footer-button{
        display:inline-block;
        margin-top: 30px;
        padding: 10px 20px;
        background-color: #333;
        border-radius: 7px;
      }
      .row{
        display: flex;
        background-color: #181818;
      }
      .row > .col{
        flex:1;
        padding: 60px 60px;
      }
      .material-icons.ext-link{
        font-size: 10pt;
      }
      .col > a{
        display: block;
        text-decoration: none;
        font-size: 17pt;
        color: #999;
        transition: color .3s ease;
      }

      .col > a:hover{
        color: #fff;
        transition: color .5s ease;
      }


      .footer-sponsors-container{
        background-color: #111;
        text-align: center;
        padding: 40px 170px;
      }

      .footer-sponsors-container a{
        text-decoration: none;
        color: #999;
      }

      .footer-sponsors{
        display: flex;
      }
      .footer-sponsors > div{
        flex: 1;
      }

      .sponsor-name{
        display: block;
      }
      footer{
        background-color: #111;
      }

      .footer-copyright{
        background-color: #111;
        text-align: right;
        padding: 20px;
        color: #999;
      }
      .footer-copyright a{
        color: #999;
        text-decoration: none;
      }

      @media (max-width: 768px) {
        .row > .col{
          padding: 60px 20px;
        }

        .footer-sponsors-container{
          padding: 20px;
        }
      }
      `}</style>
    </footer>
  )
}

export default Footer;