 import {BaseSlider} from './BaseSlider.js';
 //包装Promise
const newPromise=(el)=>{
	return new Promise(resolve=>{
		resolve(el);
	});
}
 const Banner1Config = {				//配置动画
	    initIndex: 0,						//初始化索引
		play:true,							// 是否自动切换
		animation: 'Move',    				//动画切换效果
		speed: 5000,						//自动播放时间
		PlaySpeed:1005,
		content:'carousel_list',
		item:'slider-item',
		focus:{
			isFocus:true,  					//是否添加图片焦点
			FocusClass:'circles',		//焦点框的class类名
			FocusActive:'current',		//选中状态焦点的class类名
			bindEvent:'click'
		},
		Btn:{
			isBtn:true, 					 //是否添加图片左右按钮
			prevBtn:'leftbtn',					 //prev按钮的class类名
			nextBtn:'rightbtn'					 //next按钮的class类名
		},
		callback:true,
		callbackStart(el){/*此处定义你想创建的回调函数动画*/
			newPromise(el).then(el=>{//調用包裝Promise，可以创建一系列异步操作
				//获取后代
				const Img = el.querySelector('img');
				Img.style.transform = `scale(1.08)`;
				Img.style.transition = `all 0.36s ease`; 				
				return Img;
			}).then(el=>{
				setTimeout(()=>{
					el.style.transform = `scale(1.15)`;
				},360,el);//setTitmeout第3个参数，可以给函数执行传参数(可以传多个参数)
			})	
		},
		callbackReset(el){/*此处定义重置回调函数动画*/
			const Img = el.querySelector('img');
			Img.style.transform = `scale(1)`;
		}
	  };



	  //继承父类
	  class Slider extends BaseSlider {
			constructor(el, options) {
				super(el, options);
			}		
	  }
	//导入axios
	import axios from 'api/ajax/axios.min.js';
	//导入常量
	import {icode} from 'api/CONTENTS';

	//获取模板
	import render from './carousel.art';
	//console.log(render()); 执行后获取模板中的内容

	const sliderURL =`https://www.imooc.com/api/mall-PC/index/slider?icode=${icode}`; //图片接口
	
	// const sliderURL2 = 'https://www.imooc.com/api/mall-PC/index/ad';
	
	const sliderlayout = document.getElementById('silderLayout');
	const loadingEl = sliderlayout.querySelector('#sliderLoading');

	//Slider轮播图片axios
	const Slider1=axios.get(sliderURL).then(response=>{		
		sliderlayout.innerHTML =render({items:response.data.data});

	}).then(()=>{
		const ban1 = new Slider(document.querySelector('#banner'),Banner1Config);
		loadingEl.classList.add('none');

	}).catch(err=>{
		console.log(err);
	});



