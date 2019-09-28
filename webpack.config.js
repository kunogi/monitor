let webpack=require('webpack');
let path=require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports={
	//entry: {		index:['babel-polyfill', './src/entry.js'],	},
	entry:'./src/entry.js',

	output:{
		path:path.resolve(__dirname,'build'),
		//publicPath: '/build/',
		filename: 'index.js'
	},
	
	mode:"development",

	//devtool:"eval-source-map",

	//解析模块请求的选项
	/*
	resolve:{
		modules:["node_modules"],
		extensions:['.js','.vue'],
		//模块别名列表
		alias:{
			'vue$':'vue/dist/vue.common.js'
		}
	},
*/
	module:{
		rules:[
			/*
			{
				test:/\.jsx?$/,
				use:'babel-loader',
				exclude:['/node_module/']
			},
			*/
			{
				test:/\.vue$/,
				loader:'vue-loader',
				exclude:['/node_module/']
			},
			{
				// 编译sass,配合postcss插件
				test: /\.(sc|sa|c)ss$/,
				exclude:'/node_modules/',
				use:['style-loader','css-loader','sass-loader']
				/*
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ['css-loader?sourceMap', 'postcss-loader', "sass-loader"]
				})
				*/
			}
		]
	},

	plugins:[
		/*
		new ExtractTextPlugin({
			filename:'index.css'
		})
		*/
		new VueLoaderPlugin()
	],

	// 不要打包这些模块，而是在运行时从环境中请求他们
	externals: {
		vue: 'Vue'
	}
};