import '../public/index.html';
import '../public/styles/main.css';
import '../public/_redirects';

import '../example/Transcript.md';
import '../example/slides.pdf';

const env = require('../configs/env');
import speaker from './speaker.main';

// redirect to create for registration confirmation
if(location.hash.startsWith('#confirmation_token') && !location.href.includes('create')){
    location.href = "create.html/"+ location.hash;
}


const [username, slug ] = location.pathname.split('/').slice(1);

if(!username || !slug){
    const defaultUser = {
        "username": "me",
        "talkTitle": "test",
        "slug": "test",
        "transcriptLink": "/example/Transcript.md",
        "slidePdfLink": "/example/slides.pdf",
        "eventName": "VisConf <br/>Test",
        "character": {
            "hairStyle": "long",
            "hairColor": "#fde968",
            "skinColor": "#e2c4a1",
            "tshirtColor": "#ff001f"
        },
        "voice": {
            "index": "2",
            "lang": "en-GB",
            "name": "Google UK English Female"
        }
    }
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
}
