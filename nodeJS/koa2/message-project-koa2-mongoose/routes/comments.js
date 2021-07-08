const router = require('koa-router')();
// 引入 Comment的 model
const {Comment, User} = require("../db/model");

//引入登录校验中间件
const loginCheck = require("../middlewares/loginCheck")


//path路径前缀
router.prefix('/api')

//定义list路由，获取留言板
router.get('/list',loginCheck,async (ctx) => {
    //获取querystring: ctx.query
    const query = ctx.query;
    let result = {};
    if(query?.username){
        const {username} = query;
        //筛选查询数据库
        result = await Comment.findOne({username});       
    }else{
        result = await Comment.find().sort({_id:-1});
    }
    //返回数据
    ctx.body = {
        errno:0,
        data:result
    };
})

/* router.get('/list/create',async(ctx,next)=>{
    const query = ctx.query;
    if(query?.username){
        const newUser = await User.create({
            username:query.username,
            password:'sdef',
            age:21,
            city:"北京"
        });
        ctx.body = `创建的用户是：-->${newUser}`
    }else{
        ctx.body = '访问路径出错'
    }
}) */


//定义create路由，创建留言
router.post('/create', async (ctx) => {
    const body = await ctx.request.body //获取请求的body数据
    console.log('发送来的body是：', body);
    if(body?.content && body?.username){
        //获取body数据
        const {content , username } = body;
        //插入到数据库
       const newMessage = await Comment.create({
            content,
            username
        })

    }   
    //设置返回的body,把数据带上
    ctx.body = {
        errno: 0,
        message: '留言创建成功！',
        data:newMessage
    }

})

//输出
module.exports = router;