const Koa = require('koa');
const app = new Koa();
app.use(async(ctx)=>{

    //设置cookie
    ctx.cookies.set('age',`${encodeURIComponent('十八岁')}`);

    //cookie的名称或值包含非英文字符，写入时要使用 encodeURIComponent()进行编码，读取时要使用 decodeURIComponent()方法 解码

    //获取cookie
    const username = ctx.cookies.get('user') //获取某个cookie值
    
    //结构化 cookie (目的取值、设置值方便)
    //(nodejs原生方式结构化cookie)获取所有cookie
    const cookieStr = decodeURIComponent(ctx.header.cookie);
    //cookieStr: a=100; b=200 ->{a:100,b:200}
    const cookie = {};   
    cookieStr && cookieStr.split(";").forEach(item => {
        //trim()消除空格
        const itemArr =item.trim().split("=");
        //设置cookie对象的key 和 value
        cookie[itemArr[0]] = itemArr[1]
    });
    console.log("cookie结构化原生写法：",cookie)
    //输出：cookie结构化原生写法： { user: '张三', jiguan: '河南省', sex: '男', age: '十八岁' }
    
    ctx.body = 'Hello,world'
});

app.listen(3000); 
console.log('启动了3000端口服务')