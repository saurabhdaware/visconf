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
        const page = await this.pdf.getPage(pageNumber)
        const scale = .7;
        const viewport = page.getViewport({scale: scale});

        // Prepare canvas using PDF page dimensions
        const canvas = document.getElementById('canvas-page-'+pageNumber);
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;



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