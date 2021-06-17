const flag = true;

if (flag) {
    const { sum, test } = require('./utils');
    //动态的，执行到这里，才引入模块

    const res = sum(15, 10);

    test();
    console.log(res);
}

//commonjs 导入模块语法可以放在一个 if语句里面去执行，需要时执行引入，是动态的

//ES6 Module 导入模块，必须要优先提前导入（下面的逻辑代码执行前就先导入模块），不可以被放在 if 语句代码中，是静态的




