<template>
	<div :id="domid" style="height:290px;width:100%;"></div>
</template>

<script>
	/**行情图配置*/
	import { dispather } from "../util/utils";
	import {cfg} from "../util/cfg"

	export default{
		data(){
			return {
				isInit:true,
				chart:undefined
			}
		},
		props:{
			symbol:'',
			domid:'',
			hqData:undefined,
			hqObj:undefined
		},
		methods:{
			getCfg(symbol_){
				let isH5k=symbol_.indexOf('fx_')==0;
				let api=['chart',isH5k?'h5k':'h5t','get'].join('.');

				return {
					api:api,
					view:isH5k?'k1':'t1',
					nfloat:isH5k?4:2,
					theme:{
						T_RISE:'#FD4331',
						T_FALL:'#05AA3B',

						K_RISE:'#FD4331',
						K_FALL:'#05AA3B',

						//BG: '#1B1E2A', //背景色（行情图本身透明，此设定用于指示当前背景色，如微博截图分享的图片底色等）。
						T_P: '#fff', //分时图价格线颜色
						T_AVG: '#EE9449', //分时图价格均线颜色
						T_PREV: '#EE9449', //分时图昨收线颜色

						K_CL:'#fff',

						//k candle:
						K_N: '#999', //k线平

						//t(scales) related:
						T_N: '#fff', //分时刻度 平

						//info floater:
						F_RISE:'#e1494d',//信息浮层中文字的涨
						F_FALL:'#2ec196',//信息浮层 跌
						F_N:'#ddd',//信息浮层 平
						F_BG:'rgba(55,55,55,.9)',//信息浮层背景色
						F_BR:'#555',//信息浮层外边框
						F_T:'#ddd',//信息浮层中涨跌外的普通文字

						K_EXT: '#5D718C', //k线极值文字颜色
						T_T: '#838383', //副图指标名称颜色
						K_P: '#5D718C', //k线刻度、副图指标刻度颜色
						V_SD: '#777', //背景成交量颜色
						M_ARR: ['#51A7FF', '#4486CB'], //mountain样式渐变色，参数类型：数组。等比例从此数组指定的第一个颜色开始过渡到最后一个。如果数组中只有一个颜色，则使用此单一颜色完成填充。
						M_ARR_A:[.7,0],//对应于M_ARR渐变色填充的透明度，取值范围：[0,1] ，0为完全透明。

						TIME_S: '#5D718C', //时间刻度文字颜色
						TIME_L: '#1F3B57', //时间线颜色
						GRID: '#1F3B57', //横向背景线颜色

						IVH_LINE: '#DAE2EB', //十字交互线颜色
						P_TC: '#dae2eb', //交互价格标签文字颜色
						P_BG: '#000000', //交互价格标签背景颜色
						T_TC: '#dae2eb', //交互时间标签文字颜色
						T_BG: '#000000', //交互时间标签背景颜色 #3e3d44

						REMARK_T: '#fff', //k线复权标记文字颜色
						REMARK_BG: 'rgb(62, 61, 68)',
						K_PCT: '#666', //k线背景百分比刻度文字颜色
						BTN_ARR: ['#2e2d32', '#999'], //提示层中按钮色指定，顺序：[背景色,文字色]
						TIP_ARR: ['#2f2d32', '#999', null, true, '40%'], //提示层颜色，顺序：[背景色,文字色]
						LOGO: '#555'  //水印色
					}
				};
			},
			onResize(){
				this.chart.resize();
			},
			init(){
				let chartCfg=this.getCfg(this.symbol);

				KKE.api(chartCfg.api,{
					domid:this.domid,
					view:chartCfg.view,
					nfloat:chartCfg.nfloat,
					symbol:this.symbol,
					theme:chartCfg.theme,
					t_rate:30*60,//30min
					rate:0//no http hq request
				},chart_=>{
					this.chart=chart_;

					chart_.toggleExtend();

					chart_.setLineStyle({
						linetype:'mountain_1.2'
					});
					chart_.setCustom({
						mousewheel_zoom:false
					});

					if(chart_.type=='h5k'){
						chart_.setCustom({
							k_0pct:'hq',
							mousewheel_zoom:false,
							show_k_rangepercent:false,
							show_ext_marks:false
						});

						if(this.isInit){
							this.isInit=false;
							let r=new Date(),
								n=60*r.getTimezoneOffset()*1e3;
							r.setTime(r.getTime()+n);
							r.setHours(r.getHours()+2);//6 hours
							chart_.showRangeSelector({
								display:false,
								from:r,
								to:new Date(99999,9,9)
							});
						}
					}

					window.addEventListener('resize',this.onResize);
					
					return;
					dispather.$on(cfg.EVT.UPDATE_HQ_STR,_=>{
						let hqStr=_[this.symbol];
						//console.log('push data to chart:',hqStr, this.symbol);
						hqStr&&this.chart&&this.chart.pushData([{
							symbol:this.symbol,
							data:hqStr
						}],1);
					});
					
				});
			}
		},
		mounted(){
			this.init();
		},
		watch:{
			hqData(){
				let hqStr=this.hqData[this.symbol];
				console.log('chart watch hqData',this.symbol,hqStr);
				hqStr&&this.chart&&this.chart.pushData([{
					symbol:this.symbol,
					data:hqStr
				}],1);
			}
		}
	};
</script>