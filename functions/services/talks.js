const { headers } = require('../config');
const fauny = require('../helpers/fauny');

function send(code, data) {
    return {
        statusCode: code,
        headers,
        body: JSON.stringify(data)
    }
}

async function getTalk(event, context) {
    if(event.httpMethod !== 'GET') {
        return send(200, { success: false, message: 'Method Not Allowed' })
    }
    const { username, slug } = event.queryStringParameters;

    return fauny.read('talks_by_username_and_slug', [username, slug])
        .then(res => {
            return send(200, {success: true, message: res.data});
        })

}

async function storeTalk(event, context) {
    if(event.httpMethod !== 'POST') {
        return send(200, { success: false, message: 'Method Not Allowed' })
    }
    
    const { user } = context.clientContext;
    if(!user) {
        return send(405, {success: false, message: 'UnAuthorized'});
    }

    const body = JSON.parse(event.body);

    if(user.sub !== body.uid){
        return send(405, {success: false, message: 'UnAuthorized'});
    }

    return fauny.create('talks', body)
        .then(() => {
            return send(200, {success: true, message: `https://visconf.netlify.com/${body.username}/${body.slug}`});
        })
}

/*
crateUsername():
Check if the username exists
if exists:
    tweak username
    create username
else
    create username
*/

async function createUsername(event, context) {
    if(event.httpMethod !== 'POST') {
        return send(200, { success: false, message: 'Method Not Allowed' })
    }
    let newUsername;
    const { user } = context.clientContext;
    const username = user.user_metadata.full_name.replace(/ /g, '').toLowerCase();
    return fauny.read('users_by_username', username)
        .then(() => {
            newUsername = username + String(new Date().getTime()).slice(-5);
            return fauny.create('users', {username: newUsername, uid: user.sub})
        })
        .then(() => {
            return send(200, {success: true, username: newUsername})
        })
        .catch(err => {
            if(err.name === 'NotFound') {
                return fauny.create('users', {username, uid: user.sub})
                    .then(() => {
                        return send(200, {success: true, username})
                    })
            }
        })

    
}


async function getUsername(event, context) {
    if(event.httpMethod !== 'POST') {
        return send(200, { success: false, message: 'Method Not Allowed' })
    }

    const { user } = context.clientContext;
    if(!user) return send(405, {success: false, message: "Unauthorized Access, Invalid User"});

    return fauny.read('users_by_uid', user.sub)
        .then(res => {
            return res.data.username;
        })
        .then(username => {
            return send(200, {success: true, username})
        })
        .catch(err => {
            if(err.name === 'NotFound') {
                return createUsername(event, context);
            }
        })
}

module.exports = {
    storeTalk,
    getTalk,
    getUsername
}