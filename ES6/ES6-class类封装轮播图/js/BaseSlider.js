// 默认参数
const DEFAULTS = {
    // 初始索引
    initIndex: 0,   
	play:true,							// 是否自动切换
    animation: 'showIn',                // 动画方式参数：'showIn' 、'Move'
    speed: 5000,						//自动播放时间
	PlaySpeed:600,						// 切换速度，单位 ms
	content:'slider-content',
	item:'slider-item',
	itemLink:{
		isCreate:false,
		href:'data-href'
	},
	downLong:false,
	focus:{
		isFocus:true,  					//是否添加图片焦点
		FocusClass:'pagination',		//焦点框的class类名
		FocusItemClass:'',				//每项焦点的class类名
		FocusActive:'active',			//选中状态焦点的class类名
		bindEvent:'click'				// 焦点事件：'click' 、'hover'
	},
	Btn:{
		isBtn:true, 					 //是否添加图片左右按钮
		prevBtn:'prev',					 //prev按钮的class类名
		nextBtn:'next'					 //next按钮的class类名
	},
	touch:{
		touchEvent:true, //是否绑定移动事件
		slip:false,		//是否支持左右滑动
		follow:false    //是否滑动跟随
		
	},
	timer:'',							//设置定时器
	lock:true,							//设置函数节流：锁
	contentWid:'',						//content宽度；
	callback:false,
	callbackStart(el){/*此处定义你想创建的回调函数动画*/},
	callbackReset(el){/*此处定义重置回调函数动画*/},
	prevEL:'',
	Then:'',
	linktrue:false,
	tbool:false
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
		this.slider.style.position = 'relative';
		this.slider.style.width = '100%';
		this.sliderContent = sliderContent;
		this.sliderItems = sliderItems;
		
		
		this.animation = this.options.animation;
		this.focus = this.options.focus;		
		this.focusArr =[];
		this.focusKuang = this.slider.querySelector(`.${this.options.focus.FocusClass}`);
		this.Btn = this.options.Btn;
		this.prevNode='';
		this.nextNode='';
		this.timer = this.options.timer;
		this.lock = this.options.lock;
		this.PlaySpeed = this.isMobile()?Math.ceil(this.options.PlaySpeed/1.5):this.options.PlaySpeed;
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
		this.contentHeig = this.slider.offsetHeight;
		
		
		//鼠标长按相关
		this.creatLink = this.options.itemLink.isCreate;
		this.Linkhref = this.options.itemLink.href;
		this.currentEl = '';
		this.linktrue = this.options.linktrue;
		this.timerout = '';//用于存储定时器的变量
		this.ClientX=0;
		this.ClientY=0;
		this.downLong = this.options.downLong;
		this.tbool = this.options.tbool;
		this.moveX = 0;//x方向拖拽距离
		this.moveY=0;//y方向拖拽距离
		this.PCslip='';
		this.zuseBool=false;
		
		//touch移动端相关
		this.startX = 0;
		this.startY = 0;
		this.touchoption= this.options.touch;
		this.slip='1';
		this.locktouch=true;
		this.locktouch2=true;
		this.locktouch3=true;
		this.swipe=false;
		
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
		this.currentEl = this.FirstPic(`${this.options.item} active`);
		
		//自动切换轮播开关
		this.switch(this.options.play);
		
		//创建sliderItem 的 link
		this.createLink();
		
		//阻止a标签默认跳转,并添加鼠标滑动监控；
		if(!!this.currentEl.querySelector('a.itemA')) this.tbool = true;//如果slideritem下有a标签
		if(this.downLong) this.itemLinkEvent(this.currentEl,this.currentEl.querySelector('a.itemA'),this.tbool,this.Translatex());
		
		//鼠标长按事件
		if(this.downLong) this.mouseDownLong(this.currentEl,this.downLong,this.Translatex());
		
		//移动端事件处理
		this._touchEvent(this.slider,'touchstart',this._touchStart);
		this._touchEvent(this.slider,'touchend',this._touchEnd);
		//touchmove事件绑定
		this._touchEventMove(this.slider);
		
		
		
		
		
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
		for (let focusSpan of this.focusArr) {
			this.focusKuang.appendChild(focusSpan);
			
		}
		this.foucusbool=false;
		//为焦点创建索引并绑定事件
		this.foucusIndex();
		
		
	}
	
	//为焦点添加索引值并绑定事件
	foucusIndex(){

		this.focusSpan = this.focusKuang.querySelectorAll('span');
		
		for (let i = 0; i < this.focusSpan.length; i++) {
			//为焦点添加索引			
			this.focusSpan[i].setAttribute('data-name',i);
			//为焦点绑定事件			
		}
		if(this.isMobile()){
			//绑定移动端点击
			this._touchEvent(this.focusKuang,'touchend',this.touchFocusPlay);
		}else{
			if(this.focus.bindEvent === 'click'){
				this._clickEvent(this.focusKuang,this.FocusPlay,this);			
			}else{		
				for (let i = 0; i < this.focusSpan.length; i++) {
					//为焦点绑定滑过事件			
					this._hoverEvent(this.focusSpan[i],this.hoverFocusPlay);
				}				
			}
		}
		
		
	}
	//滑过焦点切换
	hoverFocusPlay(el,ev){
		//首先判断 滑国的是 span 焦点，不是空白缝隙区域
		//console.log(ev.path[0].tagName.toLowerCase());
		const ELname = ev.path[0].tagName.toLowerCase();
		
		let ELEMentspan='';
		if(ELname=='i'||ELname=='p'||ELname=='img'||ELname=='a'||ELname=='strong'){
			this.foucusbool=true;		
			ELEMentspan=ev.path[1];
		}else if(ELname=='span'){
			this.foucusbool=true;
			ELEMentspan=ev.path[0];
		}else{
			this.foucusbool=false;
		}

			//console.log(ELEMentspan);
			//获取事件源元素 索引	
		if(this.foucusbool){	
			let index = Number(ELEMentspan.getAttribute('data-name'));	
			this.to(this.currIndex,index);
		}
	}
	//移动端焦点切换
	touchFocusPlay(el,e){
		//首先判断 滑国的是 span 焦点，不是空白缝隙区域
		const ELname = e.changedTouches[0].target.tagName.toLowerCase();
		
		let ELEMentspan='';
		if(ELname=='i'||ELname=='p'||ELname=='img'||ELname=='a'||ELname=='strong'){
			this.foucusbool=true;
			ELEMentspan=e.changedTouches[0].target.parentNode;
		}else if(ELname=='span'){
			this.foucusbool=true;
			ELEMentspan=e.changedTouches[0].target;
		}else{
			this.foucusbool=false;
		}
		if(this.foucusbool){						
			//获取事件源元素 索引
			let index = Number(ELEMentspan.getAttribute('data-name'));	
			if(this.currIndex===index) return;
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
	//点击焦点切换
	FocusPlay(ev){
		//首先判断 点击的是 span 焦点，不是空白缝隙区域
		const ELname = ev.target.tagName.toLowerCase();
		
		let ELEMentspan='';
		if(ELname=='i'||ELname=='p'||ELname=='img'||ELname=='a'||ELname=='strong'){
			this.foucusbool=true;
			ELEMentspan=ev.target.parentNode;
		}else if(ELname=='span'){
			this.foucusbool=true;
			ELEMentspan=ev.target;
		}else{
			this.foucusbool=false;
		}
		//首先判断 点击到的是 span 焦点，不是空白缝隙区域
		if (this.foucusbool) {
			//获取事件源元素 索引					
			let index = Number(ELEMentspan.getAttribute('data-name'));	
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
	
	
	FocusActive(index){	
		for (let focusSpan of this.focusSpan) {
			focusSpan.className =`${this.focus.FocusItemClass}`;
		}
		index=this.getCorrectedIndex(index);
		this.focusSpan[index].className = `${this.focus.FocusActive}`;
	
	}
	
	//创建左右按钮
	CreateBtn(Btn){
		if(this.isMobile()) return; //如果是移动端，不创建左右按钮
			
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
		this.prevNode = prevNode;
		this.nextNode = nextNode;
	}
	
	//创建a标签
	createLink(){				
		if(!this.creatLink) return;
		for(let items of this.sliderItems){
			const hrefLink = items.getAttribute(this.Linkhref);
			if(hrefLink){
				let aEl = document.createElement('a');
				aEl.setAttribute('href',hrefLink);
				aEl.className='itemA';
				aEl.setAttribute('target','_bank');
				items.appendChild(aEl);
			}
		}
	}
	
	// showIn淡入动画
	showIn(index,opacity){
		return new Promise(resolve=>{
			this.FocusActive(index);
	    	this.sliderItems[index].style.opacity = opacity;
			//动画执行完毕后，执行成功态 resolve
			setTimeout(resolve,this.PlaySpeed-5,this.sliderItems[index]);
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
			let maxWid = wid*(this.sliderItems.length+3);
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
			// 克隆最后一张图片，追加到第一张之前；
			const FirstItem = this.sliderItems[this.maxIndex].cloneNode(true);
			this.sliderContent.insertBefore(FirstItem,this.sliderItems[this.minIndex]);
			this.sliderContent.style.transition = 'none';
			this.sliderContent.style.transform = `translateX(${-this.contentWid}px)`;
			this.moveX = wid;
			this.moveY = this.contentHeig;
	  }
	}
	
	// Move左右拉动效果
	Move(Index,prevIndex){
		
		return new Promise(resolve=>{
		if(Index <= this.maxIndex && Index>= this.minIndex) {
			this.sliderContent.style.transition =`all ${this.PlaySpeed/1000}s ease 0s`;
			this.sliderContent.style.transform = `translateX(${-(Index+1) * this.contentWid}px)`;		
			
			//修改焦点
			this.FocusActive(Index);
			//动画执行完毕后，执行成功态 resolve
			setTimeout(resolve,this.PlaySpeed-10,this.sliderItems[Index]);
			this.prevEL =  this.sliderItems[prevIndex];

		}else if(Index > this.maxIndex){ // 处在最后1张 往 右 拉动
			setTimeout(()=>{
				this.sliderContent.style.transition = 'none';
				this.sliderContent.style.transform =`translateX(${-this.contentWid}px)`;	
				//动画执行完毕后，执行成功态 resolve
				resolve(this.sliderItems[this.currIndex]);

				this.prevEL =  this.sliderItems[this.maxIndex];

			},this.PlaySpeed-10);
			//修改焦点
			this.FocusActive(Index);
			this.sliderContent.style.transition =`all ${this.PlaySpeed/1000}s ease 0s`;
			this.sliderContent.style.transform = `translateX(${-(Index+1) * this.contentWid}px)`;
		}else{    // 处在第1张 往 左 拉动						
			setTimeout(()=>{
				//然后马上执行，往最后1张图的过渡动画；
				this.sliderContent.style.transition = 'none'; 
	
				this.sliderContent.style.transform = `translateX(${-(this.maxIndex+1) * this.contentWid}px)`;	

				//动画执行完毕后，执行成功态 resolve
				setTimeout(resolve,5,this.sliderItems[this.currIndex]);
				this.prevEL =  this.sliderItems[this.minIndex];
			},this.PlaySpeed-10);
			//修改焦点
			this.FocusActive(Index);
			//消除动画效果，瞬间改变left值至 最后1张图，再往左 多一张图的位置；
			this.sliderContent.style.transition =`all ${this.PlaySpeed/1000}s ease 0s`;
			this.sliderContent.style.transform = `translateX(0px)`;
		}		
		})
	}
	
	// 切换到 当前 索引对应的幻灯片
	to(currIndex,ToIndex) {
		if (!this.lock) return;
		this.lock = false;		
		
		this.slider.ontouchmove=null;//动画运动时，清除掉move事件	
		
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
			func.call(this,el,ev); // 通过.call方法给事件触发函数传递 上下文 和 ev事件源
		},true)
	}

	
	
	//绑定移动端事件
	_touchEvent(el,name,func){
		if(!this.touchoption.touchEvent) return;
		this.foucusbool=true;
		el.addEventListener(name,e=>{
			func.call(this,el,e);
		},false);		
	}
	//触摸开始函数
	_touchStart(el,ev){
		if (!this.locktouch) return;
		this.locktouch = false;	
		
		const touch=ev.changedTouches[0];
		this.startX=touch.pageX;
		this.startY=touch.pageY;
		clearInterval(this.timer);//清除掉slider自动切换
		this.transNum=this.Translatex();
		
		//函数节流，函数执行完毕后，解锁
		setTimeout(()=>{
		 	this.locktouch = true;		
		},this.PlaySpeed)
		this.Touchtimerout = setTimeout(()=>{
			this.swipe=true;
		},300);
		
	}
	//触摸移动函数
	_touchMove(el,ev){	
	
		const touch=ev.changedTouches[0];
		const x=touch.pageX;
		const y=touch.pageY;		
	
		if(x < this.startX+5){//左滑
		ev.preventDefault();//阻止浏览器默认左滑返回上一页
			this.slip='left';
			this.touchFollow(this.startX,x,this.transNum,ev,el)	

		}else if(x > this.startX+5){//右滑
		ev.preventDefault();
			this.slip='right';	
			this.touchFollow(this.startX,x,this.transNum,ev,el)
		}
	
		
	}
	
	touchFollow(startX,newX,num,ev,el){
		if(!this.touchoption.follow) return; //如果不跟随，跳出			
		this.sliderContent.style.transition = `all 0.1s`;
		this.sliderContent.style.transform = `translateX(${-(startX-newX)+num}px)`;
		this.ifMoveFollow(ev,el,startX,newX,num);
	}
	//鼠标移动时执行
	ifMoveFollow(ev,el,startX,tX,num){					
			const touch=ev.changedTouches[0];
			let newX = touch.pageX;	
			let x = (this.startX-newX>0)?this.startX-newX:-(this.startX-newX);
		
			if(x>this.moveX*0.5){//拖住超出限制，执行			
				el.ontouchmove=null;//清除move事件		
				if(x>this.startX){//左滑
					this.prev();
					this.slip='';
					
				}else if(x<this.startX){//右滑
					this.next();	
					this.slip='';					
				}	
			};
			if(x<this.moveX*0.5 && this.swipe){
				this.sliderContent.style.transform = `translateX(${-(startX-tX)+num}px)`;
				this.slip='';	
			}
			
	}
	//touchmove事件绑定
	_touchEventMove(el){
		if(!this.touchoption.touchEvent) return;
		if(!this.touchoption.slip) return;
		el.ontouchmove=e=>{this._touchMove.call(this,el,e)}
	}
	
	
	//触摸结束函数
	_touchEnd(el,ev){
	
		clearTimeout(this.Touchtimerout);
		if (!this.locktouch2) return;
		this.locktouch2 = false;	

		if(this.slip=='left'){this.next()};
		if(this.slip=='right'){this.prev()};
		//如果离开时
		const touch=ev.changedTouches[0];
		let newX = touch.pageX;	
		let x = (this.startX-newX>0)?this.startX-newX:-(this.startX-newX);
		if(x<this.moveX*0.5 && this.swipe){
			this.sliderContent.style.transition = `all 0.36s ease`;
			this.sliderContent.style.transform = `translateX(${this.transNum}px)`;
			this.swipe=false;
		}
		//添加自动切换动画
		this.Autoplay(this.options.play);
		
		//函数节流，函数执行完毕，300毫秒后，解锁
		setTimeout(()=>{
		 	this.locktouch2 = true;		
		},this.PlaySpeed)
		
	}
	
	
	//执行完动画，回调执行
	Callback(){
		if(!this.callback) return;
		this.Then.then(el=>{
			if(this.foucusbool){this.callbackStart(el);}
			//阻止a标签默认跳转,并添加鼠标滑动监控；
			if(!!el.querySelector('a.itemA')) this.tbool = true; //如果slideritem下有a标签
			if(this.downLong&&this.creatLink) this.itemLinkEvent(el,el.querySelector('a.itemA'),this.tbool,this.Translatex());
			//鼠标长按事件
			if(this.downLong) this.mouseDownLong(el,this.downLong,this.Translatex());			
			//因为被清除，再次恢复绑定touchmove事件
			this._touchEventMove(this.slider);
			
			this.PCslip='';
			this.ClientX = 0;//清除鼠标记录
			this.ClientY = 0;//清除鼠标记录	
			
					
			//向后给then传递el
			return el;
		}).then(el=>{			
			if(this.foucusbool){this.callbackReset(this.prevEL);}
			if(this.downLong && !this.isMobile() && !!this.prevEL.querySelector('a.itemA')){
				//如果不是移动端且slideritem下有a标签				
				this.zuse(this.prevEL.querySelector('a.itemA'),true);//清除上一个a标签阻塞；
			}

		})
		.catch(err=>{
			this.callback = false;
			throw new Error('回调执行函数出错'+err);
			
		})
	}


	//初始化第一张：
	FirstPic(clas){		
		this.sliderItems[this.options.initIndex].className = clas;	
		//批量处理，图片不可以拖拽
		const imgList = this.slider.querySelectorAll('img');
		for (let img of imgList) {
			this.imgDefault(img);
		}
		return this.sliderItems[this.options.initIndex];
	}
	
	//阻止img默认事件
	imgDefault(el){
		el.addEventListener('mousedown',e=>{
			e.preventDefault();//阻止默认事件发生，不可以拖拽
		},false);
	}
	
	
	
	//阻止a标签默认跳转,并添加鼠标滑动监控；
	itemLinkEvent(el,elA,bool,num){
		if(this.isMobile()) return; //如果是移动端，跳出
		if(!this.creatLink) return;	
		if(!elA) return;			
		if(!bool) return;
		elA.addEventListener('mousedown',e=>{			
			e.preventDefault();//阻止默认事件发生，可以拖拽
			clearTimeout(this.timerout);//设表先关
			this.timerout = setTimeout(ev=>{				
					//清除定时器自动播放
					clearInterval(this.timer);
				   elA.style.cursor ='url(./js/handle.png),auto';//修改鼠标样式
				   this.ClientX = ev.clientX; //记录鼠标位置
					this.ClientY = ev.clientY; //记录鼠标位置
					this.zuse(elA,true);//清除阻塞；
					this.mouseFollow(elA,ev.clientX,num);//鼠标跟随
					this.zuse(elA,false);//阻塞a标签
					
				    
				   
			},120,e);//鼠标按下0.12秒后发生事件
			
		},false);
		
		this.mouseUp(elA,'pointer');
		
		
	}
	
	//阻塞	
	zuse(el,bool){
		el.onclick =()=>{return bool};//阻塞A标签跳转	  
	}
	
	
	//监测鼠标长按
	mouseDownLong(el,bool,num){	
		
		if(this.isMobile()) return; //如果是移动端，跳出
		if(!bool) return; 
		if(!!el.querySelector('a.itemA')) return;
		el.addEventListener('mousedown',e=>{		
			e.preventDefault();//阻止默认事件发生，可以拖拽
			clearTimeout(this.timerout);//设表先关
			this.timerout = setTimeout(ev=>{				
					//清除定时器自动播放
		
					clearInterval(this.timer);
				   el.style.cursor ='url(./js/handle.png),auto';//修改鼠标样式
				   this.ClientX = ev.clientX; //记录鼠标位置	
				   this.ClientY = ev.clientY; //记录鼠标位置
				   this.mouseFollow(el,ev.clientX,num);//鼠标跟随
				  
			},120,e);//鼠标按下0.12秒后发生事件
			
		},false);
		  
		this.mouseUp(el,'default');
	
	}

	//鼠标跟随拖拽
	mouseFollow(el,oldx,num){		
		
		this.PCtransNum = num;
		this.sliderContent.style.transition = `all 0.1s`;
		el.onmousemove=e=>{			
			
			let newx = e.clientX;
			//向左拖拽
			if(oldx-10 > newx){		
				this.PCslip='left';
				this.sliderContent.style.transform = `translateX(${-(oldx-newx)+num}px)`;
				this.CloseMove(e,el,oldx,newx,num);
			//向右拖拽
			}else if(oldx+10 < newx){	
				this.PCslip='right';
				this.sliderContent.style.transform = `translateX(${-(oldx-newx)+num}px)`;
				this.CloseMove(e,el,oldx,newx,num);
			}	
		}
	}
	//鼠标暂停跟随
	removeEvents(el){
		
		el.onmousemove=null;
		
	}
	
	//鼠标松开执行
	mouseUp(el,value){		
		el.addEventListener('mouseup',e=>{
			this.removeEvents(el);//鼠标暂停跟随
			clearTimeout(this.timerout);//一松开鼠标清理掉定时器	
			el.style.cursor = value;	
			// 监听mouseup时，鼠标的距离窗体的x值的变化，确定是向左还是向右 拖拽；

			if(this.ClientX === 0) return;
			if(this.PCslip == 'left') this.next();
			if(this.PCslip=='right') this.prev();
			//如果离开时
			let newX = e.clientX;	
			let x = (this.ClientX-newX>0)?this.ClientX-newX:-(this.ClientX-newX);		
			if(x<this.moveX/10){
				this.sliderContent.style.transition = `all 0.36s ease`;
				this.sliderContent.style.transform = `translateX(${this.PCtransNum}px)`;
				
			}
			
		},false)

		
	
		
	}
	
	//鼠标移动时执行
	CloseMove(ev,el,oldx,newx,num){					
			// 监听mousemove时，鼠标的距离窗体的x/y值的变化
			let upPageX = ev.clientX;	
			let x = (this.ClientX-upPageX>0)?this.ClientX-upPageX:-(this.ClientX-upPageX);		
			if(x>this.moveX/3){//拖住超出限制，执行
				this.removeEvents(el);//清除move事件
				//向左拖拽
				if(this.ClientX-10 > upPageX){
					this.next();
					this.PCslip='';
				//向右拖拽
				}else if(this.ClientX+10 < upPageX){
					this.prev();
					this.PCslip='';
				}	
			};
			
			if(x < this.moveX/10){
				//console.log(x,upPageX,this.moveX/6);
				this.sliderContent.style.transform = `translateX(${-(oldx-newx)+num}px)`;
				this.PCslip='';	
			}
			
	}
	
	//获取tranform的值
	Translatex(){
		let a=0,b=0;
		a = `${this.sliderContent.style.transform}`.indexOf(`(`);
		b =`${this.sliderContent.style.transform}`.indexOf(`p`);
		let valuenum = 0;
		if(a!=-1&&b!=-1) valuenum = Number(`${this.sliderContent.style.transform}`.substring(a+1,b));
		return valuenum;
	}
	//判断是否是移动端
	isMobile(){
	  let flag=!!navigator.userAgent.match(
	    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
	  );
	  return flag;
	};
	
	
	
}



//导出
export {BaseSlider};