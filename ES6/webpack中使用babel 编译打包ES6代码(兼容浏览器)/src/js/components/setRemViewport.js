//计算屏幕大小，重置rem初始值，改变页面显示

const ScreenWidth = window.innerWidth||document.documentElement.clientWidth||document.documentElement.getBoundingClientRect().width;//兼容性写法，获取屏幕宽度
		//const ScreHig = window.innerHeight;

		/*重置或更新 viewport视口*/
	const setRemValue=()=>{
			return new Promise(resolve=>{

				let bizhi='';
				let htmlFontSize='';
				if (ScreenWidth > 1681) {
					bizhi = ScreenWidth / 1920; //大于1681以上的分辨率 以1920的响应为标准计算
					
					htmlFontSize = 100 * bizhi; //100是html初始值，设置 font-size:100px;设置20px就乘 20；
					
					document.documentElement.style.fontSize =`${htmlFontSize}px`;
					
				}else if(ScreenWidth > 1441 && ScreenWidth <= 1681){
					bizhi = ScreenWidth / 1680;//分辨率1680的pc电脑 以1680的标准计算
					htmlFontSize = 100 * bizhi;
					
					document.documentElement.style.fontSize =`${htmlFontSize}px`;
					
				}else if(ScreenWidth >= 1200 && ScreenWidth <= 1441){
					
					bizhi = ScreenWidth / 1300;//小于1441的笔记本电脑 以1360的响应为显示标准计算
					
					htmlFontSize = 100 * bizhi;
					
					document.documentElement.style.fontSize =`${htmlFontSize}px`;
					
				}else if(ScreenWidth > 769 && ScreenWidth < 1200){
					bizhi = ScreenWidth / 1024; //小于1081的平板电脑 以1080的响应为显示标准计算
					htmlFontSize = 100 * bizhi;
					
					document.documentElement.style.fontSize =`${htmlFontSize}px`;
					
				}else if(ScreenWidth <= 769){
					// const ratio = 18.75;		
					// document.documentElement.style.fontSize = `${ScreenWidth/ratio * 5}px`;
					
					bizhi = ScreenWidth / 375; //移动端以375的响应为显示标准计算				
					htmlFontSize = 100 * bizhi;				
					document.documentElement.style.fontSize = `${htmlFontSize}px`;
					
					document.querySelector('html').className='mobile';
					
				}
			
			
			resolve();
	});
			
}

		
		/*重置或更新 viewport视口*/
		const setViewport=()=>{
			const documentEL= document.documentElement;
			let viewportEl = document.querySelector("meta[name='viewport']");
			let dpr = window.devicePixelRatio||1;
			const maxWidth=540;
			const minWidth=320;		
			dpr=dpr>=3?3:(dpr>=2?2:1);
			documentEL.setAttribute('data-dpr',dpr);		
			// documentEL.setAttribute('max-width',maxWidth);
			// documentEL.setAttribute('min-width',minWidth);
			
			const scale = 1/dpr;
			let content =`width=device-width, initial-scale=${scale}, maximum-scale=${scale},minimum-scale=${scale},user-scalable=no`;
			if(viewportEl){
				viewportEl.setAttribute('content',content);
			}else{
				viewportEl = document.createElement('meta');
				viewportEl.setAttribute('name','viewport');
				viewportEl.setAttribute('content',content);
				document.head.appendChild(viewportEl);
			}	
		};	
		// if(ScreenWidth<769){
		// 	setViewport();
		// }
		
		
		
		
export {setRemValue};