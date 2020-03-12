const STATE_MAP = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

class APromise {
  constructor(executor) {
    this.state = STATE_MAP.PENDING
    this.value = undefined
    this.reason = undefined

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    let resolve = value => {
      if (this.state === STATE_MAP.PENDING) {
        this.state = STATE_MAP.FULFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }

    let reject = reason => {
      if (this.state === STATE_MAP.PENDING) {
        this.state = STATE_MAP.REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) { reject(e) }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
    let p2 =  new APromise((resolve, reject) => {
      if (this.state === STATE_MAP.PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            let res = onFulfilled(this.value)
            resolvePromise(p2, res, resolve, reject)
          }, 0)
        })

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            let res = onRejected(this.reason)
            resolvePromise(p2, res, resolve, reject)
          }, 0)
        })
      }

      if (this.state === STATE_MAP.FULFILLED) {
        setTimeout(() => {
          let res = onFulfilled(this.value)
          resolvePromise(p2, res, resolve, reject)
        }, 0)
      }

      if (this.state === STATE_MAP.REJECTED) {
        setTimeout(() => {
          let res = onRejected(this.reason)
          resolvePromise(p2, res, resolve, reject)
        }, 0)
      }
    })

    return p2
  }

  catch(fn) {
    return this.then(null, fn)
  }
}

APromise.resolve = function resolve(val) {
  return new APromise((resolve, reject) => {
    resolve(val)
  })
}

APromise.reject = function reject(val) {
  return new APromise((resolve, reject) => {
    reject(val)
  })
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }

  let called

  if (x != null && (typeof x === 'object' || typeof x ==='function')) {
    try {
      let then = x.then

      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return
          called = true
          resolvePromise(promise, y, resolve, reject)
        }, err => {
          if (called) return
          called = true
          reject(err)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

module.exports = APromise