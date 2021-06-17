// 默认参数
const DEFAULTS = {
    // 初始索引
    initIndex: 0,   
	play:true,							// 是否自动切换
    animation: 'showIn',                // 动画方式参数：'showIn' 、'Move'
    speed: 1000,						//自动播放时间
	PlaySpeed:300,						// 切换速度，单位 ms
	content:'slider-content',
	item:'slider-item',
	focus:{
		isFocus:true,  					//是否添加图片焦点
		FocusClass:'pagination',		//焦点框的class类名
		FocusActive:'active',			//选中状态焦点的class类名
		bindEvent:'click'				// 焦点事件：'click' 、'hover'
	},
	Btn:{
		isBtn:true, 					 //是否添加图片左右按钮
		prevBtn:'prev',					 //prev按钮的class类名
		nextBtn:'next'					 //next按钮的class类名
	},
	timer:'',							//设置定时器
	lock:true,							//设置函数节流：锁
	contentWid:'',						//content宽度；
	callback:false,
	callbackStart(el){/*此处定义你想创建的回调函数动画*/},
	callbackReset(el){/*此处定义重置回调函数动画*/},
	prevEL:'',
	Then:'',
};

//常量
const ELEMENT_NODE = 1;



class BaseSlider{
	
	constructor(el,options) {
		
	    if (el.nodeType !== ELEMENT_NODE)
	        throw new Error('实例化的时候，请传入 DOM 元素！');
	    
	    // 实际参数
	    this.options = {
	        ...DEFAULTS,
	        ...options
	    };

		const slider = el;
		const sliderContent = slider.querySelector(`.${this.options.content}`);
		const sliderItems = sliderContent.querySelectorAll(`.${this.options.item}`);
		
		// 添加到 this 上，为了在方法中使用
		this.slider = slider;
		this.sliderContent = sliderContent;
		this.sliderItems = sliderItems;
		
		
		this.animation = this.options.animation;
		this.focus = this.options.focus;
		this.focusArr =[];
		this.Btn = this.options.Btn;
		this.timer = this.options.timer;
		this.lock = this.options.lock;
		this.PlaySpeed = this.options.PlaySpeed;
		//回调函数
		this.callback = this.options.callback;
		this.callbackStart = this.options.callbackStart;
		this.callbackReset = this.options.callbackReset;
		this.Then = this.options.Then;
		this.prevEL = this.options.prevEL;

		this.minIndex = 0;
		this.maxIndex = sliderItems.length - 1;		
		this.currIndex = this.getCorrectedIndex(this.options.initIndex);
		//content宽度
		this.options.contentWid = this.slider.offsetWidth;
		this.contentWid = this.options.contentWid;
		
		//初始化
		this.init();
		//绑定 焦点事件 和 btn事件
		
	}
	
	// 获取修正后的索引值
	// 切换index索引
	getCorrectedIndex(index) {
			if (index < this.minIndex) return this.maxIndex;
			if (index > this.maxIndex) return this.minIndex;
			return index;			 
	}
	
	// 初始化
	init() {

		//Move动画初始设置
		this.MoveInit();
		
		//创建focus焦点，并绑定事件
		this.CreateFcous(this.sliderItems.length,this.focus);
		
		//创建左右按钮，并绑定事件
		this.CreateBtn(this.Btn);
		
		//初始化第一张
		this.FirstPic();
		
		//自动切换轮播开关
		this.switch(this.options.play);
	}
	
	//创建焦点
	CreateFcous(length,focus){
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
	
	//为焦点添加索引值并绑定事件
	foucusIndex(){
		
		const focusKuang = this.slider.querySelector(`.${this.focus.FocusClass}`);
		const focusSpan = focusKuang.querySelectorAll(`.${this.focus.FocusClass} span`);
		for (let i = 0; i < focusSpan.length; i++) {
			//为焦点添加索引
			focusSpan[i].dataset.name = i;
			//为焦点绑定事件			
		}
		if(this.focus.bindEvent === 'click'){
			this._clickEvent(focusKuang,this.FocusPlay,this);	
		}else{
			this._hoverEvent(focusKuang,this.hoverFocusPlay);
		}
		
	}
	
	//创建左右按钮
	CreateBtn(Btn){
		const {isBtn,prevBtn,nextBtn}=Btn;
		if(!isBtn) return ;
		const prevNode = document.createElement('div');
		const nextNode = document.createElement('div');
		const prev_I = document.createElement('i');
		const next_I = document.createElement('i');
		prevNode.appendChild(prev_I);
		nextNode.appendChild(next_I);
		prevNode.className = `${prevBtn}`;
		nextNode.className = `${nextBtn}`;
	
		this.slider.appendChild(prevNode);
		this.slider.appendChild(nextNode);

		this._clickEvent(prevNode,this.prev,this);
		this._clickEvent(nextNode,this.next,this);
	}
	
	
	// showIn淡入动画
	showIn(index,opacity){
		return new Promise(resolve=>{
			this.FocusActive(index);
	    	this.sliderItems[index].style.opacity = opacity;
			//动画执行完毕后，执行成功态 resolve
			setTimeout(resolve,this.PlaySpeed-10,this.sliderItems[index]);
		})
	}
	// showOut淡出动画
	showOut(currIndex,Toindex,opacity){	
	    this.sliderItems[currIndex].style.opacity = opacity;
		setTimeout(()=>{
			this.Then = this.showIn(Toindex,1);			
		},5);
	}
	
	// Move动画初始设置
	MoveInit(){
	  if(this.animation =='Move'){
			let wid = this.contentWid;
			let maxWid = wid*(this.sliderItems.length+2);
			//设置 content宽度
			this.sliderContent.style.width = `${maxWid}px`;
			this.sliderContent.style.position = 'relative';
			//设置 item的宽度，float排列
			for(let Divitem of this.sliderItems){
				Divitem.style.position = 'relative';
				Divitem.style.left = 'inherit';
				Divitem.style.width = `${wid}px`;
				Divitem.style.float = 'left';	
				Divitem.style.transition = 'none';
				Divitem.style.opacity = 1;
			}
			
			// 克隆第一张图片，追加到 content 中；
			const LastItem = this.sliderItems[this.minIndex].cloneNode(true);
			this.sliderContent.appendChild(LastItem);
			
			
	  }
	}
	
	// Move左右拉动效果
	Move(Index,prevIndex){
		return new Promise(resolve=>{
		if(Index <= this.maxIndex && Index>= this.minIndex) {
			this.sliderContent.style.transition =`all ${this.PlaySpeed/1000}s ease 0s`;
			this.sliderContent.style.transform = `translateX(${-Index * this.contentWid}px)`;		
			
			//修改焦点
			this.FocusActive(Index);
			//动画执行完毕后，执行成功态 resolve
			setTimeout(resolve,this.PlaySpeed-10,this.sliderItems[Index]);
			this.prevEL =  this.sliderItems[prevIndex];

		}else if(Index > this.maxIndex){ // 处在最后1张 往 右 拉动
			setTimeout(()=>{
				this.sliderContent.style.transition = 'none';
				this.sliderContent.style.transform =`translateX(0px)`;	
								
				//修改焦点
				this.FocusActive(this.currIndex);

				//动画执行完毕后，执行成功态 resolve
				resolve(this.sliderItems[this.currIndex]);

				this.prevEL =  this.sliderItems[this.maxIndex];

			},this.PlaySpeed);
			this.sliderContent.style.transform = `translateX(${-Index * this.contentWid}px)`;
		}else{    // 处在第1张 往 左 拉动			
			//消除动画效果，瞬间改变left值至 最后1张图，再往左 多一张图的位置；
			this.sliderContent.style.transition = 'none'; 
			this.sliderContent.style.transform = `translateX(${-(this.maxIndex+1) * this.contentWid}px)`;
			setTimeout(()=>{
				//然后马上执行，往最后1张图的过渡动画；
				this.sliderContent.style.transition =`all ${this.PlaySpeed/1000}s ease 0s`;
				this.sliderContent.style.transform = `translateX(${-this.maxIndex * this.contentWid}px)`;	
				
				//修改焦点
				this.FocusActive(this.currIndex);

				//动画执行完毕后，执行成功态 resolve
				setTimeout(resolve,this.PlaySpeed-10,this.sliderItems[this.currIndex]);
				this.prevEL =  this.sliderItems[this.minIndex];
			},5);
			
		}		
		})
	}
	
	// 切换到 当前 索引对应的幻灯片
	to(currIndex,ToIndex) {
		if (!this.lock) return;
		this.lock = false;		
		
		let index = this.getCorrectedIndex(ToIndex);
		// if (this.currIndex === index){
		// 	console.log('阻塞'); //这段代码容易阻塞 动画，删除
		// } 
		if(this.animation =='showIn'){
			this.prevEL =  this.sliderItems[currIndex];
			this.showOut(currIndex,index,0);			
		}else{
			//ToIndex 是要切换到 那张图的 索引 
			this.Then = this.Move(ToIndex,currIndex);
		}		
		this.currIndex = index;				
		//函数节流，函数执行完毕，300毫秒后，解锁
		setTimeout(()=>{
		 	this.lock = true;	
			this.Callback();		
		},this.PlaySpeed)
	}
	
	// 按钮切换上一张
	prev() {		
	    this.to(this.currIndex,this.currIndex - 1);
	}
	
	// 按钮切换下一张
	next() {		
	    this.to(this.currIndex,this.currIndex + 1);
	}
	
	//点击焦点切换
	FocusPlay(ev){
		//首先判断 点击到的是 span 焦点，不是空白缝隙区域
		if (ev.target.tagName.toLowerCase() == 'span' ) {
			//获取事件源元素 索引					
			let index = Number(ev.target.dataset.name);	
			if(this.currIndex === this.maxIndex){				
				if(index === this.minIndex){
					//console.log('去第一张');
					this.next();
				}else{
					this.to(this.currIndex,index);
				}
			}else if(this.currIndex === this.minIndex){
				//console.log('去最后一张');
				if(index === this.maxIndex){
					this.prev();
				}else{
					this.to(this.currIndex,index);
				}
			}else{
				this.to(this.currIndex,index);
			}		
		}
	}
	
	//滑过焦点切换
	hoverFocusPlay(ev){
		//首先判断 滑国的是 span 焦点，不是空白缝隙区域
		if (ev.target.tagName.toLowerCase() == 'span' ) {
			//获取事件源元素 索引					
			let index = Number(ev.target.dataset.name);	
			this.to(this.currIndex,index);
		}
	}
	
	FocusActive(index){
		const focusKuang = this.slider.querySelector(`.${this.focus.FocusClass}`);
		const focusSpanArr = focusKuang.querySelectorAll(`.${this.focus.FocusClass} span`);
		for (let focusSpan of focusSpanArr) {
			focusSpan.className ='';
		}
		focusSpanArr[index].className = `${this.focus.FocusActive}`;
	}
	
	//自动播放轮播图
	Autoplay(lockplay){
		if(!lockplay) return;
		//备份 this
		//let self = this;
		
		//设表先关
		clearInterval(this.timer);
		this.timer = setInterval(()=>{ 
		//console.log(self); 使用箭头函数，避免了备份上下文，自动向上查找 this
			this.to(this.currIndex,(this.currIndex + 1));
		},this.options.speed);
		
		
	}
	
	//自动切换轮播开关
	switch(lockplay){		
		if(!lockplay) return;
	
		this.Autoplay(this.options.play);
		this.slider.addEventListener('mouseenter',()=>{
			//清除定时器自动播放
			clearInterval(this.timer);
		});
		this.slider.addEventListener('mouseleave',()=>{
			//自动切换动画
			this.Autoplay(this.options.play);
		})
	}
	
	// 获取当前索引
	getCurrIndex() {
	    return this.currIndex;
	}
	
	
	//绑定点击事件
	_clickEvent(el,func,self){
		el.addEventListener('click',function(ev){	
			//清除定时器自动播放
			clearInterval(self.timer);
			func.call(self,ev); // 通过.call方法给事件触发函数传递 上下文 和 ev事件源
		},false)
	}
	//绑定滑过事件
	_hoverEvent(el,func){
		el.addEventListener('mouseenter',ev=>{	
			//清除定时器自动播放
			clearInterval(this.timer);			
			func.call(this,ev); // 通过.call方法给事件触发函数传递 上下文 和 ev事件源
		},true)
	}
	
	//执行完动画，回调执行
	Callback(){
		if(!this.callback) return;
		this.Then.then(el=>{
			this.callbackStart(el);
			return el;
		}).then(el=>{
			this.callbackReset(this.prevEL);
		})
		.catch(err=>{
			this.callback = false;
			throw new Error('回调执行函数出错');
			
		})
	}


	//初始化第一张：
	FirstPic(){
		setTimeout(()=>{ 
			this.sliderItems[this.options.initIndex].className = `${this.options.item} active`;
		},300)
		
	}
}



//导出
export {BaseSlider};