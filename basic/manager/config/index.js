const process = require('process')

let mode = process.argv[2] === '--dev' ? 'dev' : 'prod'

module.exports = {
  mode,
  ...(mode === 'dev' ? require('./config.dev') : require('./config.prod')),
}
