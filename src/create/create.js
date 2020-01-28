import './create.html';
import '../../public/styles/main.css';
import './create.css';

const env = require('../../configs/env');

const loginButton = document.querySelector('.netlify-login-button');
const logoutButton = document.querySelector('.netlify-logout-button');
const userNameEl = document.querySelector('.login-username');
let currentUser;

// Get the current user:
// const currentUser = netlifyIdentity.currentUser();
// if(!currentUser) logoutHandler();
// console.log(currentUser);
function getAuthHeader() {
    const header = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + currentUser.token.access_token
    }

    return header;
}

function getUsername(u) {
    if(!u) return;
    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: getAuthHeader(),
        body: JSON.stringify({}) // body data type must match "Content-Type" header
    }


    fetch(`${env.functionsEndpoint}/get-username`, options)
        .then(res => res.json())
        .then(res => console.log(res));
}

function loginHandler(user) {
    currentUser = user;
    loginButton.style.display = 'none';
    logoutButton.style.display = 'inline-block';
    userNameEl.innerHTML = `Logged in as ${user.email}`;
    netlifyIdentity.close();
    getUsername(user);

}

function logoutHandler() {
    loginButton.style.display = 'inline-block';
    logoutButton.style.display = 'none';
    userNameEl.innerHTML = '';
}

// Bind to events

loginButton.addEventListener('click', () => {
    netlifyIdentity.open();
})

logoutButton.addEventListener('click', () => {
    netlifyIdentity.logout();
})

document.querySelector('.create-btn').addEventListener('click', () => {
    if(!currentUser) return;

    const data = {
        transcriptLink: 'dfshadsa'
    }

    const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: getAuthHeader(),
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }

    console.log(options);

    fetch(`${env.functionsEndpoint}/store-talk`, options)
        .then(data => data.json())
        .then(res => console.log(res));
})


//

netlifyIdentity.on('init', user => {
    if(!user) {
        logoutHandler();
        return;
    }
    console.count("init");
});


netlifyIdentity.on('login', loginHandler);


netlifyIdentity.on('logout', logoutHandler);
netlifyIdentity.on('error', err => console.error('Error', err));

netlifyIdentity.on('open', () => {
    console.log("Widget opened")
});
netlifyIdentity.on('close', () => console.log('Widget closed'));
