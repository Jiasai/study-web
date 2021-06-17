import "core-js/stable";
//引入 core-js处理 ES6 一些API不被编译的问题

import './index.css'; //js中接收css文件
import imgSRC from './images/keChengList.png'; //js中接收img文件
let KClis = document.getElementById('kechengList');
const EL_img = document.createElement('img');
EL_img.src = imgSRC;
KClis.appendChild(EL_img);