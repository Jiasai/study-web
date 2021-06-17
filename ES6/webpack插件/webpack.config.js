const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
	module.exports = {
	  mode:'development',
	  entry: {
		  index:'./src/index.js',
		  search:'./src/search.js',
		  login:'./src/login.js'
	  },
	  output: {
	    path: path.resolve(__dirname, 'dist'),
	    filename: '[name].js'
	  },
	  module:{
	  	rules:[
	  	  {
	  		test:/\.js$/,
	  		exclude:/node_moudules/,
	  		loader:'babel-loader'
	  	  }
	  	]
	  },
	  plugins:[
	  	new HtmlWebpackPlugin({
	  	 template:'./index.html',
	  	 filename:'index.html',
	  	 chunks:['index'],
		 minify:{
		 	//删除index.html中的注释
		 	removeComments:true,
		 	//删除index.html中的空格
		 	collapseWhitespace:true,
		 	//删除各种html标签属性值的双引号
		 	removeAttributeQuotes:true
		 }
	  	}),
	  	new HtmlWebpackPlugin({
	  	 template:'./search.html',
	  	 filename:'search.html',
	  	 chunks:['search','login']
	  	}),
	  	new HtmlWebpackPlugin({
	  	 template:'./login.html',
	  	 filename:'login2.html',
	  	 chunks:['login','search','index']
	  	})
	  ]
	};