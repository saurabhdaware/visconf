import { Fragment } from "react";

export function EditorForm() {
  return (
    <Fragment>
    <div className="editor-component">
      <div className="form-field">
          <label>Slides (PDF) URL <small>(<a target="_blank" rel="noopener" href="https://smallpdf.com/ppt-to-pdf">Convert your PPT to PDF file</a> and upload it to a CDN like <a target="_blank" rel="noopener" href="https://cloudinary.com">cloudinary</a> (even GitHub works))</small></label>
          <input id="slides-input" type="text" />
          <button className="btn editor-btn fetch-slides-btn">
              Fetch Slides
          </button>
          <div className="editor-presentation-preview">

          </div>
      </div>
      <div className="form-field transcript-editor">
          <label>Transcript &nbsp;<small>(Auto Save Active)</small></label>
          <div className="textarea" id="transcript-editor" contentEditable="true"></div>
      </div>
      <div className="form-field">
          <button className="btn editor-btn download-transcript-button">Download Transcript.md</button>&nbsp; &nbsp;
          <button className="btn editor-btn show-talk-button-2">Preview</button>
      </div>
    </div>
    </Fragment>
  )
}