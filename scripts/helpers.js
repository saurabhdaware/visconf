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

function setCharacterStyles(characterStyles) {
  document.querySelectorAll(".character-container > span")
    .forEach(el => el.style.backgroundColor = characterStyles.skinColor || '#ffe0bd');

  document.querySelector('.character-container > span.myhead').style.backgroundColor = characterStyles.skinColor || "#ffe0bd";
  document.querySelector('.character-container > span.myhead').style.borderTop = `15px solid ${characterStyles.hairColor}` || "15px solid #111";
  document.querySelector('.character-container > span.mybody').style.backgroundColor = characterStyles.tshirtColor || '#09f';
  document.querySelectorAll('.character-container > span.hands')
    .forEach(el => el.style.borderTop = `20px solid ${characterStyles.tshirtColor}` || '20px solid #035891');

  if(characterStyles.hairStyle && characterStyles.hairStyle === 'long') {
    document.querySelector('.character-container > span.myhair').style.display = 'inline';
    document.querySelector('.character-container > span.myhair').style.backgroundColor = characterStyles.hairColor || '#111';
  } else {
    document.querySelector('.character-container > span.myhair').style.display = 'none';
    document.querySelector('.character-container > span.myhair').style.backgroundColor = characterStyles.hairColor || '#111';
  }
}


function setLocalStorageValue(newValues, key='default-form') {
  const currentFormData = JSON.parse(window.localStorage.getItem(key));
  window.localStorage.setItem(key, JSON.stringify({...currentFormData, ...newValues}))
}

function getLocalStorageData() {
  return JSON.parse((window.localStorage.getItem("default-form") || "{}"));
}

const defaultTranscriptText = `
Hi there!
| John Doe here!
| I am here to show you guys random pictures!!!

|| This is slide 2
| Here's a random lorem ipsum text
| lots of lorem ipsum

|| Here's baby yoda with a tea
| Drink tea
| Also drink water
| Water you doing?

|| umm i dont know why morty's here..

|| Doggo!!!
| Let's wait here for 10 seconds and appreciate doggo hair spaghetti $wait10s

|| Here's phineas looking at you 
| are you a platypus? 
| Perry's a platypus
| but hey, where's perry?

|| a telly tubby! 
| or a kitty?? 
| or a telly tubby
| noo its a kitty
| could be a telly tubby tho
| anyway

|| Thenks
| Bye!
`

const defaultUser = {
  "username": "me",
  "talkTitle": "test",
  "slug": "test",
  "transcriptText": defaultTranscriptText,
  "slidePdfLink": "https://raw.githubusercontent.com/saurabhdaware/visconf-example/master/default-slides.pdf",
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
  setLocalStorageValue,
  getLocalStorageData,
  defaultUser,
  defaultTranscriptText
}