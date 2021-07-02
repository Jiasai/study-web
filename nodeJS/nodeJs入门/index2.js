const http = require("http");
const querystring = require('querystring');
const server = http.createServer((req, res) => {
    let url = req.url;
    const method = req.method.toUpperCase();
    let queryStr = url.split('?')[1];
    let path = url.split('?')[0];

    let query = {}; //解析 querystring
    queryStr && queryStr.split('&').forEach(item => {
        const key = item.split('=')[0];
        const value = item.split("=")[1];
        query[key] = value;
    });
    // const query = querystring.parse(queryStr || '');  效果等同

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
        if (query?.id === "1") {
            res.end(JSON.stringify(LiuYanlist[0]));
        } else if (query?.id === "2") {
            res.end(JSON.stringify(LiuYanlist[1]));
        } else if (query?.id === "3") {
            res.end(JSON.stringify(LiuYanlist[2]));
        } else {
            res.end(JSON.stringify(LiuYanlist));
        }

    }

    //定义路由：模拟创建留言
    if (path === '/api/create' && method === 'POST') {
        res.end(JSON.stringify(CreateSuccess))
    }


});

server.listen(3000);


