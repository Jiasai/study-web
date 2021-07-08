const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

//添加路由；测试session，功能：记录访问次数
//session 常用于登录，存储用户信息（cookie对应），用户信息可以是 多方面：比如访问次数，访问行为等
//cookie是登录成功之后设置的，用户尚未登录
//也可以设置cookie(游客状态也有userId,userId对应的session中也可以先存放数据信息，
//比如登录次数，访问行为，登录了，再通过 userId往 session 存放登录后的数据信息)
//koa.sid.sig=x-ISCzq_kKStEL1zcC94oUSQN04; 就是cookie和session的对应关系的id
router.get('/session-test',async(ctx,next)=>{
  //ctx.session
  if(!ctx.session?.viewcount){
    //如果用户尚未访问（viewcount是我们自定义的）
    ctx.session.viewcount = 0;
  }
  //用户已经访问过了
  ctx.session.viewcount++; //递增

  //返回
  ctx.body={
    title:'您访问了本网站：',
    count:`第${ctx.session.viewcount}次`
  }

})


module.exports = router
