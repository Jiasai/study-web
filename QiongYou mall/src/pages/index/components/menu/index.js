import './menu.css';

import {menuFun,bannerLis,ELmenuBox} from './menu';

const menuURL =`https://www.imooc.com/api/mall-PC/index/menu`; //菜单项

const RemenURL =`https://www.imooc.com/api/mall-PC/index/menu/hot`; //热门出发地

const hkURL =`https://www.imooc.com/api/mall-PC/index/menu/hk`; //港澳台

const JapanURL =`https://www.imooc.com/api/mall-PC/index/menu/japan`; //日本

const asiaURL =`https://www.imooc.com/api/mall-PC/index/menu/asia`; //亚洲

const euURL =`https://www.imooc.com/api/mall-PC/index/menu/eu`; //欧美

const auURL =`https://www.imooc.com/api/mall-PC/index/menu/au`; //澳新



//导入axios
import axios from 'api/ajax/axios.min.js';


//获取模板
import render from './navItem.art';

import menuBox from './menuBox.art';

import menuBoxitems from './menuBoxitems.art';



//获取 包裹的 warp 元素
const menuWarp = document.querySelector('#banner #banner-nav-ul');
const boxWarp = document.querySelector('#banner-nav .menus-box');


const xj1= axios.get(menuURL)
.then(reponse=>{

    //创建一级菜单，同时创建 menubox盒子
    menuWarp.innerHTML = render({items:reponse.data.data});
    boxWarp.innerHTML = menuBox({items:reponse.data.data})
})
.then(()=>{
    //执行函数
    menuFun();
    //批量绑定事件
    for (const itemLi of bannerLis) {
        itemLi.addEventListener('mouseenter', () => {
            
            const key = itemLi.getAttribute('data-t');
                           
            // 排他操作，让所有的盒子都去掉current类名
            for (let i = 0; i < ELmenuBox.length; i++) {
                ELmenuBox[i].className = 'menu';
              }
           
            // 寻找匹配的menu   
           let themenu = document.querySelector('.menus-box .menu[data-t=' + key + ']');
            // 匹配的这项加上current类名
           themenu.className = 'menu current'; 

            let menu_ChildURL = `${menuURL}/${key}`;
            if (itemLi.dataset.done === 'done') return; //阻止频繁请求
            axios.get(menu_ChildURL)
                .then(response=>{
                    //成功获取，改变属性'done'
                     itemLi.dataset.done = 'done';   
                     console.log(response.data.data);   
                     themenu.innerHTML = menuBoxitems({items:response.data.data,key});    
                })
                .catch(err => {
                    console.log(err);
                });
        
        },false);
    }

}).catch(err=>{
    console.log(err);
});


