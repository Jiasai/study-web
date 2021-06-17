import './zsj.css';

const zsjlURL =`https://www.imooc.com/api/mall-PC/index/special_subject`; //接口


//导入axios
import axios from 'api/ajax/axios.min.js';


//获取模板
import render from './item.art';

//获取 包裹的 warp 元素
const zsjWarp = document.querySelector('.zsjsdlx .bd');

//导入LoadorNot
import {LoadorNot} from 'api/LoadorNot';
//是否加载数据
let done = true;
window.addEventListener('scroll',()=>{
if(LoadorNot(zsjWarp)&&done){

    axios.get(zsjlURL)
    .then(reponse=>{
        //console.log(reponse.data.data);
        zsjWarp.innerHTML = render(reponse.data.data);
    }).catch(err=>{
        console.log(err);
    });

done = false;
}
},false)