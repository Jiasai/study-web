// 演示koa2的中间件洋葱圈模型

const Koa = require('koa');
const app = new Koa();

//logger
app.use(async (ctx,next)=>{
    await next()  
    //去执行下一个注册中间件，直到它执行完成，再往下执行
    const rt = ctx.response.get('X-Response-Time'); //从response获取 时间差
    console.log(`${ctx.method}-${ctx.url}-${rt}`);

})
//x-response-time
app.use(async (ctx,next)=>{
    const start = Date.now();
    await next() //执行下个中间件，直到它完成，再回来往下执行
    const ms = Date.now() - start ; //计算时间差
    ctx.set('X-Response-Time',`${ms}ms`); //设置 response ，记录时间差
})
//response
app.use(async (ctx,next)=>{
    ctx.body = 'Hello,world'
})

app.listen(3000)

console.log("koa2 已经开始监听 3000 端口") 