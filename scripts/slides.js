import pdfjsLib from 'pdfjs-dist';
import { isMobile } from '../scripts/helpers';

class Slides {
  constructor() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@2.2.228/build/pdf.worker.min.js";
  }

  async loadPDF(url) {
    var loadingTask = pdfjsLib.getDocument(url);
    return loadingTask.promise
      .then(pdf => {
        this.pdf = pdf;
        return pdf;
      })
  }

  async renderPage(pageNumber, definedScale = undefined) {
    const page = await this.pdf.getPage(pageNumber);
    
    let scale;
    if(definedScale){
      scale = definedScale;
    }else{
      if(isMobile()) {
        scale = 400/page.view[2];
      }else {
        scale = 600/page.view[2];
      }
    }


    const viewport = page.getViewport({scale: scale});

    // Prepare canvas using PDF page dimensions
    const canvas = document.getElementById('canvas-page-'+pageNumber);
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    if(document.querySelector('.presentation-container')) {
      document.querySelector('.presentation-container').style.height = canvas.height + 20 + 'px';
    }

    // Render PDF page into canvas context
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    const renderTask = page.render(renderContext);
    
    return renderTask.promise;
  }

  async setSlides(pdfPath) {
    const pdf = await this.loadPDF(pdfPath);
    const slideDisplayContainerEl = document.querySelector('.slides-display-container');
    
    // rendering first slide ASAP
    slideDisplayContainerEl.innerHTML = /* html */`
      <div class="slide slide-1 show" data-slide=1 >
        <canvas id="canvas-page-1"></canvas>
      </div>
    `
    this.renderPage(1);

    // later rendering other slides
    let nextSlidesHTMLContainer = '';
    for(let pageNumber=2; pageNumber<=pdf._pdfInfo.numPages; pageNumber++) {
      nextSlidesHTMLContainer += /* html */`
      <div class="slide slide-${pageNumber}" data-slide=${pageNumber}>
        <canvas id="canvas-page-${pageNumber}"></canvas>
      </div>
      `;
    }

    slideDisplayContainerEl.innerHTML += nextSlidesHTMLContainer;
    for(let pageNumber=2; pageNumber<=pdf._pdfInfo.numPages; pageNumber++) {
      this.renderPage(pageNumber)
    }

  }

  goToSlideNumber(slideNumber) {
    const currentSlideEl = document.querySelector('.slide.show');
    const newSlideEl = document.querySelector(`.slide.slide-${Number(slideNumber) + 1}`);
  
    if(!newSlideEl) return;
  
    currentSlideEl.classList.remove('show');
    newSlideEl.classList.add('show');
  }

  setNewSlide(flatIndex) {
    // On giving flatIndex (index of flat array of transcript) this function calculates the index in the matrix of mapped transcript and goes to that slide.
    let prev = 0;
    for(let index in this.mappedTranscript) {
      if(flatIndex < (prev + this.mappedTranscript[index].length)) {
        this.goToSlideNumber(index);
        return [index, flatIndex - prev];
      }
  
      prev += this.mappedTranscript[index].length;
    }
  }
  
}

const slides = new Slides();
export default slides;