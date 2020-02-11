import '../public/index.html';
import '../public/styles/main.css';
import '../public/_redirects';

import '../example/Transcript.md';
import '../example/slides.pdf';

import '../public/images/logo-512.png';
import '../public/images/logo-192.png';
import '../public/images/favicon.ico';

const env = require('../configs/env');
import speaker from './scripts/speaker.main';
import { defaultUser, openFullscreen } from './scripts/helpers';
import { talk } from './templates';

// Set HTML
document.querySelector('#app').innerHTML = talk;

// Important event listeners that need to be added before initiating slides
document.querySelector('#rotate-screen-button').addEventListener('click', openFullscreen)

// redirect to create for registration confirmation
if(location.hash.startsWith('#confirmation_token') && !location.href.includes('create')){
    location.href = "create.html/"+ location.hash;
}


const [ username, slug ] = location.pathname.split('/').slice(1);

if(!username || !slug || (username === 'me' && slug === 'test')){
    speaker.init(defaultUser)
}else if(username && slug) {
    document.title = `${slug} by ${username} || VisConf`;
    fetch(`${env.functionsEndpoint}/get-talk?username=${username}&slug=${slug}`)
        .then(res => res.json())
        .then(res => {
            if(res.success === true){
                speaker.init(res.message);
            }
        })
        .catch(err => {
            console.log(err);
        })
}
