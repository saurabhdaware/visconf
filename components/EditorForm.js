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
function saveForm() {
  const finalData = {
    talkTitle: document.querySelector('#talk-title').value,
    slug: document.querySelector('#talk-title').value.replace(/ /g, '-').toLowerCase(),
    transcriptText: document.querySelector('#transcript-editor').innerText,
    slidePdfLink: document.querySelector('#slides-input').value,
    eventName: document.querySelector('#event-name').value,
    character: {
      hairStyle: document.querySelector('#hairstyle').value,
      hairColor: document.querySelector('#hair-color').value,
      skinColor: document.querySelector('#skin-color').value,
      tshirtColor: document.querySelector('#tshirt-color').value    
    },
    voice: {
      name: 'UK English Female'
    }
  }
  setLocalStorageValue(finalData);
}

async function publish(user) {
  const finalData = {
    talkTitle: document.querySelector('#talk-title').value,
    slug: document.querySelector('#talk-title').value.replace(/ /g, '-').toLowerCase(),
    transcriptText: document.querySelector('#transcript-editor').innerText,
    slidePdfLink: document.querySelector('#slides-input').value,
    eventName: document.querySelector('#event-name').value,
    character: {
      hairStyle: document.querySelector('#hairstyle').value,
      hairColor: document.querySelector('#hair-color').value,
      skinColor: document.querySelector('#skin-color').value,
      tshirtColor: document.querySelector('#tshirt-color').value    
    },
    voice: {
      name: 'UK English Female'
    }
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token 
    },
    body: JSON.stringify(finalData)
  }

  const res = await ((await fetch(`${process.env.ENDPOINT}/submit-talk`, options)).json());
  if(res.success === true) {
    window.location.href = res.data.path;
  }
}


export function EditorForm({openTalk, userData, user, setUserData}) {

  useEffect(() => {
    document.querySelector('#transcript-editor').addEventListener('input', e => handleAutoSave('transcript'));
    document.querySelector('#talk-title').addEventListener('input', e => handleAutoSave('talktitle'));

    return saveForm;
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
        <label>Transcript</label>
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
      <div className="form-field form-submit">
        {/* <button className="btn editor-btn download-transcript-button">Download Transcript.md</button>&nbsp; &nbsp; */}
        <button onClick={openTalk} className="btn editor-btn">Preview</button>&nbsp; &nbsp;
        <button onClick={saveForm} className="btn editor-btn">Save Draft</button>&nbsp; &nbsp;
        {
          user.username
          ? <button onClick={e => publish(user)} className="btn editor-btn" style={{backgroundColor: '#09f', color: '#fff'}}>Publish</button>
          : <span>
              <button className="btn editor-btn download-transcript-button" style={{opacity: .4}}>Publish</button>
              <br/> <span style={{color: '#f30'}}>Login to publish talk</span>
            </span>
        }
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