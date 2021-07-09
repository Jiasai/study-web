const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors');

//引入session中间件
const session = require('koa-generic-session')


const index = require('./routes/index')
const users = require('./routes/users')
const comments = require('./routes/comments')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))


app.keys = ['wEw^&&**UUI123'] //秘钥
//使用session中间件（注册配置）
app.use(session({
  //配置cookie
  cookie:{
    path:'/', 
    //path,配置cookie生效的路径，配置"/"表示cookie在根目录下有效（根目录下的子目录也都会有效，一般都配置根目录）
    httpOnly:true,
    //httpOnly为true规定cookie只允许服务端来操作
    maxAge:24*60*60*1000
    //maxAge是规定cookie过期时间，1天
  }
}))
//这里配置好了，使用了session中间件，koa2会自动帮我们配置了cookie和session
//(get()获取/set()设置/与session的对应关系等)

//服务端支持跨域
app.use(cors({
  //origin:"http://localhost:3001",
  origin:"http://localhost:8080",
  credentials:true
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(comments.routes(),comments.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
