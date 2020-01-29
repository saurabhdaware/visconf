class Reader {
    constructor() {
        this.voices = [];
        this.voiceIndex = 10;
        this.volume = 10;
        this.populateVoiceList = this.populateVoiceList.bind(this);
        this.populateVoiceList();
        if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = this.populateVoiceList;
        }
    }

    async readText(message) {
        if(message === undefined) message = '';
        return new Promise((resolve, reject) => {

            const msg = new SpeechSynthesisUtterance(message);
            msg.voice = this.voices[this.voiceIndex]; // Note: some voices don't support altering params
            msg.volume = this.volume;
            
            speechSynthesis.speak(msg);

            msg.onend = e => {
                resolve(event.elapsedTime);
            }
        })
    }

    populateVoiceList() {
        if(typeof speechSynthesis === 'undefined' || this.voices.length > 0) {
          return;
        }
        
        this.voices = speechSynthesis.getVoices();

        for(let i = 0; i < this.voices.length ; i++) {
            var option = document.createElement('option');
            option.textContent = this.voices[i].name + ' (' + this.voices[i].lang + ')';
            
            if(i === 2){
                option.setAttribute('selected', true);
            }
            option.setAttribute('data-lang', this.voices[i].lang);
            option.setAttribute('data-name', this.voices[i].name);
            option.setAttribute('value', i);
            document.getElementById("voice-select").appendChild(option);
        }


    }
}



const reader = new Reader();
export default reader;