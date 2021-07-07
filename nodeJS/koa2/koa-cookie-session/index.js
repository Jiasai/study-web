const Koa = require('koa');
const app = new Koa();

//ctx  context的简写  上下文

app.use(async(ctx)=>{
    ctx.body = 'Hello,world'
});

app.listen(3000); //web server监听3000端口




/* const http = require('http');

const server = http.createServer((req,res)=>{
    res.end('Hello,world')
});

server.listen(3000); */














