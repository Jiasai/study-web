const router = require('koa-router')()
//获取user model
const {User} = require('../db/model')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})


//登录(真实对接数据库)
//为了方便同域的测试，暂用get请求（真正用post请求）
router.post('/login',async(ctx,next)=>{
    //const {username,password} = ctx.query; //get请求
    const {username,password} = ctx.request.body; //post请求 
    console.log(username,password);
    if(username&&password){
     
      //查询筛选数据库
      const UserInfo = await User.findOne({username,password});

      //查询成功
      if(UserInfo?.username){

        //更新数据库数据（登录状态）
         const newUserInfo = await User.findOneAndUpdate({username},{login:true},{new:true});

        //存入session，同时创建cookie返回
        ctx.session.userInfo = newUserInfo;   
       
        //返回
        ctx.body = {
          errno:0,
          data:newUserInfo,
          message:'登录成功'
        }

      }else{
        ctx.body = {
          errno:-1,
          data:{},
          message:'登录失败:用户密码错误'
        }
      }

    }else{
      ctx.body = {
        errno:-1,
        data:{},
        message:'请输入用户名密码'
      }
    }
})

//注册(真实对接数据库)
//为了方便同域的测试，暂用get请求（真正用post请求）
router.get('/register',async(ctx,next)=>{
  const {username,password} = ctx.query;
    if(username&&password){

      //数据库创建用户
      const newUser = await User.create({
        username:username,
        password:password,
        age:25,
        city:"深圳",
        login:true
      })
      if(!newUser) return;
      //存入session,同时创建cookie返回
      ctx.session.userInfo = newUser;

      //返回
      ctx.body = {
        errno:0,
        data:newUser,
        message:'注册成功'
      }


    }else{
      ctx.body = {
        errno:-1,
        data:{},
        message:'请输入用户名密码'
      }
    }
})


//模拟登录验证
router.get('/login-check-mock',async(ctx,next)=>{
  //看看session.userinfo如果找到
  if(ctx.session.userInfo){
    ctx.body = '登录验证通过，可以访问此路由。-->'+JSON.stringify(ctx.session.userInfo||{})
  }else{
    ctx.body = '登录验证失败！去登录'
  }
})





module.exports = router
