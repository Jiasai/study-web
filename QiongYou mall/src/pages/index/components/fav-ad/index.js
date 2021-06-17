import './fav-ad.css';


const adURL =`https://www.imooc.com/api/mall-PC/index/ad`; //广告接口


//导入axios
import axios from 'api/ajax/axios.min.js';

//获取模板
import render from './item.art';

//获取 包裹的 warp 元素
const adWarp = document.querySelector('.hot-ads .center-wrap');


axios.get(adURL)
.then(reponse=>{
    //console.log(reponse.data.data);
    adWarp.innerHTML = render({items:reponse.data.data});
}).catch(err=>{
    console.log(err);
});