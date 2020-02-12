import '../styles/talk.css';
import Link from 'next/link';

const Talk = () => {
  return (
    <div className="presentation-container">
      <div className="sponsor-holder">
        <div className="sponsor-title"><small>🌠</small> VisConf <small>🌠</small></div>
        <div className="become-sponsor-container"><Link href="/sponsor"><a className="become-sponsor-button" target="_blank" rel="noopner">Become a Sponsor&nbsp;<span className="material-icons">favorite_border</span></a></Link></div>
        <div className="sponsor-container">
          <div className="sponsor-col">
            <a href="https://pocketbook.cc" target="_blank" rel="noopener norefferer">
              <img src="https://pocketbook.cc/logo-192.png"/>
              <span>PocketBook.cc</span>
            </a>
          </div>
          <div className="sponsor-col eotm">
            <a href="https://eotm.ml" target="_blank" rel="noopener norefferer">
              <img src="https://res.cloudinary.com/saurabhdaware/image/upload/c_scale,h_50/v1541420665/brands/logo.png"/>
              <span>Edge of The Matrix</span>
            </a>
          </div>
        </div>
      </div>
      <div className="slides-display-container"><span className="default-nosignal-text"><small>Source: HDMI <br/>NO SIGNAL<br/>Attempting to Connect...</small> </span></div>
      
      {/* Everything around stage */}
      <div className="stage-container">
        <div className="character-container">
            <span className="myhead"></span>
            <span className="myhair"></span>
            <span className="mybody"></span>
            <span className="hands mylhand"></span>
            <span className="hands myrhand"></span>
            <span className="legs mylleg"></span>
            <span className="legs myrleg"></span>
        </div>
        <div className="stage-platform"></div>
        <div className="stage-front"></div>
        <div className="laptop">
          🥑
        </div>
        <div className="mic one"></div>
        <div className="mic two"></div>
        <div className="mike-holder">VisConf</div>
      </div>


      <div className="current-text">Hi! </div>
      
      {/* Controls */}
      <div className="index-overlay">
        <div className="presentation-controls">
          <button title="skip previous" className="control skip-previous"><i className="material-icons">skip_previous</i></button>
          <button className="control start" title="start presentation"><i className="material-icons">play_arrow</i></button>
          <button className="control pause" title="pause presentation"><i className="material-icons">pause</i></button>
          <button title="skip next" className="control skip-next"><i className="material-icons">skip_next</i></button>
          <span className="screen-size float-right" >
            <button title="turn to fullscreen" className="control fullscreen"><i className="material-icons">fullscreen</i></button>
            <button title="fullscreen exit" className="control fullscreen-exit"><i className="material-icons">fullscreen_exit</i></button>
          </span>

          <button title="toggle captions" className="control captions float-right"><i className="material-icons">closed_caption</i></button>
          <span className="volume playing float-right" >
            <button title="mute volume" className="control mute"><i className="material-icons">volume_up</i></button>
            <button title="turn on volume" className="control volumeon"><i className="material-icons">volume_off</i></button>
          </span>
          <a title="Create talk button" className="create-talk-button control float-right" href="https://visconf.netlify.com/editor"> <b>+</b> &nbsp;Create your talk</a>
          <div className="presentation-video-bar">
            <div className="progress-meter">
              <div className="progress"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Positioned Content */}
      <div className="orientation-error">
        VisConf is best viewed in landscape! <br/> Please click the button below or rotate your screen to view the talk 🌻 <br/>
        <br/><button id="rotate-screen-button"><i className="material-icons">screen_rotation</i> <span style={{position: 'relative', top:'-9px', left: '6px', fontSize: '15pt', fontWeight: 'bold'}}>Rotate</span></button>
      </div>
    </div>
  )
}

export default Talk;