class Reader {
    constructor() {
        this.voices = speechSynthesis.getVoices();
        this.voiceIndex = 10;
        this.volume = 10;
        // this.populateVoiceList = this.populateVoiceList.bind(this);
        // this.populateVoiceList();
        // if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
        //     speechSynthesis.onvoiceschanged = this.populateVoiceList;
        // }
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

    // Need to figure out the way to have contant voices over different browsers and devices
    // populateVoiceList() {
    //     if(typeof speechSynthesis === 'undefined' || this.voices.length > 0) {
    //       return;
    //     }
        
    //     this.voices = speechSynthesis.getVoices();
    //     console.log(this.voices);
    //     for(let i = 0; i < this.voices.length ; i++) {
    //         var option = document.createElement('option');
    //         option.textContent = this.voices[i].name + ' (' + this.voices[i].lang + ')';
            
    //         if(i === 2){
    //             option.setAttribute('selected', true);
    //         }
    //         option.setAttribute('data-lang', this.voices[i].lang);
    //         option.setAttribute('data-name', this.voices[i].name);
    //         option.setAttribute('value', i);
    //         document.getElementById("voice-select").appendChild(option);
    //     }


    // }
}



const reader = new Reader();
export default reader;