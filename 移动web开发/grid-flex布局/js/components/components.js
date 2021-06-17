const header = document.querySelector('.header');
const backtotop = document.getElementById('gotop');
const viewWidth = window.innerWidth||document.documentElement.clientWidth||document.documentElement.getBoundingClientRect().width;//兼容性写法，获取屏幕宽度
//返回顶部
const goTop=()=>{	
	let timer;	
	// 返回顶部按钮的监听
	backtotop.addEventListener('click',()=>{
		
		// 设表先关
		clearInterval(timer);
		// 设置定时器
		timer = setInterval(function() {
			if(!document.documentElement.scrollTop){ //如果在IE它不存在，使用window.scrollY
			
				document.body.scrollTop -= 100; //兼容IE浏览器
				if (window.scrollY <= 0) {
				    clearInterval(timer);
				}
			}else{
				
				document.documentElement.scrollTop -= 100;
				if (document.documentElement.scrollTop <= 0) {
				    clearInterval(timer);
				}
			}
		    
		}, 20);
	},false)
	// 监听页面的滚动
	window.addEventListener('scroll',()=>{
	     // 卷动值
	     let scrollTop = document.documentElement.scrollTop || window.scrollY;
		
	     // 页面没有卷动，那么返回顶部按钮就隐藏掉
	     if (scrollTop <= 300) {
	         backtotop.style.display = 'none';
	     } else {
	         backtotop.style.display = 'block';
	     }
	},false);
}




//导航菜单吸附顶部
const topMenu=()=>{
	let p=10,h=500;
	let t=window.scrollY || document.documentElement.scrollTop;
	if(p<t){ 
		header.className='header miniHeader'; //改变header
		if(h<t) backtotop.style.display='block'; //显示 goTop按钮
	}else{
		header.className='header';
	}
	
}

//获取随机数函数

const random=(min,max)=>{
	return parseInt(Math.random()*(max-min+1))+min;
}
//随机数函数的应用，控制事件触发的次数
// let i = 0;
// while(i<10){	
// 	if(random(1,10) === 8) console.log('射出子弹！');	
// 	i++;
// }





export {goTop,topMenu,viewWidth}