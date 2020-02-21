const withCSS = require('@zeit/next-css')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const devConfigs = {
  env: {
    endpoint: 'http://localhost:34567/routes'
  }
}

const prodConfigs = {
  env: {
    endpoint: 'https://visconf.netlify.com/functions/routes'
  }
}

console.log("\n🌻 🌻 🌻 🌻 🌻 🌻\n");


module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return withCSS(devConfigs)
  }

  return withCSS(prodConfigs)
}