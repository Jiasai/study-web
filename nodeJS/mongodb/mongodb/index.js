// nodejs 连接 mongodb 
//体会 nodejs连接 mongodb的能力，不会真正的用到路由上
//mongoose 对接路由的功能

//nodejs创建客户端
const MongoClient = require("mongodb").MongoClient

//对于数据库来说，compass、命令行工具、nodejs 都是 数据库的客户端

//nodejs作为客户端操作mongodb数据

const url = "mongodb://localhost:27017"
//本地启动的 mongodb服务地址（启动中状态）

const dataBaseName = "comment1";
//数据库 （留言板项目数据库）

MongoClient.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err, client) => {
    if (err) { console.error('mongodb连接出错', err); return }
    console.log('mongodb 连接成功');

    //切换准备操作的数据库
    const db = client.db(dataBaseName);

    //切换到指定集合 collection
    const userCollection = db.collection("users");

    //新增1条数据
    userCollection.insertOne({
        username: "刘德华",
        password: 'acd',
        age: 35,
        city: "HongKong"
    }, (err, result) => {
        if (err) {
            console.error("出错", err);
            return
        }
        //插入成功后返回对象
        //插入的数据
        const insertData = result.ops[0];
        //插入数据的_id
        const insertID = result.insertedId;
        //插入数据的 数量
        const count = result.insertedCount;

        console.log(insertData, insertID, count);

    })

    //删除1条数据
    userCollection.deleteOne(
        { username: 'wangwu' },
        (err, result) => {
            if (err) {
                console.error("删除出错", err);
                return
            }
            console.log("删除的返回结果", result)
        }
    )

    //批量删除多条数据
    userCollection.deleteMany(
        { city: 'xian' },
        (err, result) => {
            if (err, result) {
                console.error("删除出错", err);
                return
            }
        }
    )

    //修改1条数据:第一个参数是 对象 ：条件
    //第二个参数是 修改内容 对象
    //第三个参数，回调函数
    userCollection.updateOne(
        { city: 'zhangsan' },  //修改条件
        { $set: { age: 39, city: 'Beijing' } }//修改内容
        , (err, result) => {
            if (err) {
                console.error("修改出错", err);
                return
            }
            console.log("修改后的返回结果", result);
        }
    )

    //批量修改
    userCollection.updateMany(
        { city: 'HongKong' },
        { $set: { city: "ShenZhen" } },
        (err, result) => {
            if (err) {
                console.error("修改出错", err);
                return
            }
            console.log("修改了几条数据：", result.modifiedCount);
        }
    )

    //查询数据:
    userCollection.find({ city: "HongKong" }).toArray((err, result) => {
        if (err) {
            console.error("出错", err);
            return
        }
        console.log("查询结果：", result);
    })


    //修改默认排序为逆向排序
    userCollection.find().sort({ _id: -1 }).toArray((err, result) => {
        if (err) {
            console.error("出错", err);
            return
        }
        console.log("查询结果：", result);
    })


    //新增一组数据
    /*  userCollection.insertMany([{
         username: "张学友",
         password: 'aedb',
         age: 37,
         city: "HongKong"
     }, {
         username: "郭富城",
         password: 'wwacd',
         age: 31,
         city: "HongKong"
     }],(err,result)=>{
         console.log(result);
     })  */


    //关闭
    //client.close();

})
//客户端connect方法连接，第一个参数url, 第二个参数配置项，第三个参数回调函数，函数中做出具体处理操作



