const router = require('koa-router')();

//返回结果
const result = {
    errno: 0,
    data: [
        { user: '张三', content: '你好，world' },
        { user: '李四', content: '很棒' }
    ]
}

//path路径前缀
router.prefix('/api')

//定义list路由，获取留言板
router.get('/list', async (ctx) => {
    //获取querystring: ctx.query
    const query = ctx.query;
    console.log(query);
    ctx.body = result;
})

//定义create路由，创建留言
router.post('/create', async (ctx) => {
    const body = await ctx.request.body //获取请求的body数据
    console.log('发送来的body是：', body)
    //设置返回的body
    ctx.body = {
        errno: 0,
        message: '留言创建成功！'
    }
})


//输出
module.exports = router;