import './editor.html';
import '../../public/styles/main.css';
import './editor.css';

import speaker from '../scripts/speaker.main';
import { defaultUser, isURL, isMobile, openFullscreen, closeFullscreen } from '../scripts/helpers';
import { talk, editor } from '../templates';
import slides from '../scripts/slides';

let activeTab = 'editor';
const defaultTranscriptText = `
Hi there!
| Baby yoda here!
| I am here to show you guys random pictures!!!

|| This is slide 2
| Here's a random lorem ipsum text
| lots of lorem ipsum

|| Here's me with a tea
| Drink tea
| Also drink water
| Water you doing?

|| umm idk why morty's here

|| Doggo!!!
| Let's wait here for 10 seconds and appreciate doggo hair spaghetti $wait10s

|| Umm... okaayyy $wait2s

|| a telly tubby! or a kitty?? or a telly tubby
| noo its kitty
| could be telly tubby tho
| anyway

|| Thenks
`


function setActiveTab(tab) {
    const previewButton = document.querySelector('button.show-talk-button');
    const editorButton = document.querySelector('button.show-editor-button');

    if(tab === 'preview') {
        previewButton.style.opacity = 1;
        editorButton.style.opacity = .8;
    }

    if(tab === 'editor') {
        previewButton.style.opacity = .8;
        editorButton.style.opacity = 1;
        
    }

    activeTab = tab;
}

// Set HTML
function showTalk() {
    setActiveTab('preview');

    saveText();
    let transcriptContent = document.querySelector('#transcript-editor').innerText;
    let slidesUrlVal = document.querySelector('#slides-input').value;

    document.querySelector('#app').innerHTML = talk;

    
    let newUser = {...defaultUser};
    newUser.transcriptLink = transcriptContent;
    newUser.isTranscriptText = true;
    newUser.slidePdfLink = slidesUrlVal;

    speaker.init(newUser);
    if(isMobile()) {
        openFullscreen();
    }
}

let slidesInput;
// Open Editor
function showEditor() {
    setActiveTab('editor');
    document.querySelector('#app').innerHTML = editor;
    editorDataLoad();

    document.querySelector('#transcript-editor').addEventListener('input', handleAutoSave);
    slidesInput = document.querySelector('input#slides-input');
    if(isMobile()) {
        try{
            closeFullscreen();
        }catch(e) {
            console.log(e);
        }
    }
    setEditorSlides();
    document.querySelector('.fetch-slides-btn').addEventListener('click', setEditorSlides)
    document.querySelector('.download-transcript-button').addEventListener('click', downloadTranscript)
    document.querySelector('.show-talk-button-2').addEventListener('click', showTalk);
}

function setEditorSlides() {
    if(slidesInput.value && isURL(slidesInput.value) && slidesInput.value.includes('.pdf')){
        fetchEditorSlides();
        window.localStorage.setItem('editor-slides-url', slidesInput.value);
    }
}

async function fetchEditorSlides() {
    if(slidesInput.value.includes('https://github.com/')){
        // change usual github URLs to Raw URLs
        slidesInput.value = slidesInput.value.replace('https://github.com/', 'https://raw.githubusercontent.com/').replace('/blob', '');
    }
    return slides.loadPDF(slidesInput.value)
        .then(pdf => {
            document.querySelector('.editor-presentation-preview').innerHTML = '';
            for(let pageNumber=1;pageNumber <= pdf._pdfInfo.numPages; pageNumber++) {
                document.querySelector('.editor-presentation-preview').innerHTML += /* html */`
                    <div class="editor-slide">
                        <canvas id="canvas-page-${pageNumber}"></canvas>
                    </div>
                `;

                slides.renderPage(pageNumber, 0.5);
            }

        })
}

function prettifyTranscript(data) {
    const prettifiedData = data.split('||').map(page => page.split('|').join('<br>|')).join('<br><br>||');
    return prettifiedData;
}

function editorDataLoad() {
    document.querySelector('#transcript-editor').innerHTML = prettifyTranscript(window.localStorage.getItem('editor-content') || defaultTranscriptText);
    document.querySelector('#slides-input').value = window.localStorage.getItem('editor-slides-url') || "https://res.cloudinary.com/saurabhdaware/image/upload/v1580631896/npm/random.pdf";
}


function saveText() {
    window.localStorage.setItem('editor-content', document.querySelector('#transcript-editor').innerText);
}

let isSaved;
let autoSaveTimeout;
function handleAutoSave() {
    isSaved = false;

    if(autoSaveTimeout) clearTimeout(autoSaveTimeout);

    autoSaveTimeout = setTimeout(() => {
        isSaved = true;
        saveText();
        console.log("Auto saved");
    }, 800)
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

function downloadTranscript() {
    download('transcript.md', document.querySelector('#transcript-editor').innerText);
}


showEditor();

document.querySelector('.show-editor-button').addEventListener('click', showEditor);
document.querySelector('.show-talk-button').addEventListener('click', showTalk);
