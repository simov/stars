
import store from './store.js'
import router from './router.js'
import request from './request.js'


window.addEventListener('DOMContentLoaded', async () => {
  router()

  if (store.token && !store.user) {
    store.user = await request.user()
  }

  store.limit = await request.limit()
})

window.addEventListener('popstate', router)
