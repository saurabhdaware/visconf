import './create.html';
import '../../public/styles/main.css';
import './create.css';


const loginButton = document.querySelector('.netlify-login-button');
const logoutButton = document.querySelector('.netlify-logout-button');
const userNameEl = document.querySelector('.login-username');




// Get the current user:
// const currentUser = netlifyIdentity.currentUser();
// if(!currentUser) logoutHandler();
// console.log(currentUser);

function getUsername(u) {
    if(!u) return;
    let username = u.user_metadata.full_name.replace(/ /g, '').toLowerCase();
    return username;
}


function loginHandler(user) {
    loginButton.style.display = 'none';
    logoutButton.style.display = 'inline-block';
    userNameEl.innerHTML = `Logged in as ${user.email}`;
    console.log(getUsername(user));
    netlifyIdentity.close();

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

netlifyIdentity.on('init', user => {
    if(!user) {
        logoutHandler();
        return;
    }

    loginHandler(user);
});


netlifyIdentity.on('login', loginHandler);


netlifyIdentity.on('logout', logoutHandler);
netlifyIdentity.on('error', err => console.error('Error', err));

netlifyIdentity.on('open', () => {
    console.log("Widget opened")
});
netlifyIdentity.on('close', () => console.log('Widget closed'));
