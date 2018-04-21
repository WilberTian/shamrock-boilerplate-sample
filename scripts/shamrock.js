
if (!global._babelPolyfill) {
    require('babel-polyfill');
}

require('babel-register');
module.exports = require('./shamrock/index').default;
