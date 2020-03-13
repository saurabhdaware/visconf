import css from 'styled-jsx/css';

export default css.global/* css */`
.profile-container{
  position: relative;
  background-color: #efe13d;
  height: 200px;
}

.character-relative{
  position: relative;
  top: 200px;
  left: 140px;
  display: inline-block;
}
.mike-holder{
  background: #333 !important;
  color: #333 !important;
}
.character-container{
  position: absolute !important;
  z-index: 0;
}
.mike-holder{
  z-index: 1;
}

.profile-username{
  position: absolute;
  left: 300px;
  font-weight: bold;
  color: #222;
  top: 60px;
  display: inline-block;
}

.profile-username > h1{
  font-size: 30pt;
  margin-bottom: 5px;
}
.profile-username .logout-button{
  padding: 10px 30px;
  border: none;
  background-color: #333;
  color: #ddd;
  font-weight: bold;
  cursor: pointer;
}

.profile-talks-container{
  padding: 200px;
}

@media (max-width: 768px) {
  .profile-head{
    text-align:center;
  }
  .character-relative{
    top: 220px;
    left: 0px;
    transform: translateX(-80px);
    display: inline-block;
  }
  .profile-username{
    position: relative;
    display: block;
    left: 0px;
    padding: 25px 30px;
    top: 0px;
  }

  .profile-talks-container{
    padding: 200px 10px;
  }
}
`