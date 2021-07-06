//连接数据库（mongodb 的服务端）

const mongoose = require('mongoose')

const url = "mongodb://localhost:27017"

const databaseName = 'comment2';

//mongoose规定的设置
mongoose.set("useCreateIndex",true)
mongoose.set("useFindAndModify",true)

//开始连接

mongoose.connect(`${url}/${databaseName}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


//获取当前连接对象实例,处理错误
const conn = mongoose.connection
conn.on("error",err=>{
    console.error("mongoose连接出错",err)
})

//输出模块
module.exports = mongoose















