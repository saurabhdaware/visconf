const { client, q, headers } = require('../config');
const fauny = require('../helpers/fauny');

//
// {
//     "w3434324": "saurabhdaware",
//     "t43545": "venkatesh"
// }

// {
//     "saurabhdaware": {
//         "my-talk": {
//             "transcriptLink": ''
//         }
//     }
// }
function send(code, data) {
    return {
        statusCode: code,
        headers,
        body: JSON.stringify(data)
    }
}

async function storeTalk(event, context) {
    return send(200, {success: true})
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
    getUsername
}