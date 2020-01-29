const { storeTalk, getTalk, getUsername } = require('./services/talks');

const routes = {
    '/routes/store-talk': storeTalk,
    '/routes/get-username': getUsername,
    '/routes/get-talk': getTalk
}


exports.handler = async (event, context) => {
    const re = routes[event.path];
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