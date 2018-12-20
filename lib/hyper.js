
m = (...args) => {

  var missing =
    !args[1] ||
    args[1].nodeName ||
    typeof args[1] !== 'object' ||
    args[1] instanceof Array

  var str = args[0]
  var attrs = missing ? {} : args[1]
  var rest = missing ? args.slice(1) : args.slice(2)

  // tag
  var regex = /^([^#[. ]+)/i, match = regex.exec(str)
  var tag = match ? match[1] : 'div'
  // id
  var regex = /#([^#[. ]+)/i, match = regex.exec(str)
  if (match) attrs.id = match[1]
  // classes
  var regex = /\.([^#[. ]+)/gi, match = null, classes = []
  while (match = regex.exec(str)) classes.push(match[1])
  var list = ((attrs.class || '') + ' ' + classes.join(' ')).trim()
  if (list) attrs.class = list
  // attributes
  var regex = /\[(.+?)=(.+?)\]/gi, match = null
  while (match = regex.exec(str)) attrs[match[1]] = match[2]

  return preact.h(...[tag, attrs].concat(rest))

}
