import {
 	BaseSlider
 } from './BaseSlider.js';

//子类参数默认值
const ZiLeiDEFAULTS = {
	column:3,
	moveNum:1
}

 //继承父类
 class KapianSlider extends BaseSlider {
 	constructor(el, options) {			
		//给子类新增参数，设置默认值
		options = {...ZiLeiDEFAULTS,...options}
		super(el, options);	
		
 	}

	//创建焦点
	CreateFcous(length,focus){
		
		if(this.moveNum !==1) {
			//this.column*this.moveNum			
			if(length/this.moveNum <2){
				this.moveNum = length/2;
				length = 2;				
			}else{
				length = length/this.moveNum;
			}
			
			this.maxIndex =length-1;
			
		}
		
		const {isFocus,FocusClass,FocusActive}=focus;
		if(!isFocus) return ;
		for (let i = 0; i < length; i++) {
			let spanNode = document.createElement('span');			
			this.focusArr.push(spanNode);
		}
		this.focusArr[this.options.initIndex].className = `${FocusActive}`;
		const ElFOCUS = this.slider.querySelector(`.${FocusClass}`);
		for (let focusSpan of this.focusArr) {
			ElFOCUS.appendChild(focusSpan);
			
		}
		//为焦点创建索引并绑定事件
		this.foucusIndex();
		
		
	}
	



 	// Move动画初始设置
 	MoveInit() {
 		//重写子类 moveInit				
		this.column = this.options.column;
		this.moveNum = this.options.moveNum;
		
 		if (this.animation == 'Move') {
 			let wid = this.contentWid / this.column;
 			let maxWid = wid * (this.sliderItems.length + this.column + 1);
 			//设置 content宽度
 			this.sliderContent.style.width = `${maxWid}px`;
 			this.sliderContent.style.position = 'relative';
 			//设置 item的宽度，float排列
 			for (let Divitem of this.sliderItems) {
 				Divitem.style.position = 'inherit';
 				Divitem.style.left = 'inherit';
 				Divitem.style.width = `${wid}px`;
 				Divitem.style.float = 'left';
 				Divitem.style.transition = 'none';
 				Divitem.style.opacity = 1;
 			}
 		
 			// // 克隆第一张图片，追加到 content 中；
 		
			for (let i = 0; i< this.column; i++) {
				const CloneItem = this.sliderItems[i].cloneNode(true);
				this.sliderContent.appendChild(CloneItem);
			}
 		
 		
 		
 		}
 	}


 	// Move左右拉动效果
 	Move(Index) {
 		//重写子类 Move
 		if (Index <= this.maxIndex && Index >= this.minIndex) {
 			this.sliderContent.style.transition = `all ${this.PlaySpeed/1000}s ease 0s`;
 			this.sliderContent.style.left = `${-Index * this.contentWid/2/this.column*this.moveNum}px`;
 			//修改焦点
 			this.FocusActive(Index);
 		} else if (Index > this.maxIndex) { // 处在最后1张 往 右 拉动
 			setTimeout(() => {
 				this.sliderContent.style.transition = 'none';
 				this.sliderContent.style.left = `0px`;
 				//修改焦点
 				this.FocusActive(this.currIndex);
 			}, this.PlaySpeed);
 			this.sliderContent.style.left = `${-Index * this.contentWid/2/this.column*this.moveNum}px`;
 		} else { // 处在第1张 往 左 拉动			
 			//消除动画效果，瞬间改变left值至 最后1张图，再往左 多一张图的位置；
 			this.sliderContent.style.transition = 'none';
 			this.sliderContent.style.left = `${-(this.maxIndex+1) * this.contentWid/2/this.column*this.moveNum}px`;
 			setTimeout(() => {
 				//然后马上执行，往最后1张图的过渡动画；
 				this.sliderContent.style.transition = `all ${this.PlaySpeed/1000}s ease 0s`;
 				this.sliderContent.style.left = `${-this.maxIndex * this.contentWid/2/this.column*this.moveNum}px`;

 				//修改焦点
 				this.FocusActive(this.currIndex);
 			}, 5);

 		}

 	}








 }


 const KapianConfig = {
 	initIndex: 0,
 	play: true,
 	animation: 'Move',
 	speed: 3000, //自动播放时间
 	PlaySpeed: 605,
	column:4,
 	moveNum:1,
 	focus: {
 		isFocus: true,
 		FocusClass: 'pagination',
 		FocusActive: 'active',
 		bindEvent: 'click'
 	},
 	Btn: {
 		isBtn: true,
 		prevBtn: 'prev',
 		nextBtn: 'next'
 	}
 };


 const product4 = new KapianSlider(document.querySelector('#Slider4'), KapianConfig);
