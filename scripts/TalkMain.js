import {wait} from './helpers';
import Bol from 'bol';

class TalkMain {
  constructor(voice, transcript) {
    this.bol = new Bol(voice);
    
    this.transcript = transcript;
    this.mappedTranscript = transcript.split('||').map(slide => slide.split('|'))
    this.flatTranscript = this.mappedTranscript.flatMap(text => text);

    this.currentText = document.querySelector('.current-text');
    this.currentText.innerHTML = this.flatTranscript[0];

    this.currentIndex = 0;
    this.isPaused = true;
    
    this.read = this.read.bind(this);
    this.startHandler = this.startHandler.bind(this);
    this.pauseHandler = this.pauseHandler.bind(this);
  }

  async read() {
    this.currentText.innerHTML = this.flatTranscript[this.currentIndex];
    const timeElapsed = await this.bol.speak(this.flatTranscript[this.currentIndex]);
    
    if(this.flatTranscript[this.currentIndex].includes('$wait2s')){
      await wait(2000);
    }

    if(!this.isPaused) {
      this.currentIndex++;
      this.read();
    }
  }

  pause() {
    speechSynthesis.pause();
  }

  resume() {
    speechSynthesis.resume();
  }

  cancel() {
    speechSynthesis.cancel();
  }

  startHandler(setIsTalking) {
    this.isPaused = false;
    this.read();
    setIsTalking(true);
  }

  pauseHandler(setIsTalking) {
    this.isPaused = true;
    this.cancel();
    setIsTalking(false);
  }
}

export default TalkMain;