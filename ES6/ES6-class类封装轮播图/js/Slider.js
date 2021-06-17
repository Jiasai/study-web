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
		PlaySpeed:605,
		content:'slider-content',
		item:'slider-item',
		itemLink:{
			isCreate:true,
			href:'data-href'
		},
		downLong:true,
		focus:{
			isFocus:true,  					//是否添加图片焦点
			FocusClass:'pagination',		//焦点框的class类名
			FocusItemClass:'',			//每项焦点的class类名
			FocusActive:'active',		//选中状态焦点的class类名
			bindEvent:'click'
		},
		Btn:{
			isBtn:true, 					 //是否添加图片左右按钮
			prevBtn:'prev',					 //prev按钮的class类名
			nextBtn:'next'					 //next按钮的class类名
		},
		touch:{
			touchEvent:true, //是否绑定移动事件
			slip:true,		//是否支持左右滑动
			follow:true    //是否滑动跟随
			
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
	

 const Banner2Config = {				
	    initIndex: 0,						
		play:false,							
		animation: 'showIn',   
		PlaySpeed:300,
		content:'slider-content',
		item:'slider-item',
		itemLink:{
			isCreate:false
		},
		downLong:false,
		focus:{
			isFocus:false,  					
			FocusClass:'pagination',		
			FocusItemClass:'',			//每项焦点的class类名
			FocusActive:'active',		//选中状态焦点的class类名
			bindEvent:'click'
		},
		Btn:{
			isBtn:false, 					
			prevBtn:'prev',					 
			nextBtn:'next'					 
		},
		touch:{
			touchEvent:true, //是否绑定移动事件
			slip:false,		//是否支持左右滑动
			follow:false    //是否滑动跟随
			
		},
		callback:false,
		callbackStart(el){/*此处定义你想创建的回调函数动画*/},
		callbackReset(el){/*此处定义重置回调函数动画*/}
	  };
 const Banner3Config = {				
	    initIndex: 0,						
		play:true,							
		animation: 'showIn',    
		speed: 4000,						//自动播放时间		
		content:'slider-content',
		item:'slider-item',
		itemLink:{
			isCreate:false
		},
		downLong:false,
		focus:{
			isFocus:true,  					
			FocusClass:'pagination',		
			FocusActive:'active',
			bindEvent:'click'
		},
		Btn:{
			isBtn:true, 					
			prevBtn:'prev',					 
			nextBtn:'next'					 
		},
		touch:{
			touchEvent:true, //是否绑定移动事件
			slip:true,		//是否支持左右滑动
			follow:false    //是否滑动跟随
			
		},
		callback:false,
		callbackStart(el){/*此处定义你想创建的回调函数动画*/},
		callbackReset(el){/*此处定义重置回调函数动画*/}
	  };
	  

	  //继承父类
	  class Slider extends BaseSlider {
			constructor(el, options) {
				super(el, options);
			}		
	  }
	  
	  const ban1 = new Slider(document.querySelector('#Slider1'),Banner1Config);
	  const ban2 = new Slider(document.querySelector('#Slider2'),Banner2Config);
	  const ban3 = new Slider(document.querySelector('#Slider3'),Banner3Config);
	  
	  
	  //为ban2焦点添加索引并绑定事件
	  ban2.foucusIndex();



