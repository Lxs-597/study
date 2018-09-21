const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const fs = require('fs')

const app = new Koa()
const router = new Router({
  // prefix: 'prefix'
})

const readPage = page => {
  return new Promise((resolve, reject) => {
    let pagePath = path.resolve(__dirname, `page/${page}.html`)
    fs.readFile(pagePath, (err, data) => {
      if (!err) {
        resolve(data.toString())
      } else {
        reject(err)
      }
    })
  })
}

router.get('/', async (ctx, next) => {
  const page = await readPage('index')
  ctx.type = 'html'
  ctx.body = page
})

router.post('/post_userinfo', (ctx, next) => {
  const data = ctx.request.body

  ctx.body = data
})

app.use(bodyParser())

app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`method: ${ctx.method}, url: ${ctx.url} - ${rt} `)
})

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

app.use(router.routes()).use(router.allowedMethods())

app.on('error',  (err, ctx) => {
  console.error('sever error:', err, ctx)
})

app.listen(9001, () => {
  console.log('%c sever is starting at port 9001', 'color: green')
})