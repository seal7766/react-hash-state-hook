
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-hash-state-hook.cjs.production.min.js')
} else {
  module.exports = require('./react-hash-state-hook.cjs.development.js')
}
