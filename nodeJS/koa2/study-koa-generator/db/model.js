//数据模型 （规范数据格式）

//引入自定义的模块 mongoose
const mongoose = require("./db");

//定义 Schema (Schema是数据规范)
const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true, //规定必填,否则不存储
        unique:true //唯一性，不可重复

    },
    password:String,
    age:Number,
    city:String,   
    gender:{//性别是Number类型，默认值是0
        type:Number,
        default:0 //0-保密,1-男,2-女
    }
},{
    timestamps:true  
    //时间戳，自动添加文档的创建时间、更新时间
})
//定义数据必须包含这些属性内容，不能多，不能少；且每个属性内容的数据类型；

//使用 Schema 定义User的Model 对映一个 Collection
const User = mongoose.model("user",UserSchema)
//user 是 collection集合 "users"的单数形式

//输出 Model
module.exports = { User }








