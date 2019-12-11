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

CSVToJSON('col1,col2\na,b\nc,d')