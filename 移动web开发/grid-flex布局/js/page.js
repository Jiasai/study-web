//引入slider
import {navMenu,menuConfig} from '../components/nav/nav.js';
import {slider,business} from './components/Slider.js';
import {setRemValue} from './components/setRemViewport.js';
import {goTop,topMenu,viewWidth} from './components/components.js';

//实例化执行
new navMenu(menuConfig);

//执行goTop返回顶部
goTop();

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
	//slider动画	
	const indexSlider = slider();
	if(viewWidth<769){
		let BigJianjie = document.querySelectorAll('.slider-item p.big-jianjie');
		for (let item of BigJianjie) {
			item.innerHTML = item.innerText;
		}
	}
	/* ------------------------------------------ */
	
	//业务范围
	const indexBusiness = business();
	//为业务范围焦点添加索引并绑定事件
	indexBusiness.foucusIndex();
	
	/* ------------------------------------------ */

	
},false)


//window屏幕滚动事件
window.addEventListener('scroll',()=>{
	//菜单menu吸顶
	topMenu();
	
	
},false)









