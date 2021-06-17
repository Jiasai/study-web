import './jjzyx.css';


//导入axios
import axios from 'api/ajax/axios.min.js';
//导入常量
import {icode} from 'api/CONTENTS';

//获取模板
import render from './item.art';

//获取 包裹的 warp 元素
const bdWarp = document.querySelector('.jjzyx .bd');

const sliderURL =`https://www.imooc.com/api/mall-PC/index/self_guided_tour?icode=${icode}`; //图片接口

//导入LoadorNot
import {LoadorNot} from 'api/LoadorNot';
//是否加载数据
let done = true;
window.addEventListener('scroll',()=>{
    if(LoadorNot(bdWarp)&&done){

        axios.get(sliderURL)
        .then(reponse=>{
            //console.log(reponse.data.data);
            bdWarp.innerHTML = render(reponse.data.data);
            
        }).catch(err=>{
            console.log(err);
        });

    done = false;
    }
},false)
