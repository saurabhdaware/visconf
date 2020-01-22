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


async function wait(time){
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), time);
    })
}

export { nextSlide, prevSlide, goToSlideNumber, wait }