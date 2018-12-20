
import store from './store.js'

import header from '../templates/header.js'
import form from '../templates/form.js'
import plot from '../templates/plot.js'
import stats from '../templates/stats.js'


var timeout = null
var debounce = (render) => {
  clearTimeout(timeout)
  timeout = setTimeout(render, 0)
}

var render = () => {
  preact.render(
    m('#view',
      header(),
      form(),
      plot(),
      stats(),
    ),
    document.querySelector('#stars'),
    document.querySelector('#view'),
  )
  if (document.querySelector('#plot')) {
    var repos = store.repos
      .filter((repo) => store.svg[repo])
      .map((repo) => store.svg[repo])
    repos.length
      ? Plotly.react(document.querySelector('#plot'), repos, {margin: {t: 20}})
      : Plotly.purge(document.querySelector('#plot'))
  }
}

export default () => debounce(render)
