import "core-js/stable";
//引入 core-js处理 ES6 一些API不被编译的问题

import age from './module.js';


const addFuc = (x,y)=> x + y;
console.log(addFuc(2,4));

new Promise((resolve,reject)=>{
	resolve('成功');
}).then(data=>{
	console.log(data);
});

Array.from([1,2]);
class Person{
	constructor(name) {
	    Object.assign(this,{name,age});
	}
}
new Person('李四',18);

console.log('index.js',age);