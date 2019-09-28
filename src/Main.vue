<template>
	<div id="app" class="flexbox">
		<section v-for="(one,idx) in symbolArr" :key="idx" class="itemsection">
			<Title :symbol="one.symbol" :hqData="hqObj" :hqStr="hqStr"></Title>
			<Chart :symbol="one.symbol" :hqData="hqStr" :hqObj='hqObj' :domid="'dom_'+one.symbol+'_'+idx" :style="{'background':exceptionInfo(one.symbol)}"></Chart>
			<LineInfo :symbol="one.symbol" :hqData="hqObj" :fullData="hqInfoData"></LineInfo>
		</section>
	</div>

</template>

<script>
	import Chart from './component/Chart.vue';
	import Title from './component/Title.vue';
	import LineInfo from './component/LineInfo.vue';

	import {utils} from './util/utils';
	import {cfg} from './util/cfg';

	export default{
		data(){
			return {
				symbolArr:[
					{symbol:'sh000001'},
					{symbol:'sz399006'},
					{symbol:'rt_hkHSI'},
					{symbol:'fx_susdcny'},
					{symbol:'gb_$ixic'},
					{symbol:'lse_lse'},
					{symbol:'nf_I0'},
					{symbol:'nf_IF0'},
					{symbol:'hf_CL'},
					{symbol:'znb_NKY'}
				],
				hqObj:undefined,
				hqStr:undefined,
				hqInfo:{
					url:'https://aa.sinajs.cn/mon/hq.php?type=',
					keys:'lv1sh,lv1sh_fast,lv2sh,lv1sz,lv2sz,us,hk,fx,sb,dce',
					jsvar:'hq_mon'
				},
				hqInfoData:undefined,
				futureUrl:'//gu.sina.cn/hq/api/openapi.php/FuturesService.getInner?sort=percent&asc=0&page=1&num=99&type=$type&callback=$cb'
			}
		},
		created(){
			this.getSymbolsFromHash();
		},
		mounted(){
			this.initDCESymbols();
			this.initPhpData();
			this.initWs();
		},
		methods:{
			getSymbolsFromHash(){
				let obj=utils.fn.getUrlParam();
				if(obj.symbols){
					let arr=obj.symbols.split(','),symbolArr=[];
					for(let one,i=0,l=arr.length;i<l;i++){
						symbolArr.push({symbol:arr[i]});
					}
					this.symbolArr=symbolArr;
				}
			},
			initDCESymbols(){
				let v='__dce__';

				utils.fn.load(
					this.futureUrl.replace('$type','dce').replace('$cb',['var%20',v,'='].join('')),
					function(){cfg.dcedatas=window[v].result.data.data;},
					this.loadErr
				);
			},
			initWs(){
				let _self=this;
				let symbols='';
				for(let i=this.symbolArr.length;i--;){
					symbols+=this.symbolArr[i].symbol+',';
				}
				new HQ.DataCenter({
					symbols:symbols,
					getStr:function(_){
						_self.hqStr=_;
					},
					getObj:function(_){
						_self.hqObj=Object.assign({},_);
					}
				});
			},
			initPhpData(){
				this.loadHqInfo();
				setInterval(this.loadHqInfo,5000);
			},
			loadHqInfo(){
				let url=[this.hqInfo.url,this.hqInfo.keys].join('');
				utils.fn.load(url,this.loaded,this.loadErr);
			},
			loaded(){
				this.hqInfoData=window[this.hqInfo.jsvar];
			},
			loadErr(){},
			dceMarket(sb_){
				let market='';
				if(cfg.dcedatas){
					let code=sb_.split('_')[1];
					for(let d=cfg.dcedatas,i=d.length;i--;){

						if(d[i].symbol==code){
							market='dce';
							break;
						}
					}
				}
				return market;
			},
			exceptionInfo(sb_){
				let bg='';
				if(!this.hqInfoData)return bg;
				for(let one,i=this.hqInfoData.length;i--;){
					one=this.hqInfoData[i];
					if((one.market==utils.fn.getMarketViaSymbol(sb_) || this.dceMarket(sb_)==one.market) && one.status>0){
						bg='rgba(30,30,240,.5)';
					}
				}
				return bg;
			}
		},
		components:{
			'Chart':Chart,
			'Title':Title,
			'LineInfo':LineInfo
		}
	}
</script>
