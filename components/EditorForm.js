import { Fragment, useEffect } from "react";
import { setLocalStorageValue } from '../scripts/helpers';
import Character from '../components/Character';


let autoSaveTimeout;
function handleAutoSave(whatToSave = 'transcript') {
  if(autoSaveTimeout) clearTimeout(autoSaveTimeout);
  autoSaveTimeout = setTimeout(() => {
    if(whatToSave === 'transcript') {
      setLocalStorageValue({transcriptText: document.querySelector('#transcript-editor').innerText})
    }else{
      const objToStore = {
        eventName: document.querySelector('#event-name').value,
        talkTitle: document.querySelector('#talk-title').value
      }
      setLocalStorageValue(objToStore);
    }
  }, 800)
}

function publish() {
  console.log("Lets publish!!");
}


export function EditorForm({openTalk, userData, setUserData}) {

  useEffect(() => {
    document.querySelector('#transcript-editor').addEventListener('input', e => handleAutoSave('transcript'));
    document.querySelector('#talk-title').addEventListener('input', e => handleAutoSave('talktitle'));
  }, []);

  
  const changeCharacterStylesHandler = e => {
    const eventNameInput = document.querySelector('#event-name');

    const newUserChanges = {
      ...userData,
      eventName: eventNameInput.value,
      character: {
        ...userData.character,
        "hairStyle": document.querySelector('#hairstyle').value,
        "hairColor": document.querySelector('#hair-color').value,
        "skinColor": document.querySelector('#skin-color').value,
        "tshirtColor": document.querySelector('#tshirt-color').value
      }
    }

    setLocalStorageValue(newUserChanges)
    setUserData(newUserChanges)

    document.querySelector('.mike-holder').innerHTML = eventNameInput.value;
  }


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
        <input onChange={changeCharacterStylesHandler} type="text" id="event-name" required/>
      </div>
      <div className="character-edit">
        <div className="character-form">
          <h2>Character Config</h2>
          <div className="form-field">
            <label htmlFor="hairstyle">Character Hair Style</label>
            <select onChange={changeCharacterStylesHandler} id="hairstyle" required>
              <option defaultValue="long" value="long">Long</option>
              <option value="short">Short</option>
            </select>
          </div>
          <div className="flex">
            <div className="flex-1 form-field">
              <label htmlFor="hair-color">Hair Color</label>
              <input onInput={changeCharacterStylesHandler} type="color" id="hair-color" required />
            </div>
            <div className="flex-1 form-field">
              <label htmlFor="skin-color">Skin Color</label>
              <input onInput={changeCharacterStylesHandler} type="color" id="skin-color" required />
            </div>
            <div className="flex-1 form-field">
              <label htmlFor="tshirt-color">TShirt Color</label>
              <input onInput={changeCharacterStylesHandler} type="color" id="tshirt-color" required />
            </div>
          </div>
        </div>
        <div className="character-preview">
          <Character characterStyles={userData.character} />
        </div>
      </div>
      <div className="form-field">
        {/* <button className="btn editor-btn download-transcript-button">Download Transcript.md</button>&nbsp; &nbsp; */}
        <button onClick={openTalk} className="btn editor-btn show-talk-button-2">Preview</button>&nbsp; &nbsp;
        <button onClick={publish} className="btn editor-btn download-transcript-button">Publish</button>
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