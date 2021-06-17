/* const age = 18;

const fn = ()=>{
	
}


//export default age;  			  导出变量/常量
//export default 20;			  导出数字
//export default {name:'张三'};   导出对象
// export default fn;  			  导出函数名
  export default function(){
	 alert('Hello')
	 } 							 导出函数体 
export default class {		  // 导出类
	constructor(name) {
	    this.name = name;
	}
}

// export default Person; 		 导出类名

 */

//export跟声明或语句
// export const age = 18;

// const age = 18;
// export {age};

/* export function fn() {
	console.log('fn被导出了');
} */


// export function () { }  错误，不可导出匿名的
// export class{ }  错误，不可导出匿名的

// export class className{}

// export const age = 18;


// 可以像上面一样，写一个导出一个

// function fn() {
// 	console.log('fn被导出了');
// }

// class className{}

// const age = 18;

// const add = (num1,num2) => console.log(num1+num2);
// // 也可以最后，统一的，一块儿导出

// //export{fn,className,age};

// // 导出时，起别名 通过 as
// export{fn as func,className,add,age};

// // export 和 export default 可以同时存在
// export default function(){alert('Hello')};

//不在 块级作用域中 , 不在 函数作用域中

if(typeof this !== 'undefined'){
	throw new Error('请使用模块的方式加载module.js');
}

let age = 20;
age += 10;
export {age};




























