//使用 model 操作 mongodb 数据
const {User} = require("./model");

//定义一个 async的匿名函数并执行。为了里面能用 await(因为创建、查询等都是异步操作)
!(async()=>{

    //新增数据：方式1
    const zhangsan = new User({
        username:"zhangsan",
        password:'abcde',
        age:20,
        city:"BeiJing",
        gender:1
    })
    zhangsan.save(); //保存新增
   
    //新增方式2
    const lisi = await User.create({
        username:"lisi",
        password:'1233',
        age:23,
        city:"ShangHai"
    })
  
    /* const xiaohong = await User.create({
        username:"xiaohong",
        password:'456789',
        age:25,
        city:"BeiJing",
        gender:2
    }) */

    //筛选查询数据 （返回数组）
    const userList = await User.find({
        username:"zhangsan"
    })

    //查询单条数据（返回对象）
    const userone = await User.findOne({username:"zhangsan"})
    console.log("user查询结果：",userone)


    
    //排序:按照年龄逆向排序
    const userList = await User.find().sort({age:-1})
    
    console.log("按年龄逆向排序：",userList)


    //更新1条数据
    const updateResult = await User.findOneAndUpdate(
        {username:'zhangsan'}, //条件
        {age:33}, //更新内容
        {   
            new: true //配置项：返回更新后的数据
        }
    )
    console.log("更新后返回的结果:",updateResult)

    //批量更新
    const updateResultList = await User.updateMany(
        {city:"BeiJing"},
        {city:"ShangHai"},
        {
            new:true
        }
    )
   
   //删除1条数据
   const removeResult = await User.remove({username:'lisi'})

   //批量删除
   const removeResultList = await User.remove({
       city:"ShangHai"
   })

   console.log("删除几条数据：",removeResultList.deletedCount)

})();

