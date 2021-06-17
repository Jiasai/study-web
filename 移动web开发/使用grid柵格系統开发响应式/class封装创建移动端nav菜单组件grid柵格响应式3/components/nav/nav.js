//引入组件Basenav.js
import {BaseToggle} from './Basenav.js';

//子类参数默认值
const ZiLeiDEFAULTS = {	
    toggleBtn:{
        isAnimation:true,
        style:'X',
    }	
}

class navMenu extends BaseToggle{
    constructor(options) {
        //给子类新增参数，设置默认值
		options = {...ZiLeiDEFAULTS,...options};     
        super(options);

        //子类初始化
        this.initChildren();
    }	
    
    initChildren(){      
    }

}



//nav移动端Menu配置：
const menuConfig={
	createHeader: {
		isHeader: true,                  		    //是否创建移动端头部
		header:'header.header-container',			//pc的头部
		cloneObject: '.logo',    					//克隆的logo
	},
    cloneMenu:{
        isClone:true,                   //是否克隆menu菜单
        cloneObject:'pcMenu',           //克隆menu的参照对象
        style:'drop-down',              //'drop-down'、'Sidebar'
        oneMenuLi:'nav-item',           //一级menu的li
        twoMenuUL:'nav-two-ul',         //二级menu的ul
        twoMenuLi:'nav-two-item'        //二级menu的li
    },
	createMenu:{									//创建出的mobMenu菜单
		tagname:'div',								//元素类型
		classname:'nav-container d-md-none',		//元素class
		id:'mobMenu',								//元素 id
		ulclass:'container nav-one-ul'              //元素一级ul的class
	},
    toggleBtn:{
        isAnimation:true,
        style:'X',
    },
	toggleBtnID:'btn-toggle',   //点击按钮 id
	menuID:'mobMenu', 			//mobMenu元素
	open:'open',                //动画class
	oneMenu:{							
		classname:'nav-one-ul',//一级菜单UL
		itemLi:'nav-one-item',//一级菜单UL>li
		paddingSum:20			//一级菜单UL的上下padding
	},		
	twoMenu:{
		isTwoMenu:true,			//是否有二级菜单
		classname:'nav-two-ul',	//二级菜单UL
		itemLi:'nav-two-item',  //二级菜单UL>li
		paddingSum:0,
		icon:'icon-right'       //icon右箭头
	},

}


//实例化执行
new navMenu(menuConfig);




