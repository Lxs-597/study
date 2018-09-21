const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()

router.get('/', (ctx, next) => {
  console.log(ctx.query)
  ctx.body = `
    <form method="POST" action="/post_userinfo">
      <label>用户名</label>
      <input type="text" name="username"/>
      <label>年龄</label>
      <input type="number" name="age"/>
      <button type="submit">提交</button>
    </form>
  `
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