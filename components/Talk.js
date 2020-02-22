import '../styles/talk.css';
import Link from 'next/link';
import slides from '../scripts/slides';
import { useEffect, useState } from 'react';

import Character from './Character';
import Sponsors from './Sponsors';

function setCharacterStyles(userData) {
  document.querySelectorAll(".character-container > span")
      .forEach(el => el.style.backgroundColor = userData.character.skinColor || '#ffe0bd');

  document.querySelector('.character-container > span.myhead').style.backgroundColor = userData.character.skinColor || "#ffe0bd";
  document.querySelector('.character-container > span.myhead').style.borderTop = `15px solid ${userData.character.hairColor}` || "15px solid #111";
  document.querySelector('.character-container > span.mybody').style.backgroundColor = userData.character.tshirtColor || '#09f';
  document.querySelectorAll('.character-container > span.hands')
      .forEach(el => el.style.borderTop = `20px solid ${userData.character.tshirtColor}` || '20px solid #035891');

  if(userData.character.hairStyle && userData.character.hairStyle === 'long') {
      document.querySelector('.character-container > span.myhair').style.display = 'inline';
      document.querySelector('.character-container > span.myhair').style.backgroundColor = userData.character.hairColor || '#111';
  }
}

function init(userData) {
  if(!userData) return;
  slides.setSlides(userData.slidePdfLink);
  document.querySelector('.mike-holder').innerHTML = userData.eventName;
  document.querySelector('.character-container').classList.remove('hide');
  setCharacterStyles(userData);
}

const Talk = ({fetchedData}) => {
  useEffect(() => init(fetchedData), [fetchedData]);

  return (
    <div className="presentation-container">
      <div className="sponsor-holder">
        <div className="sponsor-title"><small>🌠</small> VisConf <small>🌠</small></div>
        <div className="become-sponsor-container"><Link href="/sponsor"><a className="become-sponsor-button" target="_blank" rel="noopner">Become a Partner&nbsp;<span className="material-icons">favorite_border</span></a></Link></div>
        <Sponsors />
      </div>
      <div className="slides-display-container"><span className="default-nosignal-text"><small>Source: HDMI <br/>NO SIGNAL<br/>Attempting to Connect...</small> </span></div>
      <a href="https://github.com/saurabhdaware/visconf" target="_blank" className="github-corner" aria-label="View source on GitHub">
        <svg width="50" height="50" viewBox="0 0 250 250" style={{fill:'#aaa', color:'#151513', position: 'absolute', top: 0, border: 0, right: 0}} aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{transformOrigin: '130px 106px'}} className="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body"></path></svg>
      </a>

      {/* Everything around stage */}
      <div className="stage-container">
        <div className="stage-platform"></div>
        <div className="stage-front"></div>
        <Character />
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
          <a title="Create talk button" rel="noopener noreferer" href="editor" target="_blank" className="create-talk-button control float-right"> <b>+</b> &nbsp;Create your talk</a>
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