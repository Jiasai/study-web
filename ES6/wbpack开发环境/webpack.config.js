const path = require('path');   
//导入Node内置的一个模块对象 叫 path
const HtmlWebpackPlugin = require('html-webpack-plugin');   
//导入插件'html-webpack-plugin'，作用：自动嵌入webpack打包好的.js文件到html中，并且把嵌入好的html文件也在 /dist  目录中,按照设置好的路径复刻一份
const MiniCssExtractPlugin= require('mini-css-extract-plugin');
//导入插件'mini-css-extract-plugin'，作用：通过 link标签自动引入webpack打包好的.css文件到html中，并且把嵌入好的.css文件也在 /dist 目录中,按照设置好的路径复刻一份；

module.exports = {
	//mode:'production',//默认是生产模式（混合打乱压缩）
	mode:'development',//指定开发模式，不加这条代码，默认生产模式production
	entry:'./src/index.js',//入口文件，把src目录下的index.js文件 ，转化到 dist文件目录下的main.js文件(默认名)
	
/* 	entry: {								指定多入口：
			  index:'./src/index.js',		把src目录下的index.js文件，转化到 dist文件目录下的index.js文件
			  search:'./src/search.js',		把src下的search.js，转化到 dist下的search.js
			  login:'./src/login.js'		...
	} */
	output:{									//指定出口:
		path:path.resolve(__dirname,'dist'),	//通过 path提供的resolve方法,设定 /dist 目录
		filename:'js/[name].js'					//如果指定了多入口，出口文件的目录和名字，使用[name]动态替换；
	},
	module:{									//使用loader，通过module属设置 
		rules:[									//规则，美使用一个loader，就在rules里，设置一个对象
			{
				test:/\.css/,					//正则：所有以.css结尾的文件
		//loader:'css-loader'
		//通过use方式，合并多个loader,从右向左使用,内联css
		// use:['style-loader','css-loader']
			//下面：使用link引入css文件形式
			use:[MiniCssExtractPlugin.loader,'css-loader']
			}
		]
	}
	,
	plugins:[									//使用插件，通过plugins属性设置 
		new HtmlWebpackPlugin({					//每使用1个新插件，new 一下上面通过 require()引入的插件
			template:'./index.html',			//指定打包好的 .js文件，嵌入到当前目录下的 index.html文件中，
			filename:'index.html'				//并以此为模板，在 /dist目录中再克隆复制一份；
		}),
		new MiniCssExtractPlugin({
			filename:'css/[name].css'			//指定打包好的 .css文件目录和名称，并嵌入html，
		})
	]
}