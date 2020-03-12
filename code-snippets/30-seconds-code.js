const ary = (fn, n) => (...args) => fn(...args.slice(0, n))

const towMax = ary(Math.max, 2)
const list = [[2, 6, 'a'], [6, 4, 8], [10]]
list.map(x => towMax(...x))


const call = (key, callback) => context => context[key](callback)

const map = call('map', x => 2 * x)
map([1, 2, 3])


const collectInfo = fn => (...args) => fn(args)


const over = (...fns) => (...args) => fns.map(fn => fn.call(null, ...args))

const maxMin = over(Math.max, Math.min)
maxMin(1, 2, 3, 4, 5)


const overArgs = (fn, trasforms) => (...args) => fn(...args.map((val, i) => trasforms[i](val)))

const double = n => n * 2
const square = n => n ** 2
overArgs((x, y) => [x, y], [double, square])(4, 2)


const pipeFunctions = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)))

const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = pipeFunctions(multiply, add5);
multiplyAndAdd5(5, 2)


const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg))

const sum = pipeAsyncFunctions(
  x => x + 1,
  x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
  x => x + 3,
  async x => (await x) + 4
);
(async () => {
  console.log(await sum(5))
})()


const promisify = func => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => err ? reject(err) : resolve(result))
  )

const delay = promisify((d, cb) => setTimeout(cb, d))
delay(2000).then(() => console.log('Hi!'))


const rearg = (fn, indexes) => (...args) => fn(...indexes.map(i => args[i]))

const rearged = rearg((a, b, c) => [a, b, c], [2, 0, 1])
rearged('b', 'c', 'a')


const spreadOver = fn => argsArr => fn(...argsArr)

const arrayMax = spreadOver(Math.max)
arrayMax([1, 5, 3])


const unary = fn => val => fn(val)

['10', '15', '20'].map(unary(parseInt))


const all = (arr, fn = Boolean) => arr.every(fn)

all([1, 2, 3], x => x > 1)


const allEqual = arr => arr.every(val => val === arr[0])

allEqual([1, 1, 1])


const any = (arr, fn = Boolean) => arr.some(fn)

any([0, 1, 2], x => x > 1)


const arrayToCSV = (arr, delimiter = ',') =>
  arr.map(v => v.map(x => isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x).join(delimiter)).join('\n')

arrayToCSV([['a', 'b'], ['c', 'd']])


const bifurcate = (arr, filter) =>
  arr.reduce((acc, val, i) => (acc[filter[i] ? 0 : 1].push(val), acc), [[], []])

bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true])


const bifurcateBy = (arr, fn) =>
  arr.reduce((acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [[], []])

bifurcateBy(['beep', 'boop', 'foo', 'bar'], x => x[0] === 'b')


const chunk = (arr, size) =>
  Array.from({length: Math.ceil(arr.length / size)}, (val, i) =>
    arr.slice(i * size, i * size + size)
  )

chunk([1, 2, 3, 4, 5], 2)


const compact = arr => arr.filter(Boolean)

compact([0, 1, false, null, NaN, '0', 'a' * 1])


const countBy = (arr, fn) =>
  arr
    .map(typeof fn === 'function' ? fn : val => val[fn])
    .reduce((acc, val) => (acc[val] = (acc[val] || 0) + 1, acc), {})

countBy([6.1, 4.2, 6.3], Math.floor)


const countOccurrences = (arr, val) => arr.reduce((a, v) => v === val ? a + 1 : a, 0)

countOccurrences([1, 2, 3, 1, 1], 1)


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {

  }, {})

const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v))

deepFlatten([[1, [2, 3]], [4]])


const difference = (a, b) => a.filter(v => !(new Set(b)).has(v))

difference([1, 2, 3], [1, 2, 4])


const differenceBy = (a, b, fn) => a.map(fn).filter(v => !(new Set(b.map(fn))).has(v))

differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)


const differenceWith = (arr, val, comp) => arr.filter(a => val.findIndex(b => comp(a, b)) === -1)

differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b))


const drop = (arr, n = 1) => arr.slice(n)


const RGBToHex = (r, g, b) => ((r >> 16) + (g >> 16) + b).toString(16).padStart(6, '0')


const getURLParameters = url =>
  (url.match(/([^?&=]+)(=([^&]*))/g)).reduce(
    (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a),
    {}
  )

getURLParameters('http://url.com/page?name=Adam&surname=Smith')


const isBrowser = ![typeof window, typeof document].includes('undefined')

console.log(isBrowser)


const zipObject = (props, values) =>
  props.reduce((obj, prop, i) => (obj[prop] = values[i], obj), {})

zipObject(['a', 'b', 'c'], [1, 2])


const omit = (obj, keys) =>
  Object.keys(obj)
    .filter(k => !keys.includes(k))
    .reduce((acc, key) => (acc[key] = obj[key], acc), {})

const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => (acc[key] = obj[key], acc), {})

const pickBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => fn(obj[k], k))
    .reduce((acc, key) => (acc[key] = obj[key], acc), {})

omit({ a: 1, b: '2', c: 3 }, ['b'])
omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number')
pickBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number')


const stripHTMLTags = str => str.replace(/<[^>]*>/g, '')


const CSVToJSON = (data, delimiter = ',') => {
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter)

  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map(v => {
      const values = v.split(delimiter)
      return titles.reduce((obj, title, index) => ((obj[title] = values[index]), obj), {})
    })
}

const CSVToArray = (data, delimiter = ',', omitFirstRow = false) =>
  data
    .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
    .split('\n')
    .map(v => v.split(delimiter))

CSVToJSON('col1,col2\na,b\nc,d')


const chainAsync = fns => {
  let curr = 0
  const last = fns[fns.length - 1]

  const next = () => {
    const fn = fns[curr++]
    fn === last ? fn() : fn(next)
  }

  next()
}

chainAsync([
  next => {
    console.log('0 seconds');
    setTimeout(next, 1000);
  },
  next => {
    console.log('1 second');
    setTimeout(next, 1000);
  },
  () => {
    console.log('2 second');
  }
])


const copyToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}


const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, right, bottom, left } = el.getBoundingClientRect()
  const { innerWidth, innerHeight } = window

  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
      ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
}


const createEventHub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    (this.hub[event] || []).forEach(h => h(data))
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = []
    this.hub[event].push(handler)
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex(h => h === handler)
    if (i > -1) this.hub[event].splice(i, 1)
    if (this.hub[event].length === 0) Reflect.deleteProperty(this.hub, event)
  }
})

const handler = data => console.log(data)
const eventHub = createEventHub()

eventHub.on('message', handler)
eventHub.emit('message', 'hello world')
eventHub.emit('message', { hello: 'world' })
eventHub.off('message', handler)


const triggerEvent = (el, type, detail) =>
  el.dispatchEvent(new CustomEvent(type, { detail }))

const on = (el, evt, fn, opts) => {
  const delegatorFn = e => e.target.matches(opts.target) && fn.call(e.target, e)
  el.addEventListener(evt, opts.target ? delegatorFn : fn, opts.options || false)
  if (opts.target) return delegatorFn
}

const off = (el, evt, fn, opts = false) => el.removeEventListener(evt, fn, opts)


const prefix = prop => {
  const capitalize = prop.charAt(0).toUpperCase + prop.slice(1)
  const prefixes = ['', 'webkit', 'moz', 'ms', 'o']
  const i = prefixes.findIndex(
    prefix => typeof document.body.style[prefix ? prefix + capitalize : prop] !== 'undefined'
  )
  return i !== -1 ? i === 0 ? prop : prefixes[i] + capitalize : null
}


const xProd = (a, b) => a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), [])


const deepFreeze = obj =>
  Object.keys(obj).forEach(prop =>
    !(obj[prop] instanceof Object) || Object.isFrozen(obj[prop]) ? null : Object.freeze(obj[prop])
  ) || Object.freeze(obj)


const getRealLength = str =>
  typeof str === 'string' && str.length > 0
    ? [...str].reduce((len, s) => (len += (s.charCodeAt(0) > 120 ? 2 : 1), len), 0)
    : 0

const sliceRealLength = (str, len) => {
  let i = 0
  let ret = ''
  while(len > 0) {
    const s = str.slice(i, ++i)
    const realLength = s.charCodeAt(0) > 120 ? 2 : 1
    ret += s
    len -= realLength
  }
  return ret
}


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


const converge = (converger, fns) => (...args) => converger(
  ...fns.map(fn => fn.apply(null, args))
)

const average = converge((a, b) => a / b, [
  arr => arr.reduce((a, v) => a + v, 0),
  arr => arr.length
])

average([1, 2, 3, 4, 5, 6, 7])


const factoria = n =>
  n <= 1
    ? 1
    : n * factoria(n - 1)

console.log(factoria(10))


const once = fn => {
  let called = false
  return function(...args) {
    if (called) return
    called = true
    return fn.apply(this, args)
  }
}


const curry = (fn, arity = fn.length, ...args) =>
  arity >= fn.length ? fn(...args) : curry.bind(null, fn, arity, ...args)


const shuffle = ([...arr]) => {
  let m = arr.length
  while(m) {
    const i = Math.floor(Math.random() * m--)
    ;[arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr
}

const foo = [1, 2, 34, 4, 5, 6, 7, 9, 13, 12, 11, 10]
console.log(shuffle(foo))


const debounce = (fn, ms = 0) => {
  let timeout
  return function(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(this, args), ms)
  }
}