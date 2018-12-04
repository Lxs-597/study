function repeat(str, times) {
  return Array(times + 1).join(str)
}

function pad(num, fill) {
  const len = ('' + num).length
  return repeat('0', fill > len ? fill - len || 0 : 0) + num
}

function formatDate(stamp, fmt = 'yyyy-MM-dd hh:mm:ss') {
  const date = new Date(+stamp)

  if (/(y+)/.test(fmt)) {
    let str = date.getFullYear() + ''

    fmt = fmt.replace(RegExp.$1, str.substring(4 - RegExp.$1.length))
  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (let k in o) {
    let str = o[k] + ''

    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : str.padStart(2, '0'))
    }
  }

  return fmt
}

function isObject(obj) {
  return typeof obj !== null && typeof obj === 'object'
}

function isPromise(val) {
  return val && typeof val.then === 'function'
}

function looseEqual(a, b) {
  if (a === b) return true

  let isObjectA = isObject(a)
  let isObjectB = isObject(b)

  if (isObjectA && isObjectB) {
    try {
      let isArrayA = Array.isArray(a)
      let isArrayB = Array.isArray(b)

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((it, i) => {
          return looseEqual(it, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        let keysA = Object.keys(a)
        let keysB = Object.keys(b)

        return keysA.length === keysB.length && keysA.every(key => {
          return looseEqual(a[key], b[key])
        })
      } else { return false }

    } catch (e) { return false }

  } else if (!isObjectA && !isObjectB){

    return typeof a === typeof b && String(a) === String(b)
    // return String(a) === String(b)

  } else { return false }
}

function looseSome(val, arr) {
  return arr.some(it => {
    return it === val || Object.is(it, val)
  })
}

function toString(val) {
  return val == null ? '' : typeof val === 'object'
    ? JSON.stringify(val)
    : String(val)
}

function toNumber(val) {
  let num = parseFloat(val)

  return isNaN(num) ? val : num
}

function throttle(handler, threshold = 1000) {
  let last = null, timer = null

  return function(...args) {
    let now = +new Date()
    if (now - last > threshold) {
      handler.apply(this, args)
      last = now
    } else {
      clearTimeout(timer)

      timer = setTimeout(() => {
        handler.apply(this, args)
        last = now
      }, threshold)
    }
  }
}

function debounce(handler, delay = 200) {
  let timer = null

  return function(...args) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      handler.apply(this, args)
    }, delay)
  }
}

function getURLParam(key) {
  key = key.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]')

  let reg = new RegExp(`[\\?&]${key}=([^&#]*)`)

  let result = reg.exec(location.search)

  return result == null ? '' : result[1]

  // let searchParams = new URLSearchParams(location.search)
  // return searchParams.get(key)
}
