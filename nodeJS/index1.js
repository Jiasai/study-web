const http = require('http');

//启动创建1个服务端http.createServer()
//req->request, res->response

const server= http.createServer((req,res)=>{
    //监听到http请求，执行这个函数
    //这个函数的参数req,res 拥有各种API方法
    
    //参数req
    const url = req.url; //req请求拿到 url

    //使用参数res.end()方法，返回信息给前端
    res.end('hello,world! url is:'+url);
    
});

server.listen(3000); 
//调用listen()可以监听http请求,3000端口

console.log('http请求已经被监听,3000端口')