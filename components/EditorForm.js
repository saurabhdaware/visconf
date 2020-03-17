import { Fragment, useEffect } from "react";
import { setLocalStorageValue } from '../scripts/helpers';
import Character from '../components/Character';
import slides from "../scripts/slides";

function getFinalData() {
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

  return finalData;
}

function saveForm(editKey=undefined) {
  const finalData = getFinalData();

  if(editKey !== undefined && editKey !== null && editKey !== 'undefined**undefined') {
    setLocalStorageValue(finalData, editKey);
  } else {
    setLocalStorageValue(finalData);
  }

  document.querySelector('#message').innerHTML = '<span>Draft Saved</span>';
  setTimeout(() => {
    if(document.querySelector('#message')) {
      document.querySelector('#message').innerHTML = ''
    }
  }, 3000);
}

async function updateTalk(user, editKey) {
  const [username, slug] = editKey.split('**');
  if(username !== user.username) {
    // Invalid user
    return;
  }

  const finalData = {...getFinalData(), oldTalkData: {username, slug}};

 // Creating new Talk
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token 
    },
    body: JSON.stringify(finalData)
  }

  document.querySelector('#message').innerHTML = 'Publishing...';

  const res = await ((await fetch(`${process.env.ENDPOINT}/update-talk`, options)).json());
  if(res.success === true) {
    localStorage.removeItem(editKey);
    window.location.href = `/${user.username}/${res.data.slug}`;
  }else{
    document.querySelector('#message').innerHTML = 'oops.. something went wrong';
  }

}

async function publish(user) {
  const finalData = getFinalData();

  // Creating new Talk
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token 
    },
    body: JSON.stringify(finalData)
  }

  document.querySelector('#message').innerHTML = 'Publishing...';

  const res = await ((await fetch(`${process.env.ENDPOINT}/submit-talk`, options)).json());
  if(res.success === true) {
    window.location.href = `/${user.username}/${res.data.slug}`;
  }
}

function fileSelectHandler(e) {
  const file = e.target.files[0];
  if(file.type !== 'application/pdf'){
    alert("Not valid PDF file. If you have PPT please use online tools to convert it to PDF and then upload");
    return;
  }
  const fileReader = new FileReader();
  fileReader.onload = function() {
    const typedArray = new Uint8Array(this.result);
    slides.loadPDF(typedArray)
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

        // Clear URL input
        document.querySelector('#slides-input').value = '';
      })
  }

  fileReader.readAsArrayBuffer(file);
}

export function EditorForm({openTalk, userData, user, setUserData, editKey=undefined}) {

  useEffect(() => {
    return () => saveForm(editKey);
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

    setUserData(newUserChanges)
    document.querySelector('.mike-holder').innerHTML = eventNameInput.value;
  }


  return (
    <Fragment>
    <div className="editor-component">
      <div className="form-field">
        <label htmlFor="slides-file-select">Slides (PDF) File input <small>(<a target="_blank" rel="noopener" href="https://smallpdf.com/ppt-to-pdf">Convert your PPT to PDF file</a> and upload)</small> </label>
        <br/><input onChange={fileSelectHandler} type="file" id="slides-file-select" />
        <br/><br/>or<br/><br/>
        <label htmlFor="slides-input">Slides (PDF) URL <small>(<a target="_blank" rel="noopener" href="https://smallpdf.com/ppt-to-pdf">Convert your PPT to PDF file</a> and upload it to a CDN like <a target="_blank" rel="noopener" href="https://cloudinary.com">cloudinary</a> (even GitHub works))</small></label>
        <input id="slides-input" type="text" />
        <button className="btn editor-btn fetch-slides-btn">
          Fetch Slides
        </button>
        <br/><br/><div className="editor-presentation-preview"></div>
      </div>
      <div className="form-field transcript-editor">
        <label>Transcript (Make sure to save form before you close)</label>
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
        <button onClick={e => saveForm(editKey)} className="btn editor-btn">Save Draft</button>&nbsp; &nbsp;
        {
          user.username
          ? 
            editKey !== undefined && editKey !== null && editKey !== 'undefined**undefined'
            // if editKey is defined then edit the talk
            ? <span>
                <button onClick={e => updateTalk(user, editKey)} className="btn editor-btn" style={{backgroundColor: '#09f', color: '#fff'}}>Republish</button>
              </span>
            : <span>
                <button onClick={e => publish(user)} className="btn editor-btn" style={{backgroundColor: '#09f', color: '#fff'}}>Publish</button>
              </span>
          : <span>
              <button className="btn editor-btn download-transcript-button" style={{opacity: .4}}>Publish</button>
              <br/> <span style={{color: '#f30'}}>Login to publish talk</span>
            </span>
        }
      </div>
      <div className="form-field">
        <div id="message"></div>
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