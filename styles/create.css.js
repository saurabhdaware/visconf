import css from 'styled-jsx/css';
export default css.global/* css */`
.show-talk-button, .show-editor-button{
  background-color: #f9f9f9 !important;
  color: #555 !important;
  border-right: 3px solid #eee !important;
}

.editor-main{
  padding: 30px 60px;
}
.editor-component{
  background-color: #f9f9f9;
  color: #333;
  padding: 40px 100px;
  box-shadow:         3px 10px 16px #0006; 
}
.form-field{
  margin:20px 0px;
}
.form-field > input[type="text"], .form-field > .textarea, .form-field select{
  display: block;
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Oswald', arial;
  font-size: 11pt;
  background-color: #fff;
  border: 1px solid #ddd;
  outline: none;
  font-size: 13pt;
  color:#555;
}

.form-field > .textarea{
  height: 350px;
  overflow-y: scroll;
  outline: none;
}
.show-talk-button, .show-editor-button{
  margin-bottom: 0px !important;
  font-size: 12pt;
  outline: none;
}
a{
  text-decoration: none;
}
button.editor-btn, a.editor-btn{
  border:none;
  padding: 10px 30px; 
  margin: 10px 0px;
  background-color: #444; 
  color: #ddd;
  cursor: pointer;
  font-weight: bold;
  font-size: 11pt;
}

div.editor-presentation-preview{
  overflow-x: scroll;
  white-space: nowrap;
}
div.editor-slide{
  display: inline-block;
  margin-right: 15px;
}


.flex{
  display: flex;
}

.flex-1{
  flex:1;
}

.character-edit{
  display: flex;
}
.character-form{
  flex: 1;
}
.character-preview{
  position: relative;
  top: 130px;
  width: 200px;
}
.form-field input[type="color"] {
  display: block;
  width: 60px;
  height: 30px;
  padding: 0px;
  background-color: transparent;
  border:none;
  cursor: pointer;
}
.form-field select{
  width: 90%;
}
@media (max-width: 768px) {
  .character-edit{
    display: block;
  }
  .form-field select{
    width: 100%;
  }
  .character-preview{
    min-height: 300px;
  }
  .editor-main{
    padding: 10px 10px;
  }
}

@media (max-width: 768px) {
  .editor-component{
      padding: 30px 20px;
  }
}
`