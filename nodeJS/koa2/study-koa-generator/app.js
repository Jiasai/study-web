const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

//引入路由的实现
const index = require('./routes/index')
const users = require('./routes/users')
const comments = require('./routes/comments')

// onerror 错误处理器
onerror(app)

// middlewares 中间件(app.use(...))
//bodyparser是 request body 的转换,接收req的body数据
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
//使用中间件，body转换JSON格式
app.use(json())
//中间件logger，规范打印日志格式
app.use(logger())
//static中间件，__dirname 是当前目录下的public文件夹，static是静态文件服务的意思是,可以在浏览器中通过url路径直接访问到文件
app.use(require('koa-static')(__dirname + '/public'))

//views中间件，服务端模板引擎（类似理解.vue/.art）后缀名是.pug, 使用 pug语法
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

//app.use()中传入函数，可以使中间件，也可以是自己定义的函数
// logger 打印当前请求所花费的时间，一个请求花费多少毫秒
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//模拟登陆验证 （为了使用中间件）
app.use(async (ctx,next)=>{
  const query = ctx.query;
  if(query.user === 'zhangsan'){
    await next()  //next 执行下一步中间件,直到它执行完成，再返回这里，执行下一句console
    console.log('是登陆状态的')
  }else{
    ctx.body = '请登录' //模拟登陆失败
  }
})



// 注册路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(comments.routes(),comments.allowedMethods())
//allowedMethods()是对于 404 或者返回是空的情况的一种补充

// error-handling 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
