let hello= 'TS学习'

// console.log(hello)

//void 、undefined 与 never
function printResult(){
    console.log('lalala...');
}
//1个函数，在没有任何返回的情况下，函数就是一个 void类型
function printResult1(): void{
    console.log('lalala...');
}

console.log('Hello',printResult1());

//void 是不存在，本身就不存在，undefined 是变量没赋值，没初始化

//never类型函数
//(1个函数永远无法执行完成，就是never类型)
//无限死循环，也是never类型
function throwError(message:string,errorCode:number){
    throw{
        message,
        errorCode
    }
}
throwError('not found',404);

//类型适配(类型断言) Type Assertions
//(改变初始变量的默认类型：类型适配)

let message : any;  //初始默认 any类型
message = 'abc';    //后续一直是any类型

//通知typescript编译器进行类型适配
//(<string>message)   //类型适配 string
let ddd = (<string>message).endsWith('c')

// 不使用(<string>) ,使用 as关键词 (as string)

let ddd2 = (message as string).endsWith('c')


//函数类型

let log = function(message){
    console.log(message);
}
let log2 = message => console.log(message);

//typeScript函数跟js一样，区别是可以给参数设置类型
let log3 = (message:string) => console.log(message);

// log3(4)  传入number参数4，类型不符，报错

let log4 = (message:string, code:number) => {
    console.log(message)
};

log4('Hello',5) 
//typeScript函数的，另一个区别：在调用函数时，如果函数定义了2个参数，我们调用时必须填写2个参数，并且类型要匹配，不然，编译器就会报错

//如果typeScript定义函数，想要设置参数的可选性，要加上 ？ 代表这个参数，可以传也可以省略不传，这是参数值是 undefined
let log5 = (message:string, code?:number) => {
    console.log(message)
};
//也可以设置默认值，实现省略参数
let log6 = (message:string, code:number = 0) => {
    console.log(message)
};

//可选参数和默认参数的设置顺序，必须是从右向左 设置

// TS的面对对象
const person = {
    firstName :  'Alex',
    lastName: '刘',
    age:18
}
console.log(person.age);
//TS中的对象

console.log(person.nickname);   
//ts中调用对象没有定义的变量，会报错，js中 不会报错

person.age = 'zhang';   
//对象一旦定义，内部的变量类型也初始确定，修改不符合的类型报错

person.address = '上海市'   //无法像js一样直接添加新属性

//(当我们直接把person定义成 any类型的时候，就跟js的对象一样了 const person: any = {....})

//ts中对象一旦定义，内部有且仅有定义好的属性，属性的类型也初始确定，非常精确，后续不可以添加属性，

//ts中 对象是 key to type 键类型对



















