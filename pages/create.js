import Nav from '../components/Nav';
import Meta from '../components/Meta';
import { Fragment, useState, useEffect } from 'react';
import { EditorForm } from '../components/EditorForm';
import styles from '../styles/create.css';
import Talk from '../components/Talk';
import { 
  defaultUser,
  setLocalStorageValue,
  getLocalStorageData, 
  defaultTranscriptText, 
  isURL 
} from '../scripts/helpers';
import slides from '../scripts/slides';


// Slides Helpers
function applyEditorSlides() {
  let slidesInput = document.querySelector('#slides-input');
  if(!slidesInput) return;
  setLocalStorageValue({slidePdfLink: slidesInput.value});

  if(slidesInput.value && isURL(slidesInput.value) && slidesInput.value.includes('.pdf')){
    fetchEditorSlides();
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

function fillFormValues(formData) {
  if(!formData.transcriptText) return;
  if(!document.querySelector('#transcript-editor')) return;
  document.querySelector('#transcript-editor').innerHTML = prettifyTranscript(formData.transcriptText);
  document.querySelector('#hairstyle').value = formData.character.hairStyle;
  document.querySelector('#event-name').value = formData.eventName;
  document.querySelector('#talk-title').value = formData.talkTitle;
  document.querySelector('#hair-color').value = formData.character.hairColor;
  document.querySelector('#skin-color').value = formData.character.skinColor;
  document.querySelector('#tshirt-color').value = formData.character.tshirtColor;
  document.querySelector('#slides-input').value = formData.slidePdfLink;
}

/*** 
 * TODO:
 * - /create?talk=visconf-intro to edit the existing talk!
 * HOW?
 * - read queryParams and send title name to editForm
 * - in EditForm, add the talk slug as key in setLocalStorage's second paramter
*/
export default function Create({login, logout, user, isLoggedIn}) {
  const authObject = {login, logout, user, isLoggedIn};
  const [isEditorShown, setIsEditorShown] = useState(true);
  const [userData, setUserData] = useState(defaultUser);


  const initFormData = () => {
    const locallyStoredData = getLocalStorageData();
    const dataToFill = {
      transcriptText: locallyStoredData.transcriptText || defaultTranscriptText,
      talkTitle: locallyStoredData.talkTitle || '',
      eventName: locallyStoredData.eventName || 'VisConf',
      slidePdfLink: locallyStoredData.slidePdfLink || defaultUser.slidePdfLink,
      character: locallyStoredData.character || defaultUser.character
    };


    fillFormValues(dataToFill);
    setUserData({
      ...userData, 
      ...dataToFill
    })

    applyEditorSlides();
    document.querySelector('.editor-component .mike-holder').innerHTML = dataToFill.eventName;
  }


  useEffect(() => {
    if(isEditorShown) {
      document.querySelector('.show-editor-button').style.opacity = 1;
      document.querySelector('.show-talk-button').style.opacity = .7;
      document.querySelector('.editor-component .fetch-slides-btn').addEventListener('click', applyEditorSlides);
      initFormData();
    }else {
      document.querySelector('.show-editor-button').style.opacity = .7;
      document.querySelector('.show-talk-button').style.opacity = 1;
    }
  }, [isEditorShown])


  const openTalk = () => {
    setUserData({
      ...userData, 
      slidePdfLink: document.querySelector('#slides-input').value,
      transcriptText: document.querySelector('.textarea')?.innerText
    });
    setIsEditorShown(false);
  }

  return (
    <Fragment>
      <Meta/>
      {
        isEditorShown
        ? <Nav {...authObject}/>
        : null
      }
      <div className="create-content">
        <div className="editor-main">
          <div style={{position: 'relative', zIndex:'99999'}}>
            <button onClick={e => setIsEditorShown(true)} className="btn editor-btn show-editor-button">Editor</button>
            <button onClick={openTalk} className="btn editor-btn show-talk-button">Preview</button>
          </div>
          {
            isEditorShown
            ? <EditorForm 
                {...authObject}
                openTalk={openTalk}
                userData={userData} 
                setUserData={setUserData}
              />
            : <Talk fetchedData={userData} />
          }
        </div>
      </div>
      <style jsx global>{styles}</style>
    </Fragment>
  );
}