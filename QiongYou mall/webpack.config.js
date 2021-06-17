const path = require('path');   
//导入Node内置的一个模块对象 叫 path
const HtmlWebpackPlugin = require('html-webpack-plugin');   
//导入插件'html-webpack-plugin'，作用：自动嵌入webpack打包好的.js文件到html中，并且把嵌入好的html文件也在 /dist  目录中,按照设置好的路径复刻一份
const MiniCssExtractPlugin= require('mini-css-extract-plugin');
//导入插件'mini-css-extract-plugin'，作用：通过 link标签自动引入webpack打包好的.css文件到html中，并且把嵌入好的.css文件也在 /dist 目录中,按照设置好的路径复刻一份；

//获取绝对路径
const resolve = dir => path.resolve(__dirname,dir);


module.exports = {
	//mode:'production',//默认是生产模式（混合打乱压缩）
	mode:'development',//指定开发模式，不加这条代码，默认生产模式production
	//entry:'./src/pages/index/index.js',//入口文件，把src目录下的page/index/index.js文件 ，转化到 dist文件目录下的main.js文件(默认名)
	
 	entry: {								//指定多入口：
			  index:'./src/pages/index/index.js',		//把src目录下的index.js文件，转化到 dist文件目录下的index.js文件
			  list:'./src/pages/destination/list.js',		//把src下的list.js，转化到 dist下的list.js			  
	},
	output:{									//指定出口:
		path:resolve('dist'),	//通过 path提供的resolve方法,设定 /dist 目录
		filename:'js/[name].js'					//如果指定了多入口，出口文件的目录和名字，使用[name]动态替换；
	},
	//source-map，调试用的，出错的时候，将直接定位到原始代码，而不是转换后的代码
	devtool:'cheap-module-eval-source-map',
	resolve:{
		//自动补全（可以省略）的扩展名
		extensions:['.js'],
		//给路径起个别名，方便引入
		alias:{ 		//引入时，直接引入 import 'api/index', 或者，import 'images/45.jpg',在js或css文件中，可以直接使用路径别名
			api:resolve('src/api'),
			fonts:resolve('src/assets/fonts'),
			images:resolve('src/assets/images'),
			styles:resolve('src/assets/styles'),
			components:resolve('src/components'),
			pages:resolve('src/pages')
		}
	},
	module:{									//使用loader，通过module属设置 
		rules:[									//规则，每使用一个loader，就在rules里，设置一个对象
			{
				test:/\.js$/,
				exclude:/node_moudules/,
				loader:'babel-loader'
			},
			{
				test:/\.css/,					//正则：所有以.css结尾的文件
		//loader:'css-loader'
		//通过use方式，合并多个loader,从右向左使用,内联css
		// use:['style-loader','css-loader']
			//下面：使用link引入css文件形式
			use:[{
				loader:MiniCssExtractPlugin.loader,
				//控制css中 background的图片路径 加上 '../'
				options:{
				  publicPath:'../'
				}
			},'css-loader']
			},
			//模板文件
			{
				test:/\.art$/,
				use:{
					loader:'art-template-loader'
				}
			}
			,
			//配置file-loader处理css中的图片
			{
			test:/\.(jpe?g|png|gif|svg)$/,			//正则：匹配图片文件格式
			use:{
			  loader:'url-loader',
			  options:{
			    name:'images/[name].[ext]',		//控制生成 images文件目录，图片使用它本身的名称和格式
			esModule:false,
			limit:10000    //小于10KB的图片编码为base64格式字符
			  }
			}
			},
			//字体文件
			{
				test:/\.(woff2?|eot|ttf|otf)$/,
				loader:'url-loader',
				options:{
					limit:10000,  //小于10KB的字体文件编码为base64格式字符
					name:'fonts/[name].[ext]'
				}
			},
			{
			test:/\.(htm|html)$/,			//正则：匹配网页文件格式
			use:{
			  loader:'html-withimg-loader' // html中，<img>图片的处理

			}
			}
		]
	}
	,
	plugins:[									//使用插件，通过plugins属性设置 
		new HtmlWebpackPlugin({					//每使用1个新插件，new 一下上面通过 require()引入的插件
			template:'./src/pages/index/index.art',//指定打包好的 .js文件，嵌入到src/pages/index目录下的 index.art文件中，
			filename:'index.html',				//并以此为模板，在 /dist目录中再克隆复制一份，名称为 index.html
			chunks:['index']
		}),
		new HtmlWebpackPlugin({					//每使用1个新插件，new 一下上面通过 require()引入的插件
			template:'./src/pages/destination/list.art',//指定打包好的 .js文件，嵌入到src/pages/destination目录下的 list.art文件中，
			filename:'list.html',				//释义：以list.art为模板复刻，复刻出来的文件叫list.html,			
			chunks:['list']						//在复刻的list.html中，加载叫list的js文件（entry指定的）
		}),
		new MiniCssExtractPlugin({
			filename:'css/[name].css'			//指定打包好的 .css文件目录和名称，并嵌入html，
		})
	]
}

