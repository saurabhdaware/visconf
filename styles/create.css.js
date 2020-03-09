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
.form-field > input[type="text"], .form-field > .textarea{
  display: block;
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
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

@media (max-width: 768px) {
  .editor-component{
      padding: 30px 20px;
  }
}
`