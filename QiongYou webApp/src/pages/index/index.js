//引入 core-js处理 ES6 一些API不被编译的问题
import "core-js/stable";

//公共样式
import 'styles/reset.css';
import 'styles/base.css';
import 'styles/layout.css';
//引入自己的样式
import './index.css';


//引入组件header的css和js
import './components/header';

//引入组件slider
import './components/slider';
import 'components/loading';
import './components/nav';
import './components/product';
import 'components/tabbar';
import './components/backtop';