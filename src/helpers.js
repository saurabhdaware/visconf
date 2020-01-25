function nextSlide() {
    const currentSlideEl = document.querySelector('.slide.show');
    let currentSlideNumber = Number(currentSlideEl.dataset.slide);

    currentSlideEl.classList.remove('show');
    document.querySelector(`.slide.slide-${++currentSlideNumber}`).classList.add('show');
}

function goToSlideNumber(slideNumber) {
    const currentSlideEl = document.querySelector('.slide.show');
    const newSlideEl = document.querySelector(`.slide.slide-${Number(slideNumber) + 1}`);

    if(!newSlideEl) return;


    currentSlideEl.classList.remove('show');
    newSlideEl.classList.add('show');
}

function prevSlide() {
    const currentSlideEl = document.querySelector('.slide.show');
    let currentSlideNumber = Number(currentSlideEl.dataset.slide);

    currentSlideEl.classList.remove('show');
    document.querySelector(`.slide.slide-${--currentSlideNumber}`).classList.add('show');
}

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
}


async function wait(time){
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), time);
    })
}

export { nextSlide, prevSlide, goToSlideNumber, wait, isMobile, openFullscreen, closeFullscreen }