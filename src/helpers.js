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

export { nextSlide, prevSlide }