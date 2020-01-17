import reader from './reader';
import Slides from './Slides';
import '../public/index.html';
import '../public/presentation/Transcript.md';
import '../public/presentation/slides.pdf';

setTranscript("presentation/Transcript.md");
setSlides("presentation/slides.pdf");
var transcript, mappedTranscript, flatTranscript;
async function setTranscript(transcriptPath) {
    let data = await (await fetch(transcriptPath)).text();
    transcript = data;
    // mappedTranscript: [[text,...], [text, ...], [text, ...]]
    mappedTranscript = transcript.split('||').map(slide => slide.split('|'))

    // flatTranscript: [text, text, text]
    flatTranscript = mappedTranscript.flatMap(text => text);
    readTranscript();
}

async function setSlides(pdfPath) {
    const slides = new Slides();
    const pdf = await slides.loadPDF(pdfPath);
    for(let pageNumber=1; pageNumber<=pdf._pdfInfo.numPages; pageNumber++) {
        document.querySelector('.slides-display-container').innerHTML += `
        <div class="slide slide-${pageNumber} ${pageNumber === 1 ? 'show' : null }" data-slide=${pageNumber}>
            <canvas id="canvas-page-${pageNumber}"></canvas>
        </div>
        `
        slides.renderPage(pageNumber);
    }
}

const currentText = document.querySelector('.current-text');


function nextSlide() {
    const currentSlideEl = document.querySelector('.slide.show');
    let currentSlideNumber = Number(currentSlideEl.dataset.slide);

    currentSlideEl.classList.remove('show');
    document.querySelector(`.slide.slide-${++currentSlideNumber}`).classList.add('show');
}

function prevSlide() {
    const currentSlideEl = document.querySelector('.slide.show');
    let currentSlideNumber = Number(currentSlideEl.dataset.slide);

    currentSlideEl.classList.remove('show');
    document.querySelector(`.slide.slide-${--currentSlideNumber}`).classList.add('show');
}

let nextTextCounter = 0;

function readTranscript() {
    currentText.innerHTML = flatTranscript[0];
    for(let slide of mappedTranscript) {
        slide.forEach(async (text, index) => {
            const timeElapsed = await reader.readText(text);
            console.log(timeElapsed);
            currentText.innerHTML = flatTranscript[nextTextCounter+1];
            nextTextCounter++;
            if(index === slide.length - 1){
                nextSlide();
                return;
            }            
        })
    }
} 



