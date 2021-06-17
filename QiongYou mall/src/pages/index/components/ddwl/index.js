import './ddwl.css';

const ddwlURL =`https://www.imooc.com/api/mall-PC/index/local_fun`; //接口

//导入axios
import axios from 'api/ajax/axios.min.js';

//获取模板
import render from './item.art';

//获取 包裹的 warp 元素
const ddwlWarp = document.querySelector('.ddwl .bd');

//导入LoadorNot
import {LoadorNot} from 'api/LoadorNot';
//是否加载数据
let done = true;
window.addEventListener('scroll',()=>{
    if(LoadorNot(ddwlWarp)&&done){


//开始获取数据，添加到html
axios.get(ddwlURL)
.then(reponse=>{
    //console.log(reponse.data.data);
    ddwlWarp.innerHTML = render(reponse.data.data);
}).catch(err=>{
    console.log(err);
});



    done = false;
    }
},false)