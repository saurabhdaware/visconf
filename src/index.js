import '../public/index.html';
import '../public/styles/main.css';
import '../public/_redirects';

import '../public/example/Transcript.md';
import '../public/example/slides.pdf';

const talks = require('./talks.json');
import reader from './reader';
import Slides from './Slides';
import { nextSlide, wait, goToSlideNumber } from './helpers';

const [username, slug ] = location.pathname.split('/').slice(1);
document.title = `${slug} by ${username} || VisConf`;

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

function setNewSlide(flatIndex) {
    let prev = 0;
    for(let index in mappedTranscript) {
        if(flatIndex < (prev + mappedTranscript[index].length)) {
            // console.log(mappedTranscript[index][flatIndex - prev]);
            goToSlideNumber(index);
            return [index, flatIndex - prev];
        }

        prev += mappedTranscript[index].length;
    }
}

async function readMessages(index){
    setNewSlide(index);
    let text = flatTranscript[index];
    if(text === undefined) return;
    
    await reader.readText(flatTranscript[index].replace(/\$wait/g, ''));
    currentText.innerHTML = flatTranscript[index + 1].replace(/\$wait/g, '');
    if(text.includes('$wait')){
        await wait(3000);
    }
    readMessages(++index);

}

// function readTranscript() {
//     currentText.innerHTML = flatTranscript[0];
//     console.log(mappedTranscript);
// }


document.querySelector('.start-presentation').addEventListener('click', () => {
    document.querySelector('.index-overlay').style.display = 'none';
    currentText.innerHTML = flatTranscript[0];
    readMessages(0);
})