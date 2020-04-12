
import store from '../lib/store.js'
import router from '../lib/router.js'


var repo

var onkey = (e) => {
  if (e.keyCode === 13) {
    change(e)
    add()
  }
}

var change = (e) => {
  repo = e.target.value
}

var add = () => {
  if (!repo) {
    return
  }
  if (store.repos.indexOf(repo) !== -1) {
    store.message = 'Repository already added!'
    return
  }
  var url = `${location.pathname}?r=${store.repos.concat(repo).join('&r=')}`
  history.pushState(null, null, url)
  router()
}

var _export = (e) => {
  if (!store.repos.length) {
    store.message = 'No data to export!'
    return false
  }
  e.target.download = 'github-stars-stats.json'
  e.target.href =
    `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify({
      repos: store.repos,
      http: store.http,
      svg: store.svg,
      stats: store.stats,
    }))}`
}

export default () =>
  m('.form',
    m('input[type=text][placeholder=user/repo]', {
      onchange: change,
      onkeyup: onkey,
    }),
    m('button', {onclick: add}, 'add'),
    m('a', {onclick: _export}, 'export'),
  )
