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
		speed: 8000,						//自动播放时间
		PlaySpeed:1005,
		content:'slider-content',
		item:'slider-item',
		itemLink:{
			isCreate:true,
			href:'data-href'
		},
		focus:{
			isFocus:true,  					//是否添加图片焦点
			FocusClass:'dots',				//焦点框的class类名
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
				el.className = `slider-item start`;			
				return el;
			}).then(el=>{
				setTimeout(()=>{
					el.className = `slider-item start twoStart`;
				},1200,el);//setTitmeout第3个参数，可以给函数执行传参数(可以传多个参数)
			});			
		},
		callbackReset(el){/*此处定义重置回调函数动画*/
			el.className = `slider-item`;
		}
	  };


const slider2Config = {				
	    initIndex: 0,						
		play:false,							
		animation: 'showIn',   
		PlaySpeed:50,
		content:'slider-content',
		item:'slider-item',
		downLong:false,
		focus:{
			isFocus:false,  					
			FocusClass:'pagination',	
			FocusItemClass:'BusinessBtn col-8 col-md-4 col-xl-6',
			FocusActive:'BusinessBtn active col-8 col-md-4 col-xl-6',
			bindEvent:'click'
		},
		touch:{
			touchEvent:true, //是否绑定移动事件
			slip:false,		//是否支持左右滑动
			follow:false    //是否滑动跟随
			
		},
		Btn:{
			isBtn:false, 					
			prevBtn:'prev',					 
			nextBtn:'next'					 
		},
		callback:true,
		callbackStart(el){/*此处定义你想创建的回调函数动画*/
			newPromise(el).then(el=>{//調用包裝Promise，可以创建一系列异步操作
				el.className = `slider-item start`;			
				return el;
			})
		},
		callbackReset(el){/*此处定义重置回调函数动画*/
			el.className = `slider-item`;
		}
	  };


// if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") ==
// 				"MSIE8.0") {
// 				window.location.href = "jianrong.html";
// 			}

	  //继承父类
	  class Slider extends BaseSlider {
			constructor(el, options) {
				super(el, options);
			}		
	  }
	
	const slider=()=>{
		return new Slider(document.querySelector('#slider'),Banner1Config);
	}
	const business=()=>{
		return new Slider(document.querySelector('#productBusiness'),slider2Config);
	}
	
	
	export {slider,business};

