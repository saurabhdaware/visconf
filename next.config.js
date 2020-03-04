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

const devConfigs = {
  env: {
    endpoint: 'http://localhost:3000/api'
  }
}

const prodConfigs = {
  env: {
    endpoint: 'https://visconf.now.sh/api'
  }
}

console.log("\n🌻 🌻 🌻 🌻 🌻 🌻\n");


module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {...configs, ...devConfigs}
  }

  return {...configs, ...prodConfigs}
}