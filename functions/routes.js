const { storeTalk, getTalk, getUsername } = require('./services/talks');

const routes = {
    '/routes/store-talk': storeTalk,
    '/routes/get-username': getUsername,
    '/routes/get-talk': getTalk
}


exports.handler = async (event, context) => {
    // Sorry god of good practices :(
    const re = Object.values(routes)[Object.keys(routes).findIndex(route => event.path.endsWith(route))];

    if(!re){
        return {
            statusCode: 404,
            body: JSON.stringify({
                success: false,
                message: 'Function not found'
            })
        }
    }

    return re(event, context);
}