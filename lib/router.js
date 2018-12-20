
import store from './store.js'
import request from './request.js'
import stats from './stats.js'


var stars = {abort: false, job: null}

export default async () => {

  if (stars.job) {
    stars.abort = true
    await stars.job
  }

  var qs = new URLSearchParams(location.search)

  var token = qs.get('access_token')
  if (token) {
    store.token = token
    location.href = store.redirect
    store.redirect = ''
    return
  }

  var repos = qs.getAll('r')
  repos = repos.filter((repo, index) => repos.indexOf(repo) === index)
  store.repos = repos

  document.title = repos.length
    ? repos.join(' + ')
    : 'GitHub Star History and Stats'

  store.message = ''

  if (repos.length) {
    stars.job = sequential(repos)
  }
}

var sequential = (repos) => new Promise(async (resolve) => {
  for (var repo of repos.filter((repo) => !store.http[repo])) {
    try {
      var data = []
      for await (var json of request.stars({repo})) {
        if (stars.abort) {
          throw 'abort'
        }
        data = data.concat(json)
      }
      store.http[repo] = data
      store.svg[repo] = stats.svg(data, repo)
      store.stats[repo] =
        store.stats[repo] !== false && stats.meta(store.svg[repo])
    }
    catch (error) {
      if (error === 'abort') {
        break
      }
      else if (error === 403) {
        store.message = 'API rate limit exceeded!' +
          (!store.token ? ' Log in to increase rate limit.' : '')
      }
      else if (error === 404) {
        store.message = 'Repository not found!'
        store.repos = store.repos.filter((r) => r !== repo)
        var url = location.pathname +
          (store.repos.length ? `?r=${store.repos.join('&r=')}` : '')
        history.pushState(null, null, url)
      }
      else {
        throw error
      }
    }
  }
  resolve()
  stars = {abort: false, job: null}
})
