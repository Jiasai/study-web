const http = require('http');

//req-request,res-response
const server= http.createServer((req,res)=>{
    const url = req.url;
    const path = url.split("?")[0];
    res.end(path+'1234');
});

server.listen(3000);

//这几行代码，启动了1个服务端，监控了一个 3000端口，返回访问地址
