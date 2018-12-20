
var {terser} = require('rollup-plugin-terser')


export default {

  context: 'window',
  moduleContext: {id: 'window'},

  plugins: [terser()],

  output: {
    format: 'iife',
    name: 'stars',
  },
}
