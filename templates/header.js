
import store from '../lib/store.js'
import router from '../lib/router.js'


var index = () => {
  history.pushState(null, null, location.pathname)
  router()
}

var login = () => {
  store.redirect = location.href
  location.href = store.login
}

export default () =>
  m('.header',
    m('a.title', {onclick: index}, m('span', '⋆'), ' GitHub Stars'),
    store.message &&
    m('.message', store.message),
    m('.user',
      m('.limit', store.limit),
      !store.user &&
      m('a.login', {onclick: login}, 'Log In with GitHub'),
      store.user &&
      m('a.logout', {onclick: _ => store.popup = !store.popup},
        m('img', {src: store.user.avatar_url})
      ),
      store.user &&
      m('.info', {style: `display: ${store.popup ? 'block' : 'none'}`},
        m('a[target=_blank]', {href: `https://github.com/${store.user.login}`},
          m('img', {src: store.user.avatar_url}),
        ),
        m('a.bold[target=_blank]', {
          href: `https://github.com/${store.user.login}`
        }, store.user.login),
        m('.name', store.user.name),
        m('p', store.user.bio),
        m('p', store.user.company),
        m('p', store.user.location),
        m('a[target=_blank]', {href: store.user.blog}, store.user.blog),
      )
    )
  )
