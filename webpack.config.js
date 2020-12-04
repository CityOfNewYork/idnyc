require('dotenv').config()
const buildEnv = require('nyc-build-helper/build')
const build = buildEnv.getEnv(__dirname)

const replaceOptions = [{
  dir: 'dist/js',
  files: ['idnyc.js'],
  rules: [{
    search: /app_token\=/,
    replace: `app_token=${process.env.SOCRATA_APP_TOKEN}`
  }]
}]

const configObj = require('nyc-build-helper').config.defaultWebpackConfig(
  __dirname, {replaceOptions}
)

module.exports = configObj