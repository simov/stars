
import store from './store.js'
import router from './router.js'
import request from './request.js'


window.addEventListener('DOMContentLoaded', () => {
  router()

  request.limit().then((limit) => {
    store.limit = limit
  })

  if (store.token && !store.user) {
    request.user().then((user) => {
      store.user = user
    })
  }
})

window.addEventListener('popstate', router)
