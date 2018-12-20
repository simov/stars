
module.exports = (m, meta, path) =>
  m('html',
    m('head',
      meta.map((_, index) =>
        m('meta', meta[index])
      ),

      m('title', 'GitHub Star History and Stats'),

      m('link', {rel: 'shortcut icon', href: path.favicon}),

      path.css.map((file) =>
        m('link', {rel: 'stylesheet', type: 'text/css', href: file})
      ),

      path.js.map((file) =>
        m('script', {type: 'text/javascript', src: file})
      ),

      (path.mjs || []).map((file) =>
        m('script', {type: 'module', src: file})
      ),
    ),
    m('body',
      m('#wrapper',
        m('#stars'),
        m('#footer-push')
      ),
      m('.footer',
        m('p',
          m('small', 'made with 🔨 by ', m('a[target=_blank]',
            {href: 'https://github.com/simov/stars'},
            'simov'
          ))
        )
      )
    )
  )
