<template>
	<section class="lineinfo">
		<OneLine :info="hqObj" class="hqtime"></OneLine>
		<OneLine v-for="o in marketData" :info="o" :key="o.name"></OneLine>
	</section>
</template>

<script>
	import OneLine from './OneLine.vue';
	import {utils} from '../util/utils';
	import {cfg} from '../util/cfg';

	export default{
		data(){
			return {
				market:'',
				market2:'',
				marketData:undefined,
				hqObj:{
					name:'行情时间',
					timepart:''
				}
			}
		},
		props:{
			fullData:undefined,
			symbol:'',
			hqData:undefined
		},
		mounted(){
			this.market=utils.fn.getMarketViaSymbol(this.symbol);
			this.checkMarket2();
		},
		watch:{
			fullData(){
				this.gotMarketData();
			},
			hqData(){
				this.gotHqData();
			}
		},
		methods:{
			checkMarket2(){
				if(cfg.dcedatas){
					let code=this.symbol.split('_')[1];
					for(let d=cfg.dcedatas,i=d.length;i--;){
						if(d[i].symbol==code){
							this.market2='dce';
							break;
						}
					}
				}else{
					setTimeout(this.checkMarket2,999);
				}
			},
			gotMarketData(){
				this.marketData=[];
				for(let one,i=this.fullData.length;i--;){
					one=this.fullData[i];
					one.timepart=utils.fn.dst(utils.fn.timestampToDate(one.time,1000),true);
					if(one.market==this.market || one.market==this.market2){
						this.marketData.push(one);
					}
				}
			},
			gotHqData(){
				let d=this.hqData[this.symbol];
				this.hqObj.timepart=d.time;
			}
		},
		components:{
			'OneLine':OneLine
		}
	}
</script>