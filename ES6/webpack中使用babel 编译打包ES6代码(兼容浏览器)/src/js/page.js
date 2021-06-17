import "core-js/stable";//引入 core-js处理 ES6 一些API不被编译的问题
//引入module模块
import {navMenu,menuConfig} from '../components/nav/nav.js';
import {setRemValue} from './components/setRemViewport.js';
import {goTop,topMenu,viewWidth,onLine} from './components/components.js';

//检测是IE浏览器8/9，跳转网址
if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") =="MSIE8.0"){
	window.location.href = "jianrong.html";
}
if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") =="MSIE9.0") {
	window.location.href = "jianrong.html";
}

//实例化执行移动端menu菜单
new navMenu(menuConfig);

//执行goTop返回顶部
goTop();
//在线客服
onLine();

//给window添加resize监听
window.addEventListener('resize',() => {
	
	setRemValue().then(()=>{//更新Rem值
		setTimeout(()=>{
			window.location.reload();//刷新页面
		},300);
	});
	
	
}, false);

//给window添加load监听
window.addEventListener('load',()=>{
	
	//更新Rem值
	setRemValue();
	/* ------------------------------------------ */
	
	
	
	
	
	
},false)


//window屏幕滚动事件
window.addEventListener('scroll',()=>{
	//菜单menu吸顶
	topMenu();
	
	
},false)



//阻止img默认事件
const imgDefault=(el)=>{
	el.addEventListener('mousedown',e=>{
		e.preventDefault();//阻止默认事件发生，不可以拖拽
	},false);
}	
//图片不可拖拽
const imgList = document.documentElement.querySelectorAll('img');
for (let img of imgList) {
	imgDefault(img);
}
	





