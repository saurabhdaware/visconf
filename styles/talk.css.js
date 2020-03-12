import css from 'styled-jsx/css';


export default css.global/* css */`
html, body{
  height: 100%;
  width: 100%;
  margin: 0px;
  overflow: hidden;
  font-family: 'Oswald', sans-serif;
}
#__next, .main-layout, .create-content, .editor-main{
  height: 100%;
}

.talk-page{
  height: 100%;
  background-color: #090B10 !important;
  padding: 40px;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .talk-page{
    padding: 20px;
    width: 100%;
    overflow: hidden;
  }
}

.presentation-container{
  background-color: #151e2c;
  height: 350px;
  box-shadow:3px 10px 16px #111f; 
}
.presentation-container > .slides-display-container{
  position: relative;
  display: inline-block;
  background-color:#00f;
  height: 90%;
  width: 600px;
  top: 10px;
  left: 50%;
  transform: translateX(calc(100px - 50%));
}
.stage-container{
  perspective: 1000px;
  width: 100%
}
.stage-platform{
  position: relative;
  height: 100px;
  transform: rotateX(60deg) translateX(-50%);
  width: calc(100% - 56px);
  top: 25px;
  left: 50%;
  /* background: linear-gradient(to bottom right,#3f5369 10%, #26384b 100%); */
  background: linear-gradient(to right,#aa200e, #581b1b);
}

.stage-front{
  height: 100px;
  width: 100%;
  /* background-color: #212e3d; */
  background-color: #581b1b;
}

.slide{
  display: none;
}
.slide.show{
  display: block;
}

.orientation-error{
  padding:130px 30px;
  box-sizing:border-box;
  display:none;
  position:fixed;
  font-size:17pt;
  z-index:100;
  top:0;left:0;
  height:100%;width:100%;
  background-color: #222;
  color: #ddd;
  font-weight: bold;
}

#rotate-screen-button{
  text-align: center;display:block;width: 100%;padding: 10px;
  box-shadow:3px 10px 16px #1119; 
}

@media (orientation: portrait){
  .stage-container{
    position: fixed;
    bottom: 60px;
    left: -100px;
    z-index: 201;
    transform: rotate(90deg);
  }
  .stage-front, .stage-platform{
    display: none;
  }
  .character-container .myhead{
    transform: rotate(-40deg) translateX(-2px);
    animation: headTilt 2s infinite ease-in;
  }

  .character-container .myhair{
    transform: rotate(-40deg) translateX(2px);
    animation: headTiltHair 1.9s infinite ease-in;
  }
  .orientation-error{
    display: block;
  }

  @keyframes headTilt {
    0% {transform: rotate(-40deg) translateX(-2px);}
    30% {transform: rotate(0deg) translateX(0px);}
    70% {transform: rotate(-40deg) translateX(-2px);}
    100% {transform: rotate(-40deg) translateX(-2px);}
  }

  @keyframes headTiltHair {
    0% {transform: rotate(-40deg) translateX(2px);}
    30% {transform: rotate(0deg) translateX(0px);}
    100% {transform: rotate(-40deg) translateX(2px);}
  }
}

.orientation-error  .material-icons{
  font-size: 25pt;
}

.create-talk-button{
  font-size: 14pt;
  position: relative; 
  bottom: 6px;
  padding:14px 10px;
  text-decoration: none;
  color: #fff;
}


.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}


.current-text{
  position: fixed;
  z-index: 5;
  top: unset;
  bottom: 130px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #0009;
  border: 1px solid #222;
  color: #ddd;
  display: inline-block;
  padding: 10px 30px;
  font-size: .9rem;
  box-sizing: border-box;
  border-radius: 7px;
  max-width: 80%;
}
.index-overlay{
  position: fixed;
  bottom:0; 
  left:0;
  background:linear-gradient(to top,#000f, #0000);
  height: 500px;
  width: 100%;
  z-index: 4;
  padding: 20px 50px;
  box-sizing: border-box;
}
.control{
  color: #fff;
  background-color: transparent;
  border:none;
  /* padding:10px; */
  cursor: pointer;
  outline: none;
}
.control > .material-icons{
  font-size: 30pt;
}

.presentation-controls{
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding: 50px 50px 30px 50px;
  width: 100%;
  box-sizing: border-box;
}
.progress-meter{
  background-color: #999;
  height:3px; 
  width:100%;
  border-radius: 10px;
  position: relative;
}
.presentation-video-bar{
  padding: 15px 0px 15px 0px;
  cursor: pointer;
}
.presentation-video-bar .progress{
  background: linear-gradient(to left, #ffff00, #f6eb51);
  height: 3px;
  display: inline-block;
  position: absolute;
}
.github-logo{
  width: 40px;
}

.github-corner svg{
  width: 70px;
  height: 70px;
}

.control.captions{
  outline: none;
  border-bottom: 2px solid #ff0;
  padding: 1px 0px;
  margin: 0px 6px;
}

/* PRESENTATION CONTAINER STYLES */
.presentation-container{
  position: relative;
}

.sponsor-holder{
  position: absolute; 
  top: 10px; 
  left: 10px; 
  color: #999; 
  width: 30%; 
  text-align: center;
}

.sponsor-title{
  font-weight: bold;
  font-size: 14pt;
  margin:10px 0px;
}
.become-sponsor-button{
  color: #777; text-decoration: none;
  font-size: 10pt;
}
.sponsor-container a{
  text-decoration: none;
  color: #999;
}
.sponsor-col {
  display: inline-block;
  padding: 0px 10px;
}
.sponsor-col img{
  width: 45px;
}
.sponsor-col.eotm img{
  width: 40px;
}
.sponsor-col span{
  font-size: 9pt;
}
.sponsor-col span{
  display: block;
}
.become-sponsor-button .material-icons{
  position:relative;top: 3px;font-size: 10pt;
}
.default-nosignal-text{
  color:#fff;margin:15px;position: absolute; bottom: 0;display:inline-block
}
.become-sponsor-container{
  padding: 0px 0px 10px 0px;
}
.float-right{
  float: right !important;
}
@media (max-width: 768px) {
  .github-logo{
    width: 30px;
  }
  .current-text{
    bottom: 70px;
    font-size: 9pt;
    width: max-content;
    max-width: 400px;
    padding: 10px 10px;
  }
  .sponsor-col img{
    width: 35px;
  }
  .sponsor-col.eotm img{
    width: 30px;
  }
  .sponsor-col span{
    font-size: 8pt;
  }
  .sponsor-title{
    margin: 1px;
  }
  .become-sponsor-container{
    padding: 0px 0px 3px 0px;
  }
  .presentation-container > .slides-display-container{
    width: 400px;
  }
  .presentation-container{
    height: 260px;
  }
  .control > .material-icons{
      font-size: 20pt;
  }
  .index-overlay{
      height: 140px;
  }
  .presentation-controls{
      padding: 30px 30px 10px 30px;
  }
  .create-talk-button{
      font-size: 10pt;
      padding: 10px 10px;
  }

  .github-corner svg{
      width: 50px;
      height: 50px;
  }
}`