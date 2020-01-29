import './create.html';
import '../../public/styles/main.css';
import './create.css';


const env = require('../../configs/env');
import reader from '../reader';

const loginButton = document.querySelector('.netlify-login-button');
const logoutButton = document.querySelector('.netlify-logout-button');
const userNameEl = document.querySelector('.login-username');
const emailTextEl = document.querySelector('.login-email');

// inputs
const talkTitleIp = document.querySelector('#talk-title');
const transcriptLinkIp = document.querySelector('#transcript-url');
const slidesPdfIp = document.querySelector('#slides-pdf');
const eventNameIp = document.querySelector('#event-name');
const hairStyleIp = document.querySelector('#hairstyle');
const hairColorIp = document.querySelector('#hair-color');
const skinColorIp = document.querySelector('#skin-color');
const tshirtColorIp = document.querySelector('#tshirt-color');
const voiceSelectIp = document.querySelector('select#voice-select');

let currentUser;
let currentUsername;


function getAuthHeader() {
    const header = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + currentUser.token.access_token
    }

    return header;
}

function getUsername(u) {
    if(!u) return;
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: getAuthHeader(),
        body: JSON.stringify({}) // body data type must match "Content-Type" header
    }


    fetch(`${env.functionsEndpoint}/get-username`, options)
        .then(res => res.json())
        .then(res => {
            currentUsername = res.username;
            userNameEl.innerHTML = `Username: <span style="opacity:.5">${res.username}</span>`;
        });
}

function loginHandler(user) {
    currentUser = user;
    loginButton.style.display = 'none';
    logoutButton.style.display = 'inline-block';
    emailTextEl.innerHTML = `Logged in as ${user.email}`;
    netlifyIdentity.close();
    getUsername(user);

}

function logoutHandler() {
    loginButton.style.display = 'inline-block';
    logoutButton.style.display = 'none';
    emailTextEl.innerHTML = '';
}


// Character styling

function setSkinColor(color) {
    document.querySelectorAll(".character-container > span.skin")
        .forEach(el => el.style.backgroundColor = color || '#ffe0bd');

    document.querySelector('.character-container > span.myhead').style.backgroundColor = color || "#ffe0bd";

}

function setHairColor(color) {
    document.querySelector('.character-container > span.myhead').style.borderTop = `15px solid ${color}` || "15px solid #111";
    document.querySelector('.character-container > span.myhair').style.backgroundColor = color || '#111';
}

function setTshirtColor(color) {
    document.querySelector('.character-container > span.mybody').style.backgroundColor = color || '#09f';
    document.querySelectorAll('.character-container > span.hands')
        .forEach(el => el.style.borderTop = `20px solid ${color}` || '20px solid #035891');
}

function setHairStyle(hairStyle) {
    if(hairStyle === 'long') {
        document.querySelector('.character-container > span.myhair').style.display = 'inline';
    }else {
        document.querySelector('.character-container > span.myhair').style.display = 'none';
    }
}

eventNameIp.value = document.querySelector('.mike-holder').innerHTML;
eventNameIp.addEventListener('keyup', (e) => {
    document.querySelector('.mike-holder').innerHTML = e.target.value;
})

hairStyleIp.addEventListener('change', (e) => {
    setHairStyle(e.target.value);
})

setHairColor('#222222');
hairColorIp.value = '#222222';
hairColorIp.addEventListener('input', e => {
    setHairColor(hairColorIp.value);
})
hairColorIp.addEventListener('change', e => {
    setHairColor(hairColorIp.value);
})

setSkinColor('#e2c4a1');
skinColorIp.value = '#e2c4a1';
skinColorIp.addEventListener('input', e => {
    setSkinColor(skinColorIp.value);
})
skinColorIp.addEventListener('change', e => {
    setSkinColor(skinColorIp.value);
})

setTshirtColor('#0099ff');
tshirtColorIp.value = '#0099ff';
tshirtColorIp.addEventListener('input', e => {
    setTshirtColor(tshirtColorIp.value);
})
tshirtColorIp.addEventListener('change', e => {
    setTshirtColor(tshirtColorIp.value);
})


// Event Listeners

loginButton.addEventListener('click', () => {
    netlifyIdentity.open();
})

logoutButton.addEventListener('click', () => {
    netlifyIdentity.logout();
})

voiceSelectIp.addEventListener('change', e => {
    reader.voiceIndex = Number(e.target.value);
    reader.readText("Hi "+currentUser.user_metadata.full_name + " Have a great day!");
})

reader.populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = reader.populateVoiceList;
}

document.querySelector('form.create').addEventListener('submit', e => {
    e.preventDefault();
    const data = {
        username: currentUser,
        uid: currentUser.id,
        talkTitle: talkTitleIp.value,
        transcriptLink: transcriptLinkIp.value,
        slidePdfLink: slidesPdfIp.value,
        eventName: eventNameIp.value,
        character: {
            hairStyle: hairStyleIp.value,
            hairColor: hairColorIp.value,
            skinColor: skinColorIp.value,
            tshirtColor: tshirtColorIp.value
        },
        voice:{
            index: voiceSelectIp.value,
            ...document.querySelectorAll('select#voice-select > option')[voiceSelectIp.value].dataset
        } 
    }

    console.log(data);
    
})

// Events

netlifyIdentity.on('init', user => {
    if(!user) {
        logoutHandler();
        return;
    }
});


netlifyIdentity.on('login', loginHandler);


netlifyIdentity.on('logout', logoutHandler);
netlifyIdentity.on('error', err => console.error('Error', err));

netlifyIdentity.on('open', () => {
    console.log("Widget opened")
});
netlifyIdentity.on('close', () => console.log('Widget closed'));

