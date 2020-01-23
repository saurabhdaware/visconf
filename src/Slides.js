import { isMobile } from './helpers';

class Slides {
    constructor() {
        this.pdfjsLib = window['pdfjs-dist/build/pdf'];
        this.pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
    }

    async loadPDF(url) {
        var loadingTask = this.pdfjsLib.getDocument(url);
        return loadingTask.promise
            .then(pdf => {
                this.pdf = pdf;
                return pdf;
            })
    }

    async renderPage(pageNumber) {
        const page = await this.pdf.getPage(pageNumber);
        let scale;
        if(isMobile()) {
            scale = 400/page.view[2];
        }else {
            scale = 600/page.view[2];
        }
        // 600 / 1000
        const viewport = page.getViewport({scale: scale});

        // Prepare canvas using PDF page dimensions
        const canvas = document.getElementById('canvas-page-'+pageNumber);
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        document.querySelector('.presentation-container').style.height = canvas.height + 20 + 'px';

        // x = vh
        // 600 = vw

        // Render PDF page into canvas context
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };



        const renderTask = page.render(renderContext);
        
        return renderTask.promise;
    }
}

export default Slides;