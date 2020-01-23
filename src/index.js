import '../public/index.html';
import '../public/styles/main.css';
import '../public/_redirects';

import '../public/example/Transcript.md';
import '../public/example/slides.pdf';

const talks = require('./talks.json');
import reader from './reader';
import Slides from './Slides';
import { wait, goToSlideNumber } from './helpers';

const [username, slug ] = location.pathname.split('/').slice(1);
document.title = `${slug} by ${username} || VisConf`;

// variables
let isPaused = false;
let lastSlideIndex = 0;

// elements
const progressBar = document.querySelector('.presentation-video-bar > .progress');

function main() {
    if(!username || !slug) return;

    const userData = talks.data[username][slug];

    if(!userData) {
        return;
    }

    document.querySelector('.mike-holder').innerHTML = userData.eventName;
    setTranscript(userData.transcriptLink);
    setSlides(userData.slidePdfLink);
}


main();


var transcript, mappedTranscript, flatTranscript;
async function setTranscript(transcriptPath) {
    let data = await (await fetch(transcriptPath)).text();
    transcript = data;

    // mappedTranscript: [[text,...], [text, ...], [text, ...]]
    mappedTranscript = transcript.split('||').map(slide => slide.split('|'))

    // flatTranscript: [text, text, text]
    flatTranscript = mappedTranscript.flatMap(text => text);
}

async function setSlides(pdfPath) {
    const slides = new Slides();
    const pdf = await slides.loadPDF(pdfPath);
    document.querySelector('.slides-display-container').innerHTML = ''
    for(let pageNumber=1; pageNumber<=pdf._pdfInfo.numPages; pageNumber++) {
        document.querySelector('.slides-display-container').innerHTML += `
        <div class="slide slide-${pageNumber} ${pageNumber === 1 ? 'show' : '' }" data-slide=${pageNumber}>
            <canvas id="canvas-page-${pageNumber}"></canvas>
        </div>
        `
        slides.renderPage(pageNumber);
    }
}

const currentText = document.querySelector('.current-text');


function setNewSlide(flatIndex) {
    let prev = 0;
    for(let index in mappedTranscript) {
        if(flatIndex < (prev + mappedTranscript[index].length)) {
            goToSlideNumber(index);
            return [index, flatIndex - prev];
        }

        prev += mappedTranscript[index].length;
    }
}

async function startReadingFrom(index){
    setNewSlide(index);
    progressBar.style.width = index*100/flatTranscript.length + '%';


    let text = flatTranscript[index];
    if(text === undefined) return;
    
    await reader.readText(flatTranscript[index].replace(/\$wait(2|5|10)s/g, ''));

    if(isPaused){
        lastSlideIndex = index;
        return;
    }

    if(text.includes('$wait2s')){
        console.log("2s pause");
        currentText.innerHTML = "...";
        await wait(2000);
    }

    if(text.includes('$wait5s')){
        console.log("5s pause");
        currentText.innerHTML = "*points to slides*";
        await wait(5000);
    }

    if(text.includes('$wait10s')){
        console.log("10s pause");
        currentText.innerHTML = "*points to slides*";
        await wait(10000);
    }
    currentText.innerHTML = flatTranscript[index + 1].replace(/\$wait(2|5|10)s/g, '');
    lastSlideIndex = index;

    if(!isPaused) startReadingFrom(++index);

}

// Controls
const startControl = document.querySelector('.control.start');
const pauseControl = document.querySelector('.control.pause');
const replayControl = document.querySelector('.control.restart');
const muteVolumeControl = document.querySelector('.control.mute');
const volumeOnControl = document.querySelector('.control.volumeon');
const volumeToggleEl = document.querySelector('span.volume');

startControl.addEventListener('click', () => {
    startControl.style.display = 'none';
    pauseControl.style.display = 'inline-block';
    if(lastSlideIndex === 0) currentText.innerHTML = flatTranscript[0];
    startReadingFrom(lastSlideIndex);
    isPaused = false;
})

pauseControl.addEventListener('click', () => {
    startControl.style.display = 'inline-block';
    pauseControl.style.display = 'none';
    speechSynthesis.cancel();
    isPaused = true;
})

replayControl.addEventListener('click', () => {
    startControl.style.display = 'inline-block';
    pauseControl.style.display = 'none';
    lastSlideIndex = 0;
    currentText.innerHTML = flatTranscript[0];
    setNewSlide(0);
    progressBar.style.width = '0%';
    isPaused = true;
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

