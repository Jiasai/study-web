const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    content:'koa2 是 nodejs web server 框架。它封装了原生代码的API，规范了流程和格式，让开发人员更加关注于业务代码，提高开发效率',
    foot:'欢迎 来到 Koa 2'
  }) 
})
//ctx.render()第一个参数 index 对应的就是views文件夹下面的 index.pug文件。第二个参数 对象，就是要传输给 index.pug的数据，对象中有个title属性、content属性、foot属性 。 在index.pug中 可以直接 使用 title变量、content变量、foot变量

//router.get('/string',()=>{})定义一个 get请求的，路径是/string的 路由

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})
//直接设置字符串，body就是字符串
router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
//直接设置{ }， body就是JSON格式

//在ctx中有很多的koa提供的方法API，render()、body属性等

module.exports = router
