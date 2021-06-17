//引入 core-js处理 ES6 一些API不被编译的问题
import "core-js/stable";

//公共样式
import 'styles/reset.css';
import 'styles/base.css';
import 'styles/layout.css';
import 'icons/iconfont.css';

//引入自己的css
import './details.css';

//引入组件slider
import 'components/loading';
import './components/header';
import './components/main';
import './components/bottomBar';



//导入axios
import axios from 'axios/dist/axios';

//数据接口
import {detailsURL} from 'api/getURL.js';

//获取模板内容
import render from './components/main/main.art';



let id = window.location.search;
id=id.substr(id.indexOf('=')+1); //检索'='位置编号，substr()從第几位开始一直到结束截取子串；
const dataUrl= `${detailsURL}${id}`; //拼装数据接口


const MainContent = document.getElementById('details-main-content');

axios.get(dataUrl).then(
    response=>{
        MainContent.innerHTML=render(response.data.data);
    }
).catch(err=>{console.log(err)});


