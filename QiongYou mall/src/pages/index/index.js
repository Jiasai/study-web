//引入 core-js处理 ES6 一些API不被编译的问题
import "core-js/stable";
	
//在入口文件index.js中引入布局css文件:公共样式
import 'styles/reset.css';
import 'styles/base.css';
import 'styles/layout.css';
import 'styles/animation.css';


//在入口，引入组件（index.js,可以被省略）
import 'components/topbar/index.js';
import 'components/main-nav';
import 'components/header-con';
import './components/carousel/';
import './components/menu/';
import './components/fav-ad/';
import './components/xxsw/';
import './components/jjzyx/';
import './components/ddwl/';
import './components/tsddty/';
import './components/zsj/';
import './components/gt/';

import 'components/bottom-bar';
import 'components/footer-nav';
import 'components/backtotop';
import 'components/loading';

