#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))

if (argv.help) {
  console.log('--location /path/to/render/location/')
  console.log('--env')
  process.exit()
}

if (!argv.env) {
  console.log('Specify environment')
  process.exit()
}

var fs = require('fs')
var path = require('path')
var render = require('preact-render-to-string')
var html = require('html')
preact = require('preact')
require('../lib/hyper')
var base = require('../templates/base')


fs.writeFileSync(
  argv.location || path.resolve(__dirname, '../index.html'),
  '<!DOCTYPE html>\n' + html.prettyPrint(
    render(base(m, require('./meta'), require('./path')[argv.env])
  ), {indent_size: 2}),
  'utf8'
)
