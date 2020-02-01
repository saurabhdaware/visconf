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

var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }

    document.querySelector('.fullscreen-exit').style.display = 'inline-block';
    document.querySelector('.fullscreen').style.display = 'none';
    screen.orientation.lock("landscape-primary")
        .catch(console.warn);
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }

    document.querySelector('.fullscreen-exit').style.display = 'none';
    document.querySelector('.fullscreen').style.display = 'inline-block';
}


async function wait(time){
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), time);
    });
}

const defaultUser = {
    "username": "me",
    "talkTitle": "test",
    "slug": "test",
    "transcriptLink": "/example/Transcript.md",
    "slidePdfLink": "/example/slides.pdf",
    "eventName": "VisConf <br/>Test",
    "character": {
        "hairStyle": "long",
        "hairColor": "#1f0900",
        "skinColor": "#724e25",
        "tshirtColor": "#67abd3"
    },
    "voice": {
        "index": "2",
        "lang": "en-GB",
        "name": "Google UK English Female"
    }
}

export { wait, isMobile, isURL, openFullscreen, closeFullscreen, defaultUser }