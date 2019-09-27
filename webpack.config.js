let webpack=require('webpack');
let path=require('path');
//let ExtractTextPlugin=require("extract-text-webpack-plugin");

// 切换至生产模式
if(process.env.NODE_ENV==='production'){
	module.exports.plugins=(module.exports.plugins || []).concat([
		/*
		new webpack.DefinePlugin({
			'process.env':{
				NODE_ENV:'"production"'
			}
		}),
		*/
		// Minify the code.
		/*
		new webpack.LoaderOptionsPlugin({
			minimize:true
		}),
		*/
		// new webpack.optimize.CommonsChunkPlugin({
		//     name: 'common',
		//     filename: 'common_bundle.js',
		// }),
		/*
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				// 在UglifyJs删除没有用到的代码时不输出警告
				warnings:false,
				// 删除所有的 `console` 语句
				// 还可以兼容ie浏览器
				drop_console:true,
				// 内嵌定义了但是只用到一次的变量
				collapse_vars:true,
				// 提取出出现多次但是没有定义成变量去引用的静态值
				reduce_vars:true
			},
			output:{
				// 最紧凑的输出
				beautify:false,
				// 删除所有的注释
				comments:false
			}
		}),
		*/
	]);
}

module.exports={
	//entry: {		index:['babel-polyfill', './src/entry.js'],	},
	entry:'./src/entry.js',

	output:{
		path:path.resolve(__dirname,'build'),
		//publicPath: '/build/',
		filename: 'js.js'
    },

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
			{
				test:/\.jsx?$/,
				use:'babel-loader',
				exclude:['/node_module/']
			},
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
	],

	// 不要打包这些模块，而是在运行时从环境中请求他们
	/*
	externals: {
		vue: 'Vue'
	},
	*/
    // 启用本地服务
	devServer:{
        // contentBase: path.join(__dirname, "build"),
        // compress: true,
        // https: true,
        // noInfo: true,
		/*
		proxy:{
			'/': {
				target: "http://10.210.73.55",
				secure: false,
				changeOrigin: true
			}
		},
		*/
        host:'127.0.0.1',
        historyApiFallback: true,
        hot: true,
        port: 2345
    }
};