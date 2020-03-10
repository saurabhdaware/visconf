import Nav from '../components/Nav';
import Meta from '../components/Meta';
import { Fragment, useState, useEffect } from 'react';
import { EditorForm } from '../components/EditorForm';
import styles from '../styles/create.css';
import Talk from '../components/Talk';
import { defaultUser } from '../scripts/helpers';

export default function Create({login, logout, user, isLoggedIn}) {
  const authObject = {login, logout, user, isLoggedIn};
  const [isEditorShown, setIsEditorShown] = useState(true);
  const [transcriptText, setTranscriptText] = useState('');
  const [userData, setUserData] = useState(defaultUser);

  useEffect(() => {
    if(isEditorShown) {
      document.querySelector('.show-editor-button').style.opacity = 1;
      document.querySelector('.show-talk-button').style.opacity = .7;
    }else {
      document.querySelector('.show-editor-button').style.opacity = .7;
      document.querySelector('.show-talk-button').style.opacity = 1;
    }
  }, [isEditorShown])


  const openTalk = () => {
    setTranscriptText(document.querySelector('.textarea')?.innerText);
    setUserData({...userData, slidePdfLink: document.querySelector('#slides-input').value});
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
            ? <EditorForm openTalk={openTalk} user={user} />
            : <Talk fetchedData={userData} transcriptText={transcriptText}/>
          }
        </div>
      </div>
      <style jsx global>{styles}</style>
    </Fragment>
  );
}