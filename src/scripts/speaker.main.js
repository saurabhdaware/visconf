import reader from './reader';
import slides from './slides';
import { useWait, openFullscreen, closeFullscreen } from './helpers';

// variables
export let isPaused = false;
export let currentIndex = 0;

// Set HTML for main speaker element


// elements
let progressBar, 
progressBarContainer,
currentText, 
startControl, 
pauseControl, 
muteVolumeControl, 
volumeOnControl, 
volumeToggleEl,
skipNextControl,
skipPrevControl,
captionsControl;


let transcript, mappedTranscript;
export let flatTranscript;


function init(userData) {
    if(!userData) {
        return;
    }

    document.querySelector('.mike-holder').innerHTML = userData.eventName;
    document.querySelector('.character-container').classList.remove('hide');
    
    setCharacterStyles(userData);
    setTranscript(userData.transcriptLink, userData.isTranscriptText);
    slides.setSlides(userData.slidePdfLink);


    progressBar = document.querySelector('.presentation-video-bar .progress');
    progressBarContainer = document.querySelector('.presentation-video-bar');

    currentText = document.querySelector('.current-text');

    // Controls
    startControl = document.querySelector('.control.start');
    pauseControl = document.querySelector('.control.pause');
    muteVolumeControl = document.querySelector('.control.mute');
    volumeOnControl = document.querySelector('.control.volumeon');
    volumeToggleEl = document.querySelector('span.volume');
    skipNextControl = document.querySelector('.control.skip-next');
    skipPrevControl = document.querySelector('.control.skip-previous');
    captionsControl = document.querySelector('.control.captions');

    startControl.addEventListener('click', startTalk);
    pauseControl.addEventListener('click', pauseTalk);
    muteVolumeControl.addEventListener('click', turnVolumeOff);
    volumeOnControl.addEventListener('click', turnVolumeOn);
    skipNextControl.addEventListener('click',skipNext);
    skipPrevControl.addEventListener('click', skipPrev);
    captionsControl.addEventListener('click', toggleCaptions);

    progressBarContainer.addEventListener('click', progressBarClickHandler)
    document.querySelector('.fullscreen').addEventListener('click', openFullscreen);
    document.querySelector('.fullscreen-exit').addEventListener('click', closeFullscreen)

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


async function setTranscript(transcriptData, isText=false) {
    if(!isText){
        let data = await (await fetch(transcriptData)).text();
        transcript = data;
    }else{
        transcript = transcriptData;
    }

    // mappedTranscript: [[text,...], [text, ...], [text, ...]]
    mappedTranscript = transcript.split('||').map(slide => slide.split('|'))

    // flatTranscript: [text, text, text]
    flatTranscript = mappedTranscript.flatMap(text => text);
}


async function startReadingFrom(){
    slides.setNewSlide(currentIndex, mappedTranscript);
    progressBar.style.width = currentIndex*100/flatTranscript.length + '%';

    if(currentIndex >= flatTranscript.length) {
        pauseTalk();
        currentIndex = 0;
        return;
    }
    let text = flatTranscript[currentIndex];
    if(text === undefined) return;

    currentText.innerHTML = flatTranscript[currentIndex].replace(/\$wait(2|5|10)s/g, '');
    

    await reader.readText(text.replace(/\$wait(2|5|10)s/g, ''));


    
    if(text.includes('$wait2s')){
        currentText.innerHTML = "...";
        await useWait(2000);
    }

    
    if(text.includes('$wait5s')){
        currentText.innerHTML = "*5s pause*";
        await useWait(5000);
    }

    if(text.includes('$wait10s')){
        currentText.innerHTML = "*10s pause*";
        await useWait(10000);
    }


    if(!isPaused){
        currentIndex++;
        startReadingFrom();
    }

}


function progressBarClickHandler(e) {
    let clickPositionX = Math.floor(e.offsetX*flatTranscript.length/e.target.offsetWidth);
    jumpTo(clickPositionX);
}

function startTalk() {
    startControl.style.display = 'none';
    pauseControl.style.display = 'inline-block';
    if(currentIndex === 0) currentText.innerHTML = flatTranscript[0];
    startReadingFrom();
    isPaused = false;
}

function pauseTalk() {
    startControl.style.display = 'inline-block';
    pauseControl.style.display = 'none';
    isPaused = true;
    speechSynthesis.cancel();
}

function jumpTo(i = 0) {
    currentText.innerHTML = flatTranscript[i];
    currentIndex = i - 1;
    if(isPaused){
        currentIndex++;
        startReadingFrom();
    }
    speechSynthesis.cancel();
}

function turnVolumeOff() {
    volumeToggleEl.classList.remove('playing');
    reader.volume = 0;
    speechSynthesis.cancel();
}

function turnVolumeOn() {
    volumeToggleEl.classList.add('playing');
    reader.volume = 10;
}

function skipNext() {
    // Skip Next
    currentText.innerHTML = flatTranscript[currentIndex + 1];
    if(isPaused){
        currentIndex++;
        startReadingFrom();
    }
    speechSynthesis.cancel();
}

function skipPrev() {
    currentText.innerHTML = flatTranscript[currentIndex - 1];
    currentIndex-=2;
    if(isPaused){
        currentIndex++;
        startReadingFrom();    
    }
    speechSynthesis.cancel();
}

function toggleCaptions() {
    if(currentText.style.display === 'none') {
        // show captions
        currentText.style.display = 'block';
        captionsControl.style.borderBottom = '2px solid #ff0';
    }else {
        // hide captions
        currentText.style.display = 'none';
        captionsControl.style.borderBottom = 'none';

    }
}


export default {
    init,
    setCharacterStyles,
    setTranscript,
    startReadingFrom,
    isPaused
}