import './xxsw.css';

const xxswURL =`https://www.imooc.com/api/mall-PC/index/seckill`; //接口


//导入axios
import axios from 'api/ajax/axios.min.js';

//获取模板
import render from './item.art';

//获取 包裹的 warp 元素
const xxswWarp = document.querySelector('.xxsw .layout-wrap');

//导入LoadorNot
import {LoadorNot} from 'api/LoadorNot';
//是否加载数据
let done = true;
window.addEventListener('scroll',()=>{
    if(LoadorNot(xxswWarp)&&done){

    axios.get(xxswURL)
    .then(reponse=>{
        //console.log(reponse.data.data);
        xxswWarp.innerHTML = render({items:reponse.data.data});
    }).catch(err=>{
        console.log(err);
    });

done = false;
    }
},false)