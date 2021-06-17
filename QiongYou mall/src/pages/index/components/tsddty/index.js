import './tsddty.css';

const tsddtyURL =`https://www.imooc.com/api/mall-PC/index/local_exp`; //特色当地体验接口




//导入axios
import axios from 'api/ajax/axios.min.js';

//获取模板
import render from './item.art';

//获取 包裹的 warp 元素
const tsddtyWarp = document.querySelector('.tsddty .bd');

//导入LoadorNot
import {LoadorNot} from 'api/LoadorNot';
//是否加载数据
let done = true;
window.addEventListener('scroll',()=>{
if(LoadorNot(tsddtyWarp)&&done){

        axios.get(tsddtyURL)
        .then(reponse=>{
            //console.log(reponse.data.data);
            tsddtyWarp.innerHTML = render({items:reponse.data.data});
        }).catch(err=>{
            console.log(err);
        });


done = false;
}
},false)