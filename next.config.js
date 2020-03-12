const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const configs = {
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        defaultLoaders.babel,
        {
          loader: require('styled-jsx/webpack').loader,
          options: {
            type: 'scoped'
          }
        }
      ]
    })

    return config
  }
}

const commonEnv = {

}

const devEnv = {
  ...commonEnv,
  ENDPOINT: 'http://localhost:3000/api',
  GOOGLE_CLIENT_ID: '72230708921-tok970hvvv0t7k21u94ec8pvfahlvfvl.apps.googleusercontent.com'
}

const prodEnv = {
  ...commonEnv,
  ENDPOINT: 'https://visconf.now.sh/api',
  GOOGLE_CLIENT_ID: '72230708921-vh8fs49a0g1m26bf6kkfn43ke4a6ro90.apps.googleusercontent.com' // This key won't work in your domain so make sure you change the key with your project's client id to test
}


console.log("\n🌻 🌻 🌻 🌻 🌻 🌻\n");


module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {...configs, env: devEnv}
  }

  return {...configs, env: prodEnv}
}