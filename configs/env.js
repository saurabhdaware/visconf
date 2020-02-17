let functionsEndpoint = (process.env.NODE_ENV === 'production') ? 'https://visconf.netlify.com/.netlify/functions/routes' : 'http://localhost:34567/routes'

module.exports = {
    functionsEndpoint
}