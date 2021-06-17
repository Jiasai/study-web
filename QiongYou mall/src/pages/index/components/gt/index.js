import './gt.css';



const gtURL =`https://www.imooc.com/api/mall-PC/index/group_tour`; //跟团接口

//导入axios
import axios from 'api/ajax/axios.min.js';


//获取模板
import render from './item.art';

//获取 包裹的 warp 元素
const gtbzzyWarp = document.querySelector('.gtbzzy .bd');

//导入LoadorNot
import {LoadorNot} from 'api/LoadorNot';
//是否加载数据
let done = true;
window.addEventListener('scroll',()=>{
if(LoadorNot(gtbzzyWarp)&&done){

    axios.get(gtURL)
    .then(reponse=>{
        //console.log(reponse.data.data);
        gtbzzyWarp.innerHTML = render(reponse.data.data);
    }).catch(err=>{
        console.log(err);
    });

done = false;
}
},false)