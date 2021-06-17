const loadImgAsync =(url,ms)=>{
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				//Image()构造函数:图片对象
				const img = new Image();
				//图片加载成功了
				img.onload = ()=>{
					resolve(img);
				};
				//图片加载失败了
				img.onerror = ()=>{
					reject(new Error(`找不到图片路径 ${url}`));
				};
				// 图片开始加载
				img.src = url;
				
			},ms);
		})
	}
		
	const picListArr = ['http://climg.mukewang.com/5b16558d00011ed506000338.jpg','http://climg.mukewang.com/5b165603000146ca06000338.jpg','http://climg.mukewang.com/5b1656140001c89906000338.jpg'];
	
	
	for (let i = 0 ; i < picListArr.length; i++) {
		
		loadImgAsync(picListArr[i],(i+1)*1000).then(img=>{
			const bodys=document.getElementsByTagName('body')[0];
			let imgEl = document.createElement('img');
			imgEl.src = img.src;		
			bodys.appendChild(imgEl);							
		}).catch(err=>{
			console.log(err);
		})		
	}