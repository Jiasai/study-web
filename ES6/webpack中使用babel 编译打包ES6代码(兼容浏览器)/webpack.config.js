const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
	module.exports = {
	  mode:'development',
	  entry: {
		  index:'./src/js/page.js'
	  },
	  output: {
	    path: path.resolve(__dirname, 'dist'),
	    filename: 'page.js'
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
	  		template:'./index.html'
	  	})
	  ]
	};