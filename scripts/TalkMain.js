import {wait} from './helpers';
import Bol from 'bol';
import slides from '../scripts/slides';
import NoSleep from 'nosleep.js';

class TalkMain {
  constructor(voice, transcript, options = {rate: 1}) {
    this.bol = new Bol(voice, options);
    this.noSleep = new NoSleep();
    this.transcript = transcript;
    this.mappedTranscript = transcript.split('||').map(slide => slide.split('|'));
    slides.mappedTranscript = this.mappedTranscript;

    this.flatTranscript = this.mappedTranscript.flatMap(text => text);

    this.currentText = document.querySelector('.current-text');
    this.progressBar = document.querySelector('.presentation-video-bar .progress');
    this.currentText.innerHTML = this.flatTranscript[0];

    this.currentIndex = 0;
    this.isPaused = true;
    this.lastVolume = 1;

    this.read = this.read.bind(this);
    this.startHandler = this.startHandler.bind(this);
    this.pauseHandler = this.pauseHandler.bind(this);
    this.moveTo = this.moveTo.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  async read() {
    let text = this.flatTranscript[this.currentIndex];
    if(text === undefined) return;
    if(this.currentIndex === (this.flatTranscript.length - 1)) {
      this.pauseHandler();
      this.currentIndex = 0;
      document.querySelector('.end-banner').style.display = 'block';
      document.querySelector('.end-banner-close').addEventListener('click', e => {
        document.querySelector('.end-banner').style.display = 'none';
      })
    }
    this.progressBar.style.width = this.currentIndex*100/this.flatTranscript.length + '%';
    this.currentText.innerHTML = text.replace(/\$wait(2|5|10)s/g, '');
    slides.setNewSlide(this.currentIndex);

    const timeElapsed = await this.bol.speak(text.replace(/\$wait(2|5|10)s/g, ''));
    if(text.includes('$wait2s')) {
      this.currentText.innerHTML = '...';
      await wait(2000);
    }

    if(text.includes('$wait5s')) {
      this.currentText.innerHTML = '*5s pause*';
      await wait(5000);

    }

    if(text.includes('$wait10s')) {
      this.currentText.innerHTML = '*10s pause*';
      await wait(10000);
    }

    if(!this.isPaused) {
      this.currentIndex++;
      return this.read();
    }
  }

  // This function is called when start button is pressed
  startHandler(setIsTalking) {
    this.isPaused = false;
    this.read();
    setIsTalking(true);
    this.noSleep.enable();
    this.setIsTalking = setIsTalking
  }

  // // called when pause button is pressed
  pauseHandler(setIsTalking = this.setIsTalking) {
    this.isPaused = true;
    speechSynthesis.cancel();
    this.noSleep.disable();
    setIsTalking(false);
  }

  moveTo(index = 0) {
    this.currentText.innerHTML = this.flatTranscript[index];
    this.currentIndex = index - 1;
    if(this.isPaused) {
      this.currentIndex++;
      this.read();
    }

    speechSynthesis.cancel();
  }

  next() {
    this.moveTo(++this.currentIndex);
  }

  prev() {
    this.moveTo(--this.currentIndex);
  }

  progressBarClickHandler(e) {
    let clickPositionX = Math.floor(e.offsetX*this.flatTranscript.length/e.target.offsetWidth);
    this.moveTo(clickPositionX);
  }


}

export default TalkMain;