import { wait } from './helpers';

class Reader {
    constructor() {
        this.voices = window.speechSynthesis.getVoices();
        this.volume = 10;
    }

    async readText(message) {
        if(message === undefined) message = '';
        return new Promise((resolve, reject) => {

            
            const msg = new SpeechSynthesisUtterance(message);
            msg.voice = this.voices[10]; // Note: some voices don't support altering params
            msg.voiceURI = 'native';
            msg.lang = 'en-US';
            msg.volume = this.volume;
            
            speechSynthesis.speak(msg);

            msg.onend = e => {
                
                    resolve(event.elapsedTime);
            }
        })
    }
}



const reader = new Reader();
export default reader;