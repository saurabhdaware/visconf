import { Fragment, useEffect } from "react";
import { defaultTranscriptText, isURL, defaultUser } from '../scripts/helpers';
import slides from '../scripts/slides';
import Character from '../components/Character';

// Slides Helpers
function setEditorSlides() {
  let slidesInput = document.querySelector('#slides-input');
  window.localStorage.setItem('editor-slides-url', slidesInput.value);

  if(slidesInput.value && isURL(slidesInput.value) && slidesInput.value.includes('.pdf')){
    fetchEditorSlides();
    window.localStorage.setItem('editor-slides-url', slidesInput.value);
  }
}

async function fetchEditorSlides() {
  let slidesInput = document.querySelector('#slides-input');
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



// Transcript Helpers
function prettifyTranscript(data) {
  const prettifiedData = data.split('||').map(page => page.split('|').join('<br>|')).join('<br><br>||');
  return prettifiedData;
}

function editorDataLoad() {
  document.querySelector('#transcript-editor').innerHTML = prettifyTranscript(window.localStorage.getItem('editor-content') || defaultTranscriptText);
  document.querySelector('#slides-input').value = window.localStorage.getItem('editor-slides-url') || "https://res.cloudinary.com/saurabhdaware/image/upload/v1580631896/npm/random.pdf";
  setEditorSlides();
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
  }, 800)
}

// Create 


export function EditorForm({openTalk}) {
  useEffect(() => {
    document.querySelector('#transcript-editor').addEventListener('input', handleAutoSave);
    document.querySelector('.fetch-slides-btn').addEventListener('click', setEditorSlides)
    editorDataLoad();
  }, []);

  return (
    <Fragment>
    <div className="editor-component">
      <div className="form-field">
        <label>Slides (PDF) URL <small>(<a target="_blank" rel="noopener" href="https://smallpdf.com/ppt-to-pdf">Convert your PPT to PDF file</a> and upload it to a CDN like <a target="_blank" rel="noopener" href="https://cloudinary.com">cloudinary</a> (even GitHub works))</small></label>
        <input id="slides-input" type="text" />
        <button className="btn editor-btn fetch-slides-btn">
          Fetch Slides
        </button>
        <div className="editor-presentation-preview"></div>
      </div>
      <div className="form-field transcript-editor">
        <label>Transcript &nbsp;<small>(Auto Save Active)</small></label>
        <div className="textarea" id="transcript-editor" contentEditable="true"></div>
      </div>
      <div className="form-field">
        <label htmlFor="talk-title">Title</label>
        <input autoComplete="off" type="text" id="talk-title" required/>
        <span id="talk-url-display"></span>
      </div>
      <div className="form-field">
        <label htmlFor="event-name">Event Name</label>
        <input type="text" id="event-name" required/>
      </div>
      <div className="character-edit">
        <div className="character-form">
          <h2>Character Config</h2>
          <div className="form-field">
            <label htmlFor="hairstyle">Character Hair Style</label>
            <select id="hairstyle" required>
              <option defaultValue="long">Long</option>
              <option value="short">Short</option>
            </select>
          </div>
          <div className="flex">
            <div className="flex-1 form-field">
              <label htmlFor="hair-color">Hair Color</label>
              <input type="color" id="hair-color" required />
            </div>
            <div className="flex-1 form-field">
              <label htmlFor="skin-color">Skin Color</label>
              <input type="color" id="skin-color" required />
            </div>
            <div className="flex-1 form-field">
              <label htmlFor="tshirt-color">TShirt Color</label>
              <input type="color" id="tshirt-color" required />
            </div>
          </div>
        </div>
        <div className="character-preview">
          <Character characterStyles={defaultUser.character} />
        </div>
      </div>
      <div className="form-field">
        {/* <button className="btn editor-btn download-transcript-button">Download Transcript.md</button>&nbsp; &nbsp; */}
        <button onClick={openTalk} className="btn editor-btn show-talk-button-2">Preview</button>&nbsp; &nbsp;
        <button className="btn editor-btn download-transcript-button">Publish</button>
      </div>
    </div>
    <style jsx global>{`
    .character-container{
      position: absolute !important;
      top: -120px !important;
      z-index: 0;
    }
    `}</style>
    </Fragment>
  )
}