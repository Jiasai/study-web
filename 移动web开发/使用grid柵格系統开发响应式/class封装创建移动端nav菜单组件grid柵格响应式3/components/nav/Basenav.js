//默认参数
const DEFAULTS = {
	createHeader: {
		isHeader: true,                  		 //是否克隆menu菜单
		header:'header.header-container',			//pc的头部
		cloneObject: '.logo',    					//克隆的logo
	},
	cloneMenu: {
		isClone: true,                   //是否克隆menu菜单
		cloneObject: 'pcMenu',           //克隆menu的参照对象
		style: 'drop-down',              //'drop-down'、'Sidebar'
		oneMenuLi: 'nav-item',           //一级menu的li
		twoMenuUL: 'nav-two-ul',         //二级menu的ul
		twoMenuLi: 'nav-two-item'        //二级menu的li
	},
	createMenu:{									//创建出的mobMenu菜单
		tagname:'div',								//元素类型
		classname:'nav-container d-md-none',		//元素class
		id:'mobMenu',								//元素 id
		ulclass:'container nav-one-ul'				//元素一级ul的class
	},
	toggleBtnID: 'btn-toggle',   //点击按钮 id
	menuID: 'mobMenu', 			//mobMenu元素
	open: 'open',                //动画展开
	oneMenu: {					//一级菜单UL		
		classname: 'nav-one-ul',
		itemLi: 'nav-one-item',
		paddingSum: 20
	},
	twoMenu: {
		isTwoMenu: true,			//是否有二级菜单
		classname: 'nav-two-ul',	//二级菜单UL
		itemLi: 'nav-two-item',
		icon: 'icon-right'
	},
	timer: '',
	lock: true,
}

class BaseToggle {
	constructor(options) {
		// 实际参数
		this.options = {
			...DEFAULTS,
			...options
		};

		//是否克隆menu菜单
		this.isClone = this.options.cloneMenu.isClone;
		//克隆menu的参照对象
		this.cloneMenu = document.getElementById(`${this.options.cloneMenu.cloneObject}`);
		//menu被克隆后选择的显示样式
		this.showStyle = this.options.cloneMenu.style;
		//一级menu的li
		this.PC_oneMenuLi = this.cloneMenu.querySelectorAll(`#${this.options.cloneMenu.cloneObject} li.${this.options.cloneMenu.oneMenuLi}`);

		this.createMenu = this.options.createMenu;
				


		//执行初始化
		this.init();

	}
	//初始化
	init() {
		const viewWidth = window.innerWidth||document.documentElement.clientWidth||document.documentElement.getBoundingClientRect().width;//兼容性写法，获取屏幕宽度
		if(viewWidth >= 769) return;
		//创建移动端头部header
		this.createHeader();
		//克隆菜单
		this.CloneMenu();
		//添加this参数
		this.parameter();
		//给一级菜单li 添加 icon
		this.addIcon(this.oneMenuLi, this.icon);
		//给toggleBtn绑定事件		
		this._clickEvent(this.toggleBtn, this.toggle, this.oneMenuUl, this.oneMenuLi, this.onePaddSum);
		//给toggleBtn添加样式
		this._clickEvent(this.toggleBtn, this.toggleStyle,this.toggleBtn,this.open);
		//给oneMenuLi绑定事件
		this._clickEvent(this.oneMenuUl, this.clickLi, '', '', this.twoPaddSum);
	}
	//创建移动端头部header
	createHeader(){
		if(!this.options.createHeader.isHeader) return;
		const header = document.querySelector(`${this.options.createHeader.header}`);
		console.log(header);
		const logo = header.querySelector(`${this.options.createHeader.cloneObject}`);		
		console.log(logo);
		const img = logo.querySelector('img');
		const href = logo.getAttribute('href');
		const imgSRC= img.getAttribute('src');
		const imgAlt = img.getAttribute('alt');
		let html = `<div class="container">
				<div class="row">
					<div class="header-logo col-5 d-md-none">
						<a href="${href}" class="logom">
							<img src="${imgSRC}" alt="${imgAlt}">
						</a>
					</div>
					<div class="header-btn col-7 d-md-none">
						<div class='btn-toggle' id='btn-toggle'>
							<span class="btn-toggle-bar"></span>
							<span class="btn-toggle-bar"></span>
						</div>
					</div>
				</div>
			</div>`;
		const headerDiv= document.createElement('div');
		const paddingDiv= document.createElement('div');
		headerDiv.className='header-container';
		headerDiv.innerHTML = html;
		paddingDiv.className='paddingDiv';
		document.querySelector('body').appendChild(headerDiv);
		document.querySelector('body').insertBefore(paddingDiv,header);
	}

	//克隆menu菜单
	CloneMenu() {
		if (this.showStyle === 'drop-down') {
			let html = ``;			
			// 遍历PC_oneMenu的 li
			for (const item of this.PC_oneMenuLi) {
				const href = item.firstElementChild.getAttribute('href');  // 得到li 的 href
				const text = item.firstElementChild.innerText;             // 得到li 的 text          
				if (item.lastElementChild.tagName.toLowerCase() === 'ul') {  // 如果li 的 子元素有 二级ul 
					// 得到二级ul中的li
					const towLi = item.lastElementChild.querySelectorAll(`.${this.options.cloneMenu.twoMenuLi}`);
					let twoliHtml=``;
					for (const Liitem of towLi) {
						// 遍历二级ul中的li，通过模板字符串，组装成 html
						twoliHtml += `<li class='${this.options.cloneMenu.twoMenuLi}'><a href='${Liitem.firstElementChild.getAttribute('href')}' class='nav-mob-link'>${Liitem.firstElementChild.innerText}</a></li>`;
					}
					//组装html
					html += `<li class='${this.options.oneMenu.itemLi}'><a href='${href}' class='nav-mob-link'>${text}</a><ul class="${this.options.twoMenu.classname}">${twoliHtml}</ul></li>`;

				} else {
					html += `<li class='${this.options.oneMenu.itemLi}'><a href='${href}' class='nav-mob-link'>${text}</a></li>`;
				}

			}
		
			//创建mob端menu
			const mobMenu = document.createElement(`${this.createMenu.tagname}`);
			mobMenu.className = `${this.createMenu.classname} ${this.showStyle}`;    //设置mobMenu的class
			mobMenu.setAttribute('id', this.createMenu.id); //设置mobMenu的id
			//设置mobMenu的 html
			mobMenu.innerHTML = `<ul class="${this.createMenu.ulclass}">${html}</ul>`;

			//把mobMenu 追加入html
			document.querySelector('body').appendChild(mobMenu);

		}
	}

	//给this添加参数
	parameter() {
		//toggle切换按钮
		this.toggleBtn = document.getElementById(`${this.options.toggleBtnID}`);
		//Mob菜单元素
		this.mobMenu = document.getElementById(`${this.options.menuID}`);
		//一级菜单ul元素
		this.oneMenuUl = this.mobMenu.querySelector(`.${this.options.oneMenu.classname}`);
		//一级菜单ul中的 li 元素
		this.oneMenuLi = this.oneMenuUl.querySelectorAll(`.${this.options.oneMenu.itemLi}`);
		if (this.options.twoMenu.isTwoMenu) { //如果有二级菜单
			//二级菜单ul元素
			this.twoMenuUl = this.mobMenu.querySelectorAll(`.${this.options.twoMenu.classname}`);
			//二级菜单ul中的 li 元素
			// this.twoMenuLi = this.twoMenuUl.querySelectorAll(`.${this.options.twoMenu.itemLi}`);
		}
		this.onePaddSum = this.options.oneMenu.paddingSum;
		this.twoPaddSum = this.options.twoMenu.paddingSum;
		
		this.isTwoMenu = this.options.twoMenu.isTwoMenu;
		this.timer = this.options.timer;
		this.lock = this.options.lock;
		this.open = this.options.open;
		this.close = this.options.close;
		this.icon = this.options.twoMenu.icon;
	}



	//获取className
	getClassName(el) {
		return new Set(el.className.split(' '));
	}
	//设置className
	setClass(el, clas) {
		el.className = clas;
	}
	//判断是否拥有class
	hasClass(classname, clas) {
		return classname.has(clas);
	}
	//删除class
	deleteClass(classname, clas) {
		classname.delete(clas);
		return classname;
	}
	//添加class
	addClass(classname, clas) {
		return classname.add(clas);
	}
	//最终使用的className
	resultClassName(classname) {
		return [...classname].join(' ');
	}


	//计算高度
	getHeight(el, padding) {
		let sum = 0;
		for (let item of el) {
			sum += item.offsetHeight;
		}
		sum += padding;
		return sum;
	}

	//给一级菜单li 添加 icon
	addIcon(el, clas) {
		if (!this.options.twoMenu.isTwoMenu) return;
		for (let item of el) {
			if (item.lastElementChild.tagName.toLowerCase() == 'ul') {
				let name = this.addClass(this.getClassName(item), clas);
				this.setClass(item, this.resultClassName(name));
			}
		}

	}

	//改变右箭头
	setIcon(el) {
		if(!this.isTwoMenu) return;
		for (let item of this.oneMenuLi) {
			let name = this.deleteClass(this.getClassName(item), this.open);
			this.setClass(item, this.resultClassName(name));
		}
		//改变右箭头		
		let name = this.addClass(this.getClassName(el.parentNode), this.open);
		this.setClass(el.parentNode, this.resultClassName(name));
	}
	//ToggleBtn样式切换
	toggleStyle(arg){
		const [el,clas] = arg;
		let name = this.getClassName(el);
		
		if(!this.hasClass(name,clas)){			
			this.setClass(el,this.resultClassName(this.addClass(name,clas)));
		}else{
			this.setClass(el,this.resultClassName(this.deleteClass(name,clas)));
		}
		
	}

	//点击onmenuli切换
	clickLi(arg, ev) {
		if(!this.isTwoMenu) return;
		let [el, li, padding] = [...arg];
		const lastEL = ev.target.parentNode.lastElementChild;

		//当前点击元素的父元素的最后一个子元素		
		if (lastEL.tagName.toLowerCase() == 'ul') {
			el = ev.target.parentNode.querySelector(`.${this.options.twoMenu.classname}`);
			li = el.querySelectorAll(`.${this.options.twoMenu.itemLi}`);

			this.toggle([el, li, padding]);
		}

	}

	//点击切换toggle
	toggle(arg) {
		if (!this.lock) return; this.lock = false;//函数节流

		const [el, li, padding] = [...arg];

		let bool = this.hasClass(this.getClassName(el), this.open);

		//关闭二级ul菜单
		this.closeTwoul();

		if (!bool) { //向下展开		

			this.openDown(el, li, padding);
			//函数节流
			this.timeout(el, true);

		} else {//向上收起		
			this.closeUp(el);
			//函数节流
			this.timeout(el, false);
		}

	}

	//函数节流延时
	timeout(el, bol) {
		clearInterval(this.timer);
		this.timer = setTimeout(() => {
			this.lock = true;
			if (bol) {
				el.style.height = `inherit`;
			}

		}, 360)
	}

	//动画向下展开
	openDown(el, li, num = 0) {
		//展开当前ul
		el.style.minHeight = `${this.getHeight(li, num)}px`;
		let name = this.addClass(this.getClassName(el), this.open);
		this.setClass(el, this.resultClassName(name));

		//改变二级li 的 icon
		this.setIcon(el);
	}

	//动画向上收起
	closeUp(el) {
		el.style.minHeight = `0`;
		el.style.height = `0`;
		let name = this.deleteClass(this.getClassName(el), this.open);
		this.setClass(el, this.resultClassName(name));
	}
	//关闭二级UL菜单
	closeTwoul() {
		if(!this.isTwoMenu) return;
		for (let item of this.twoMenuUl) {
			this.closeUp(item);

		}
		for (let item of this.oneMenuLi) {
			let name = this.deleteClass(this.getClassName(item), this.open);
			this.setClass(item, this.resultClassName(name));
		}
	}

	//绑定点击事件
	_clickEvent(el, func, ...arg) {
		el.addEventListener('click', ev => {
			func.call(this, arg, ev); // 通过.call方法给事件触发函数传递 上下文 和 ev事件源
		}, false);
	}



}





export { BaseToggle };