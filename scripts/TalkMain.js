import {wait} from './helpers';
import Bol from 'bol';
import slides from '../scripts/slides';


class TalkMain {
  constructor(voice, transcript, options = {}) {
    this.bol = new Bol(voice, options);
    
    this.transcript = transcript;
    this.mappedTranscript = transcript.split('||').map(slide => slide.split('|'));
    slides.mappedTranscript = this.mappedTranscript;

    this.flatTranscript = this.mappedTranscript.flatMap(text => text);

    this.currentText = document.querySelector('.current-text');
    this.currentText.innerHTML = this.flatTranscript[0];

    this.currentIndex = 0;
    this.isPaused = true;
    
    this.read = this.read.bind(this);
    this.startHandler = this.startHandler.bind(this);
    this.pauseHandler = this.pauseHandler.bind(this);
    this.moveTo = this.moveTo.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.turnVolumeOn = this.turnVolumeOn.bind(this);
    this.turnVolumeOff = this.turnVolumeOff.bind(this);
  }

  async read() {
    let text = this.flatTranscript[this.currentIndex];
    if(text === undefined) return;
    this.currentText.innerHTML = text.replace(/\$wait(2|5|10)s/g, '');
    slides.setNewSlide(this.currentIndex);

    const timeElapsed = await this.bol.speak(text.replace(/\$wait(2|5|10)s/g, ''));
    if(text.includes('$wait2s')) {
      await wait(2000);
    }

    if(text.includes('$wait5s')) {
      await wait(5000);
    }

    if(text.includes('$wait10s')) {
      await wait(10000);
    }

    if(!this.isPaused) {
      this.currentIndex++;
      this.read();
    }
  }

  // This function is called when start button is pressed
  startHandler(setIsTalking) {
    this.isPaused = false;
    this.read();
    setIsTalking(true);
  }

  // called when pause button is pressed
  pauseHandler(setIsTalking) {
    this.isPaused = true;
    speechSynthesis.cancel();
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

  turnVolumeOff(setIsVolumeOn) {
    setIsVolumeOn(false);
    this.lastVolume = this.bol.volume;
    this.bol.volume = 0;
    speechSynthesis.cancel();
  }

  turnVolumeOn(setIsVolumeOn) {
    setIsVolumeOn(true);
    this.bol.volume = this.lastVolume;
  }


}

export default TalkMain;