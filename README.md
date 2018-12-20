
# stars

> _Do You Even Trend?_

### [:rocket: GitHub Star History and Stats :sparkles:][app]

## tech stack

- **render:** [Preact] + [Plotly] + [hyper]
- **router:** [pushState] + [URLSearchParams]
- **store:** `{}` + [Proxy]
- **request:** [fetch]
- **login:** [Grant]
- **import:** _all the things_
- **async generators:** _say whaaat_
- **var:** :scream:

## app size

> _minified + gzipped_

file       | size  | notes
:---       | ---:  | :---
**css**    | 1.0KB | -
**app**    | 2.7KB | rollup + terser (no babel)
**preact** | 3.4KB | -
**plotly** | 281KB | :grimacing: cartesian module only

## how

This app leverages native ES [modules]:

```bash
npm i
npm run render:dev
```

The app bundling is completely optional:

```bash
npm run build
npm run render:prod
```

## limit

Currently the GitHub API have a hard limit of up to 400 pages returned for stargazers history for a given repository, meaning that only the first 40k stars can be explored with this app.


![][screenshot]

> This project was inspired by [StarTrack-js][startrack]


  [app]: https://simov.github.io/stars/
  [Preact]: https://github.com/developit/preact
  [Plotly]: https://github.com/plotly/plotly.js
  [hyper]: https://github.com/simov/stars/blob/master/lib/hyper.js
  [pushState]: https://developer.mozilla.org/en-US/docs/Web/API/History_API
  [URLSearchParams]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  [Proxy]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
  [fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
  [Grant]: https://github.com/simov/grant
  [modules]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
  [startrack]: https://seladb.github.io/StarTrack-js/
  [<40k]: https://github.com/search?q=stars%3A%3E40000&type=Repositories
  [screenshot]: https://i.imgur.com/eD7irk5.png
