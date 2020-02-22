import './Character.css';
import { Fragment } from 'react';

const Character = () => {
  return (
    <Fragment>
      <div className="character-container hide">
        <span className="myhead"></span>
        <span className="myhair"></span>
        <span className="mybody"></span>
        <span className="hands mylhand"></span>
        <span className="hands myrhand"></span>
        <span className="legs mylleg"></span>
        <span className="legs myrleg"></span>
      </div>
      <div className="laptop">
        🥑
      </div>
      <div className="mic one"></div>
      <div className="mic two"></div>
      <div className="mike-holder">VisConf</div>
    </Fragment>
  )
}

export default Character;