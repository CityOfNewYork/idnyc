require('dotenv').config()
const buildEnv = require('nyc-build-helper/build')
const build = buildEnv.getEnv(__dirname)

const replaceOptions = []
replaceOptions.push({
  dir: 'dist/js',
  files: ['idnyc.js'],
  rules: [{
    search: /app_token\=/,
    replace: `app_token=${process.env.SOCRATA_APP_TOKEN}`
  }]
})

let openDataSrc
if (build.NODE_ENV == 'dev' || build.NODE_ENV == 'stg' || !build.NODE_ENV) {
  openDataSrc = process.env.OPEN_DATA_STG
} else if (build.NODE_ENV == 'prd') {
  openDataSrc = process.env.OPEN_DATA_PRD
}

replaceOptions.push({
  dir: 'dist/js',
  files: ['idnyc.js'],
  rules: [{
    search: /api\/views\//,
    replace: `api/views/${openDataSrc}`
  }]
})

const configObj = require('nyc-build-helper').config.defaultWebpackConfig(
  __dirname, {replaceOptions}
)

module.exports = configObj