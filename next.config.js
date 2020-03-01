const withCSS = require('@zeit/next-css')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const devConfigs = {
  env: {
    endpoint: 'http://localhost:3000/api'
  }
}

const prodConfigs = {
  env: {
    endpoint: 'https://visconf.netlify.com/.netlify/functions/routes'
  }
}

console.log("\n🌻 🌻 🌻 🌻 🌻 🌻\n");


module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return withCSS(devConfigs)
  }

  return withCSS(prodConfigs)
}