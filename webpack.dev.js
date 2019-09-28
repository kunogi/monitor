const merge=require('webpack-merge');
const common=require('./webpack.config.js');

module.exports=merge(common,{
	mode:"development",
	// 启用本地服务
	devServer:{
    	contentBase:'./build'
    }
});