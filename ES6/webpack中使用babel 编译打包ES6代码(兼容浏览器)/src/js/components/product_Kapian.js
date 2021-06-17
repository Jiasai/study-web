import {BaseSlider} from './BaseSlider.js';

//子类参数默认值
const ZiLeiDEFAULTS = {
	column:3,
	moveNum:1,
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
		const viewWidth = window.innerWidth||document.documentElement.clientWidth||document.documentElement.getBoundingClientRect().width;//兼容性写法，获取屏幕宽度
		if(length<=this.column && viewWidth>769) return;

		if(this.moveNum !==1) {
			//this.column*this.moveNum	
			if(viewWidth<769){this.moveNum = 1;}else{
				if(length/this.moveNum <2){
					this.moveNum = 1;		
				}else if((length/this.moveNum)%1!==0){
					this.moveNum = 1;	
				}else{
					length = length/this.moveNum;
				}	
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

		const viewWidth = window.innerWidth||document.documentElement.clientWidth||document.documentElement.getBoundingClientRect().width;//兼容性写法，获取屏幕宽度
 		if (this.animation == 'Move') {
			let wid=0;
			if(viewWidth>=769){
				wid = this.slider.offsetWidth / this.column;
			}else{
				wid = this.slider.offsetWidth + 30;
				
			}			
			this.movewids = wid;
 			let maxWid = wid * (this.sliderItems.length + this.column + 1);
 			//设置 content宽度
 			this.sliderContent.style.width = `${maxWid}px`;
 			this.sliderContent.style.position = 'relative';
			this.sliderContent.style.display='block';
 			//设置 item的宽度，float排列
 			for (let Divitem of this.sliderItems) {
 				Divitem.style.position = 'inherit';
 				Divitem.style.left = 'inherit';
 				Divitem.style.width = `${wid-30}px`;
				Divitem.style.margin = `0px 15px`;
 				Divitem.style.float = 'left';
 				Divitem.style.transition = 'none';
 				Divitem.style.opacity = 1;
 			}
 		
 			// 克隆第一张图片，追加到 content 中；
			if(this.sliderItems.length<=this.column){
				if(viewWidth>769){
					this.prevNode.style.display='none';
					this.nextNode.style.display='none';
				}
			};		
			const length=(this.sliderItems.length < this.column)?this.sliderItems.length:this.column;
			// 克隆前面的图加到最后
			for (let i = 0; i< length; i++) {
				const CloneItem = this.sliderItems[i].cloneNode(true);
				this.sliderContent.appendChild(CloneItem);
			}
			
 		}
 	}


 	// Move左右拉动效果
 	Move(Index) {
		const viewWidth = window.innerWidth||document.documentElement.clientWidth||document.documentElement.getBoundingClientRect().width;//兼容性写法，获取屏幕宽度
		if(this.sliderItems.length<=this.column&&viewWidth>769) return;
		return new Promise(resolve=>{			
 		//重写子类 Move
 		if (Index <= this.maxIndex && Index >= this.minIndex) {
 			this.sliderContent.style.transition = `all ${this.PlaySpeed/1000}s ease 0s`;
 			this.sliderContent.style.transform = `translateX(${-Index * this.movewids*this.moveNum}px)`;
			 //this.sliderContent.style.transform = `translateX(${-Index * this.contentWid}px)`;	
 			//修改焦点
 			this.FocusActive(Index);			
			 //动画执行完毕后，执行成功态 resolve
			setTimeout(resolve,this.PlaySpeed-10,this.sliderItems[Index]);

 		} else if (Index > this.maxIndex) { // 处在最后1张 往 右 拉动
 			setTimeout(() => {
 				this.sliderContent.style.transition = 'none';
 				this.sliderContent.style.transform = `translateX(0px)`;				
				//动画执行完毕后，执行成功态 resolve
				resolve(this.sliderItems[this.currIndex]);
 			}, this.PlaySpeed);
			//修改焦点
			this.FocusActive(Index);
			this.sliderContent.style.transition =`all ${this.PlaySpeed/1000}s ease 0s`;
 			this.sliderContent.style.transform = `translateX(${-Index * this.movewids*this.moveNum}px)`;
 		} else { // 处在第1张 往 左 拉动			
			//修改焦点
			this.FocusActive(Index);
 			//消除动画效果，瞬间改变left值至 最后1张图，再往左 多一张图的位置；
 			this.sliderContent.style.transition = 'none';
 			this.sliderContent.style.transform = `translateX(${-(this.maxIndex+1) * this.movewids*this.moveNum}px)`;
 			setTimeout(() => {
 				//然后马上执行，往最后1张图的过渡动画；
 				this.sliderContent.style.transition = `all ${this.PlaySpeed/1000}s ease 0s`;
 				this.sliderContent.style.transform = `translateX(${-this.maxIndex * this.movewids*this.moveNum}px)`;

				//动画执行完毕后，执行成功态 resolve
				setTimeout(resolve,this.PlaySpeed-10,this.sliderItems[this.currIndex]);

 			},20);

 		}
		})
 	}



 }


 const KapianConfig = {
 	initIndex: 0,
 	play: false,
 	animation: 'Move',
 	speed: 3000, //自动播放时间
 	PlaySpeed: 605,
	column:3,
 	moveNum:3,
	content:'slider-content',
	item:'slider-item',
	downLong:false,
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
 	},
	touch:{
		touchEvent:true, //是否绑定移动事件
		slip:true,		//是否支持左右滑动
		follow:false    //是否滑动跟随
		
	},
	callback:true,
	callbackStart(el){/*此处定义你想创建的回调函数动画*/},
	callbackReset(el){/*此处定义重置回调函数动画*/}
 };
 
 const kaipianProduct=()=>{
	
 	const kaipianSlider = new KapianSlider(document.querySelector('#productSlider'), KapianConfig);
	//初始化第一张
	kaipianSlider.FirstPic(`slider-item start product-ninegrid-item col-md`);
	return kaipianSlider;
 }

export {kaipianProduct};


