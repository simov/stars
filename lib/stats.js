
function toJSONLocal (date) {
  var local = new Date(date)
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return local.toJSON().slice(0, 10)
}

var total = (x) =>
  Math.floor(
    (Date.parse(x[x.length - 1]) - Date.parse(x[0])) / 1000 / 60 / 60 / 24)

var unique = (x) =>
  x.reduce((all, date) => {
    var key = toJSONLocal(new Date(date))
    all[key] = all[key] === undefined ? 1 : all[key] + 1
    return all
  }, {})

var max = (unique) =>
  Object.values(unique).sort((a, b) => b - a)[0]

var meta = ({x, y}) => {
  if (!x.length) {
    return
  }

  var _total = total(x)
  var _unique = unique(x)

  return [
    {title: 'Number of stars', value: y[y.length - 1]},
    {title: 'Number of days', value: _total},
    {title: 'Max stars in one day', value: max(_unique)},
    {title: 'Days with stars', value: Object.keys(_unique).length},
    {title: 'Days with no stars', value: _total - Object.keys(_unique).length},
    {title: 'Average stars per day', value: (x.length / _total).toFixed(2)},
    {title: 'Average days per star', value: (_total / x.length).toFixed(2)},
  ]
}

var svg = (data, repo) => ({
  x: data.map(({starred_at}) => starred_at),
  y: data.map((_, index) => index + 1),
  name: repo
})

export default {meta, svg}
