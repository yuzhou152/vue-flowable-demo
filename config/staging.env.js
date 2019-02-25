'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./staging.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"staging"',
  type: process.env.type
})
