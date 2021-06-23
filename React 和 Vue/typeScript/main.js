var hello = 'TS学习';
// console.log(hello)
//void 、undefined 与 never
function printResult() {
    console.log('lalala...');
}
//1个函数，在没有任何返回的情况下，函数就是一个 void类型
function printResult1() {
    console.log('lalala...');
}
console.log('Hello', printResult1());
