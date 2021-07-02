const http = require("http");
const querystring = require('querystring');
const server = http.createServer((req, res) => {
    let url = req.url;
    const method = req.method.toUpperCase();
    let queryStr = url.split('?')[1];
    let path = url.split('?')[0];

    const query = querystring.parse(queryStr || '')

    const LiuYanlist = [
        { id: 1, name: "xiaoHong", content: "hello,world" },
        { id: 2, name: "xiaoMing", content: "hello,world" },
        { id: 3, name: "xiaoGang", content: "hello,world" },
    ];
    const CreateSuccess = {
        errno: 0,
        message: 'this is successful',
        data: {
            id: '320210511485',
            name: 'xiaoHong',
            content: 'Good job!',
            time: '2021-05-11'
        }
    }


    //定义路由规则：模拟获取留言板列表
    if (path === "/api/list" && method === "GET") {
        //返回结果
        const result = {
            errno:0,
            data:[
                {user:'张三',content:'你好，world'},
                {user:'李四',content:'很棒'}
            ]
        }
        if (query?.id === "1") {
            res.end(JSON.stringify(LiuYanlist[0]));
        } else if (query?.id === "2") {
            res.end(JSON.stringify(LiuYanlist[1]));
        } else if (query?.id === "3") {
            res.end(JSON.stringify(LiuYanlist[2]));
        } else {
            res.writeHead(200,{'Content-type':'application/json'});
            res.end(JSON.stringify(result));
        }

    }

    //定义路由：模拟创建留言，发送给服务端数据
    if (path === '/api/create' && method === 'POST') {

        //获取 request请求的 content-type数据格式
        const reqContentType = req.headers['content-type'];

        //服务端怎么去识别"流"，并接收数据 
        //通过req提供的on方法，监听事件"data" 和 事件"end"
        //这2个事件方法是异步的
        let bodyStr = ''
        req.on('data',chunk=>{
            //chunk 即"流"的每一段数据
            bodyStr += chunk.toString();
        })
        //服务端怎么知道 "流" 完了
        req.on('end',()=>{
            if(reqContentType === 'application/json'){
                const body = JSON.parse(bodyStr);
                console.log('发送来的body是：',body);
                res.end('接收完成');
            }else{
                res.end('请求发送数据格式不符合规则');
            }        
        })

        return; 
        //return 截断下面的 res.end，因为上面的on事件方法是 异步的

        // //返回结果
        // const result = {
        //     errno:0,
        //     message:'创建成功'
        // }
        // res.writeHead(200,{'Content-type':'application/json'})
        // res.end(JSON.stringify(result));

        
    }

    //没有命中路由，默认404
    // res.writeHead(404,{"Content-type":'text/plain'});
    // res.end('404 Not Found');

    //设置返回html
    res.writeHead(404,{'Content-type':'text/html'})
    res.end(`
        <!DOCTYPE html>
            <head>
            <title>404</title>
            <head>
            <body style='background:red;color:#fff;text-align:center;margin-top:30%'>
                <h1>404 Not Found</h1>
            </body>
        </html>
    `)








});

server.listen(3000);


