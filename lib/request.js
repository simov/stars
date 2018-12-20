
import store from './store.js'


var limit = () =>
  fetch('https://api.github.com/rate_limit', {
    method: 'HEAD',
    headers: JSON.parse(JSON.stringify({
      authorization: store.token && `Bearer ${store.token}`,
    }))
  })
  .then((res) => parseInt(res.headers.get('x-ratelimit-remaining')))

var user = () =>
  fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      authorization: `Bearer ${store.token}`,
    }
  })
  .then((res) => res.json())

var stars = async function* ({repo, page = 1, last = 1}) {
  var res = await fetch(
    `https://api.github.com/repos/${repo}/stargazers?per_page=100&page=${page}`, {
    method: 'GET',
    headers: JSON.parse(JSON.stringify({
      accept: 'application/vnd.github.v3.star+json',
      authorization: store.token && `Bearer ${store.token}`,
    }))
  })

  if (/^(4|5)/.test(res.status)) {
    throw res.status
  }

  var limit = parseInt(res.headers.get('x-ratelimit-remaining'))
  if (limit < store.limit) {
    store.limit = limit
  }
  store.stars[repo] = page * 100

  if (page === 1) {
    if (/rel="last"/.test(res.headers.get('link'))) {
      last = parseInt(/page=(\d+)>; rel="last"/.exec(res.headers.get('link'))[1])
    }
    if (last === 400) {
      store.stats[repo] = false
    }
  }

  if (page === last) {
    yield res.json()
    return
  }
  else {
    yield res.json()
    yield* stars({repo, page: ++page, last})
  }
}

export default {limit, user, stars}
