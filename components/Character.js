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
      <style jsx>{`
      .character-container.hide{
        top: -50px !important;
        transition: top .5s ease;
      }

      .character-container{
        position: fixed;
        top: -113px;
        left: 50px;
        transition: top .5s ease;
      }
      
      .character-container > span{
        display:inline-block;
        position:absolute;
        box-sizing: border-box;
      }
      
      .character-container > span:not(.mybody){
        box-shadow:         3px 10px 16px #1119; 
        background-color:#ffe0bd;
      }
      .character-container > span.myhead{
        height:35px;
        width:27px;
        border-radius:100%;
        border:15px solid #111;
        border-right:none;
        border-left:none;
        border-bottom: none;
        background-color:#ffe0bd;
        box-sizing: border-box;
      }
      
      .character-container > span.myhair{
        position: absolute;
        background-color: #111;
        width: 35px;
        left: -4px;
        top: 0;
        border-radius: 20px 20px 0px 0px;
        z-index: -1;
        display: none;
        height: 50px;
      }
      
      .character-container > span.mybody{
        top:37px;
        left:-1px;
        height:35px;
        width:29px;
        background-color: #09f;
        z-index:1;
        border-radius:5px;
      }
      
      .character-container > span.hands{
        height:38px;
        width:7px;
        border-radius:100%;
        border-top:20px solid #035891;
        left:-5px;
        top:38px;
        transform-origin: top center;
        transform: rotate(10deg);
      }
      
      .character-container > span.mylhand{
        transform:rotate(-10deg);
        left:25px;
      }
      
      .character-container > span.legs{
        height:30px;
        width:10px;
        left:3px;
        top:65px;
        transform-origin: top center;
        transform: rotate(10deg);
        border:3px solid #aaa;
        border-radius:0px 0px 5px 5px;
      }
      
      .character-container > span.myrleg{
        transform:rotate(-10deg);
        left:15px;
      }

      .mike-holder{
        position: absolute;
        height: 150px;
        width: 100px;
        /* background: linear-gradient(#0e50df, #082d7e); */
        background: linear-gradient(#fcee33, #c2b145);
        color: #222;
        top: -50px;
        left: 30px;
        font-weight: bold;
        padding: 20px 10px;
        text-align: center;
        box-sizing: border-box;
      }

      .mic{
        width: 3px;
        height: 30px;
        background-color: #222;
        position: absolute;
        top: -75px;
        left: 64px;
        font-size: 9pt;
        text-align: center;
        box-sizing: border-box;
        box-shadow:         3px 10px 5px #111; 
        border-radius: 2px;
      }
      .mic.one{
        top: -71px;
        left: 50px;
        transform: rotate(20deg);
      }
      .mic.two{
        left: 77px;
        transform: rotate(-20deg);
      }
      
      `}</style>
    </Fragment>
  )
}

export default Character;