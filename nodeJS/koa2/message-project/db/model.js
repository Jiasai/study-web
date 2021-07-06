//数据模型 （规范数据格式）

const mongoose = require("./db");

//定义 User Schema (Schema是数据规范)
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
})

//使用Schema定义User的Model 对映一个 users Collection
const User = mongoose.model("user",UserSchema)

//定义 Comment Schema
const CommentSchema = mongoose.Schema({
    content:{
        type:String,
        required:true //必须
    },
    username:String, //用户名
},{timestamps:true})

//定义 Comment Model (数据库中没有comments集合会自动创建)
const Comment = mongoose.model('comment',CommentSchema)


//输出 Model
module.exports = { User , Comment }








