
//导入
import BaseSlider from './base.js';

//键盘控制
import {keyboard} from './keyboard.js';

class Slider extends BaseSlider {
	  constructor(el, options) {
	    super(el, options);
	
	    this._bindEvent();
	  }
	
	  _bindEvent() {
		keyboard.bindEvent(this);
	  }
	}this
	
	//导出
	export default Slider;