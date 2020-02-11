import '../styles/talk.css';

const Talk = () => {
  return (
    <div className="presentation-container">
      <div className="sponsor-holder">
        <div className="sponsor-title"><small>🌠</small> VisConf <small>🌠</small></div>
        <div className="sponsor-container">
          <a className="become-sponsor-button" target="_blank" rel="noopner" href="http://paypal.me/saurabhdaware99">Become a Sponsor&nbsp;<span className="material-icons">favorite_border</span></a>
        </div>
      </div>
      <div className="slides-display-container"><span className="default-nosignal-text"><b>NO SIGNAL</b> <br/>Attempting to Connect...</span></div>
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
      <div className="current-text">Hi there! My name is Saurabh and I am here to talk about something super cool</div>
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
    </div>
  )
}

export default Talk;