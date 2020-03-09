import Nav from '../components/Nav';
import Meta from '../components/Meta';
import { Fragment, useState } from 'react';
import { EditorForm } from '../components/EditorForm';
import styles from '../styles/create.css';
import Talk from '../components/Talk';
import { defaultUser } from '../scripts/helpers';

export default function Create({login, logout, user, isLoggedIn}) {
  const authObject = {login, logout, user, isLoggedIn};
  const [isEditorShown, setIsEditorShown] = useState(true);
  const [transcriptText, setTranscriptText] = useState('');


  const openTalk = () => {
    setTranscriptText(document.querySelector('.textarea')?.innerText);
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
            ? <EditorForm />
            : <Talk fetchedData={defaultUser} transcriptText={transcriptText}/>
          }
        </div>
      </div>
      <style jsx global>{styles}</style>
    </Fragment>
  );
}