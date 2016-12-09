var keys = require('dotenv').config();
var merge = require('webpack-merge');

module.exports = merge(keys, {
  NODE_ENV: 'production',
});
