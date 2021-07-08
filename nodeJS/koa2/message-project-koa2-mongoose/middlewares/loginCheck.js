//登录登录验证的中间件

const loginCheck = async(ctx,next)=>{

    //登录成功时，会在session中存储userInfo
    
    //登录后，访问别的路由页面时，做登录校验

    //先获取session中的userInfo信息
    const userInfo = ctx.session.userInfo;

    //如果不存在则失败
    if(userInfo && userInfo?.username){
        //登录验证成功
        await next();      
    }else{
        //登录失败
        ctx.body = {
            errno:-1,
            message:"请登录"
        }
    }
    
}

module.exports = loginCheck;