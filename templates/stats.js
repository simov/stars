
import store from '../lib/store.js'


export default () =>
  m('.stats', store.repos.map((repo) =>
    m('table',
      m('tr', m('th[colspan=2]', repo)),

      !store.stats[repo] &&
      m('tr.stars', m('td[colspan=2]', m('span', '⋆'), store.stars[repo])),

      store.stats[repo] === false &&
      m('tr.limit', m('td', 'Limited to 40k stars!')),

      store.stats[repo] &&
      store.stats[repo].map(({title, value}) =>
        m('tr', m('td', title), m('td', value)))
    )
  ))
