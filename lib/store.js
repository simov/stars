
import render from './render.js'


var watch = (cache) => new Proxy(cache, ({
  set: (target, key, value, receiver) => {
    if (/token|redirect/.test(key)) {
      localStorage.setItem(key, value)
    }
    else if (/user/.test(key)) {
      localStorage.setItem(key, JSON.stringify(value))
    }
    render()
    return Reflect.set(cache, key, value)
  }
}))

var cache = {
  login: 'https://grant.outofindex.com/connect/github/stars',
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user')),
  // stars cache
  http: watch({}),
  svg: watch({}),
  stats: watch({}),
  stars: watch({}),
  // current list of repositories
  repos: [],
  // current rate limit
  limit: '',
  // toggle user popup
  popup: false,
  // error message
  message: '',
  // last url before login
  redirect: localStorage.getItem('redirect'),
}

export default watch(cache)
