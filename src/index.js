import '../public/index.html';
import '../public/styles/main.css';
import '../public/_redirects';

const talk  = require('./talks.json');

console.log(talk);
import reader from './reader';
import Slides from './Slides';
import { nextSlide } from './helpers';

function main() {
    const [username, slug ] = location.pathname.split('/').slice(1);
    const userData = talk.data[username][slug];

    if(!userData) {
        return;
    }
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
    console.log(flatTranscript);
    readTranscript();
}

async function setSlides(pdfPath) {
    const slides = new Slides();
    const pdf = await slides.loadPDF(pdfPath);
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


let nextTextCounter = 0;

function readTranscript() {
    currentText.innerHTML = flatTranscript[0];
    for(let slide of mappedTranscript) {
        slide.forEach(async (text, index) => {
            const timeElapsed = await reader.readText(text);
            console.log(timeElapsed);
            currentText.innerHTML = flatTranscript[nextTextCounter+1] !== undefined ? flatTranscript[nextTextCounter+1] : '';
            nextTextCounter++;
            if(index === slide.length - 1){
                nextSlide();
                return;
            }            
        })
    }
} 



