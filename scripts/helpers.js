function isMobile() { 
  if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  ){
    return true;
  } else {
    return false;
  }
}

function isURL(str) {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}


/* View in fullscreen */
function openFullscreen(setIsFullScreen) {
  const elem = document.documentElement;

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }

  setIsFullScreen(true);
  screen.orientation.lock("landscape-primary")
    .catch(console.warn);
}

/* Close fullscreen */
function closeFullscreen(setIsFullScreen) {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }

  setIsFullScreen(false);
}

async function wait(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  })
}

async function getTranscipt(transcriptData, isText = false) {
  let transcript;
  if(!isText){
    let data = await (await fetch(transcriptData)).text();
    transcript = data;
  }else{
    transcript = transcriptData;
  }

  return transcript;
}


function toggleCaptions() {
  const captionHolder = document.querySelector('.current-text');
  const captionControl = document.querySelector('.control.captions');
  if(captionHolder.style.display === 'none') {
    // show captions
    captionHolder.style.display = 'block';
    captionControl.style.borderBottom = '2px solid #ff0';
  }else {
    // hide captions
    captionHolder.style.display = 'none';
    captionControl.style.borderBottom = 'none';
  }
}

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


const defaultUser = {
  "username": "me",
  "talkTitle": "test",
  "slug": "test",
  "transcriptLink": "../example/Transcript.md",
  "slidePdfLink": "../example/slides.pdf",
  "eventName": "VisConf <br/>Test",
  "character": {
    "hairStyle": "long",
    "hairColor": "#1f0900",
    "skinColor": "#724e25",
    "tshirtColor": "#67abd3"
  },
  "voice": {
    "name": "UK English Female",
    "rate": .3,
    "volume": 1,
    "pitch": 2
  }
}

export { 
  wait,
  isMobile, 
  isURL, 
  openFullscreen, 
  closeFullscreen, 
  getTranscipt,
  toggleCaptions,
  setCharacterStyles,
  defaultUser 
}