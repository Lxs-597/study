const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const render =  require('koa-ejs')
const path = require('path')
const fs = require('fs')

const app = new Koa()
const router = new Router({
  // prefix: 'prefix'
})

render(app, {
  root: path.join(__dirname, 'page'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
})

let pageRouter = new Router()

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

pageRouter
  .get('/index', async ctx => {
    const page = await readPage('index')
    ctx.type = 'html'
    ctx.body = page
  })
  .get('/todo', async ctx => {
    ctx.body = 'todo'
  })

const data = ['aaa', 'bbb', 'ccc']

router
  .get('/', async ctx => {
    await ctx.render('index', {
      title: 'hello koa2',
      list: data
    })
  })

router.use('/page', pageRouter.routes(), pageRouter.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

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


app.on('error',  (err, ctx) => {
  console.error('sever error:', err, ctx)
})

app.listen(9001, () => {
  console.log('sever is starting at port 9001')
})