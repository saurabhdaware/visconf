import reader from './reader';
import slides from './slides';
import { wait, openFullscreen, closeFullscreen } from './helpers';


// variables
export let isPaused = false;
export let lastSlideIndex = 0;

// elements
const progressBar = document.querySelector('.presentation-video-bar > .progress');
const currentText = document.querySelector('.current-text');

function init(userData) {
    if(!userData) {
        return;
    }

    document.querySelector('.mike-holder').innerHTML = userData.eventName;
    document.querySelector('.character-container').classList.remove('hide');
    
    setCharacterStyles(userData);
    setTranscript(userData.transcriptLink);
    // setCharacterVoice(userData.voice);
    slides.setSlides(userData.slidePdfLink);
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


let transcript, mappedTranscript;
export let flatTranscript;

async function setTranscript(transcriptPath) {
    let data = await (await fetch(transcriptPath)).text();
    transcript = data;

    // mappedTranscript: [[text,...], [text, ...], [text, ...]]
    mappedTranscript = transcript.split('||').map(slide => slide.split('|'))

    // flatTranscript: [text, text, text]
    flatTranscript = mappedTranscript.flatMap(text => text);
}




async function startReadingFrom(index, onlyOnce = false){
    slides.setNewSlide(index, mappedTranscript);
    progressBar.style.width = index*100/flatTranscript.length + '%';


    let text = flatTranscript[index];
    if(text === undefined) return;
    
    lastSlideIndex = index;
    await reader.readText(text.replace(/\$wait(2|5|10)s/g, ''));

    if(isPaused){
        lastSlideIndex = index;
        return;
    }


    if(text.includes('$wait2s')){
        currentText.innerHTML = "...";
        await wait(2000);
    }

    if(text.includes('$wait5s')){
        currentText.innerHTML = "*points to slides*";
        await wait(5000);
    }

    if(text.includes('$wait10s')){
        currentText.innerHTML = "*points to slides*";
        await wait(10000);
    }
    currentText.innerHTML = flatTranscript[index + 1].replace(/\$wait(2|5|10)s/g, '');
    
    if(!isPaused && !onlyOnce) startReadingFrom(++index);

}

// skipPrevControl.addEventListener('click', () => {
//     // Skip Prev
//     let i = lastSlideIndex - 1;
//     speechSynthesis.cancel();
//     startReadingFrom(i, true);
// })



// Controls
const startControl = document.querySelector('.control.start');
const pauseControl = document.querySelector('.control.pause');
const replayControl = document.querySelector('.control.restart');
const muteVolumeControl = document.querySelector('.control.mute');
const volumeOnControl = document.querySelector('.control.volumeon');
const volumeToggleEl = document.querySelector('span.volume');
const skipNextControl = document.querySelector('.control.skip-next');
// const skipPrevControl = document.querySelector('.control.skip-previous');


function startTalk() {
    startControl.style.display = 'none';
    pauseControl.style.display = 'inline-block';
    if(lastSlideIndex === 0) currentText.innerHTML = flatTranscript[0];
    startReadingFrom(lastSlideIndex);
    isPaused = false;
}


function pauseTalk() {
    startControl.style.display = 'inline-block';
    pauseControl.style.display = 'none';
    speechSynthesis.cancel();
    isPaused = true;
}

startControl.addEventListener('click', startTalk);
pauseControl.addEventListener('click', pauseTalk);

replayControl.addEventListener('click', () => {
    pauseTalk();
    // lastSlideIndex = 0;
    currentText.innerHTML = flatTranscript[0];
    slides.setNewSlide(0, mappedTranscript);
    progressBar.style.width = '0%';
})

muteVolumeControl.addEventListener('click', () => {
    volumeToggleEl.classList.remove('playing');
    reader.volume = 0;
    speechSynthesis.cancel();
})

volumeOnControl.addEventListener('click', () => {
    volumeToggleEl.classList.add('playing');
    reader.volume = 10;
})

document.querySelector('.fullscreen').addEventListener('click', () => {
    // Full screen
    openFullscreen();
    document.querySelector('.fullscreen-exit').style.display = 'inline-block';
    document.querySelector('.fullscreen').style.display = 'none';
})

document.querySelector('#rotate-screen-button').addEventListener('click', () => {
    // Full screen
    openFullscreen();
    document.querySelector('.fullscreen-exit').style.display = 'inline-block';
    document.querySelector('.fullscreen').style.display = 'none';
})


document.querySelector('.fullscreen-exit').addEventListener('click', () => {
    // Exit full screen
    closeFullscreen();
    document.querySelector('.fullscreen-exit').style.display = 'none';
    document.querySelector('.fullscreen').style.display = 'inline-block';
})

skipNextControl.addEventListener('click', () => {
    // Skip Next
    let i = lastSlideIndex + 1;
    speechSynthesis.cancel();
    startReadingFrom(i, true);
})

export default {
    init,
    setCharacterStyles,
    setTranscript,
    startReadingFrom,
    isPaused,
    lastSlideIndex
}