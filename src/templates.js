export const talk = /* html */`

<div class="presentation-container" style="position: relative;">
    <div style="position: absolute; top: 10px; left: 10px; color: #999;width: 30%; text-align: center;">
        <div style="font-weight: bold;font-size: 14pt;margin:10px 0px"><small>🌠</small> VisConf <small>🌠</small></div>
        <a style="color: #777; text-decoration: none" target="_blank" rel="noopner" href="http://paypal.me/saurabhdaware99">Become a Sponsor&nbsp;<span class="material-icons" style="position:relative;top: 3px;font-size: 13pt;">favorite_border</span></a>
    </div>
    <div class="slides-display-container"><span style="color:#fff;margin:15px;position: absolute; bottom: 0;display:inline-block"><b>NO SIGNAL</b> <br/>Attempting to Connect...</span></div>
    <a href="https://github.com/saurabhdaware/visconf" target="_blank" class="github-corner" aria-label="View source on GitHub">
        <svg width="50" height="50" viewBox="0 0 250 250" style="fill:#aaa; color:#151513; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg>
    </a>
    </div>
    <div class="stage-container">
    <div class="character-container hide">
        <span class="myhead"></span>
        <span class="myhair"></span>
        <span class="mybody"></span>
        <span class="hands mylhand"></span>
        <span class="hands myrhand"></span>
        <span class="legs mylleg"></span>
        <span class="legs myrleg"></span>
    </div>
    <div class="current-text">...</div>
    <div class="stage-platform"></div>
    <div class="stage-front"></div>
    <div class="laptop">
        🥑
    </div>
    <div class="mic one"></div>
    <div class="mic two"></div>
    <div class="mike-holder">VisConf</div>
    </div>
    <div class="index-overlay">
    <div class="presentation-controls">
        <button title="skip previous" class="control skip-previous"><i class="material-icons">skip_previous</i></button>
        <button class="control start" title="start presentation"><i class="material-icons">play_arrow</i></button>
        <button class="control pause" title="pause presentation"><i class="material-icons">pause</i></button>
        <button title="skip next" class="control skip-next"><i class="material-icons">skip_next</i></button>
        <span class="screen-size" style="float: right">
            <button title="turn to fullscreen" class="control fullscreen"><i class="material-icons">fullscreen</i></button s>
            <button title="fullscreen exit" class="control fullscreen-exit" style="display:none;"><i class="material-icons">fullscreen_exit</i></button s>
        </span>

        <button style="float: right" title="toggle captions" class="control captions"><i class="material-icons">closed_caption</i></button s>
        <span class="volume playing" style="float: right">
            <button title="mute volume" class="control mute"><i class="material-icons">volume_up</i></button>
            <button title="turn on volume" class="control volumeon"><i class="material-icons">volume_off</i></button>
        </span>
        <a style="float: right" title="Create talk button" class="create-talk-button" href="https://visconf.netlify.com/editor"  class="control"> <b>+</b> &nbsp;Create your talk</a>
        <div class="presentation-video-bar">
            <div class="progress-meter">
                <div class="progress"></div>
            </div>
        </div>
    </div>
    </div>

    <!-- FIxed -->


    <div class="orientation-error">
    VisConf is best viewed in landscape! <br/> Please click the button below or rotate your screen to view the talk 🌻 <br/>
    <br/><button id="rotate-screen-button"><i class="material-icons">screen_rotation</i> <span style="position:relative;top:-9px;left: 6px;font-size: 15pt;font-weight: bold;">Rotate</span></button>
    </div>
`;

export const editor = /* html */ `
<div class="editor-component">
    <div style="color: #999;padding: 10px 0px;">
        Hey there! Here you can edit and test your transcript and slides. <br>Once you're ready with your slides and transcript, you can follow <a style="color: #09f9;" href="#create-talk-steps">steps given below to create your talk</a>.
    </div>
    <div class="form-field">
        
        <label>Slides (PDF) URL <small style="color: #555">(<a target="_blank" rel="noopener" style="color: #09f9;" href="https://smallpdf.com/ppt-to-pdf">Convert your PPT to PDF file</a> and upload it to a CDN like <a target="_blank" rel="noopener" style="color: #09f9;" href="https://cloudinary.com">cloudinary</a> (even GitHub works))</small></label>
        <input id="slides-input" type="text" />
        <button class="btn editor-btn fetch-slides-btn">
            Fetch Slides
        </button>
        <div class="editor-presentation-preview">

        </div>
    </div>
    <div class="form-field transcript-editor">
        <label>Transcript &nbsp;<small style="color: #555">(Auto Save Active)</small></label>
        <div class="textarea" id="transcript-editor" contenteditable="true"></div>
    </div>
    <div class="form-field">
        <button class="btn editor-btn download-transcript-button">Download Transcript.md</button>&nbsp; &nbsp;
        <button class="btn editor-btn show-talk-button-2">Preview</button>
    </div>
    <div class="form-field" id="create-talk-steps">
        <h2>How to create talk</h2>
        <ol>
            <li>Test your transcript and slides on this page</li>
            <li>Download Transcript.md</li>
            <li>Upload Transcript.md to a CDN like cloudinary or Github Repository</li>
            <li>Visit <a style="color: #09f;" href="create">Create</a> page and paste links there</li>
        </ol>
    </div>
</div>
`