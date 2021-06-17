 import {BaseSlider} from './BaseSlider.js';
 
 const Banner1Config = {				//配置动画
	    initIndex: 0,						//初始化索引
		play:true,							// 是否自动切换
		animation: 'Move',    				//动画切换效果
		speed: 5000,						//自动播放时间
		PlaySpeed:605,
		focus:{
			isFocus:true,  					//是否添加图片焦点
			FocusClass:'pagination',		//焦点框的class类名
			FocusActive:'active',//选中状态焦点的class类名
			bindEvent:'click'
		},
		Btn:{
			isBtn:true, 					 //是否添加图片左右按钮
			prevBtn:'prev',					 //prev按钮的class类名
			nextBtn:'next'					 //next按钮的class类名
		}
	  };


	  //继承父类
	  class Slider extends BaseSlider {
			constructor(el, options) {
				super(el, options);
			}		
	  }
	  
	  export {Banner1Config,Slider};
	


