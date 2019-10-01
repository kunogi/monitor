<template>
	<section class="titlearea">
		<section class="brandarea">
			<div class="namestyle">{{obj.name}}</div>
			<div class="symbolstyle">{{code}}</div>
		</section>

		<section :class="market=='fx'?'priceareawide':'pricearea'">
			<div :class="[obj.type,'mainprice']">{{obj.price}}</div>
			<div :class="[obj.type,'priceextra']">{{obj.percent}}</div>
			<div :class="[obj.type,'priceextra']">{{obj.change}}</div>
		</section>

		<section :class="market=='fx'?'infoareanarrow':'infoarea'">
			<div class="infodiv">高 <span :class="obj.high==obj.prevclose?'equal':obj.high>obj.prevclose?'red':'green'">{{obj.high}}</span></div>
			<div class="infodiv">开 <span :class="obj.open==obj.prevclose?'equal':obj.open>obj.prevclose?'red':'green'">{{obj.open}}</span></div>
			<div class="infodiv">低 <span :class="obj.low ==obj.prevclose?'equal':obj.low >obj.prevclose?'red':'green'">{{obj.low}}</span></div>
			<!--
			<div class="infodiv" v-if="market=='sh' || market=='sz' || market=='hk' || market=='sb'">额：<span class="equal">{{obj.totalAmount}}</span></div>
			<div class="infodiv" v-else>量：<span class="equal">{{obj.totalVolume}}</span></div>
			-->
			<div class="infodiv">额 <span class="equal">{{obj.totalAmount}}</span></div>
			<div class="infodiv">量 <span class="equal">{{obj.totalVolume}}</span></div>
		</section>
	</section>
</template>

<script>
	/**文字报价区*/
	import {utils, dispather} from "../util/utils";
	import {cfg} from "../util/cfg";

	export default{
		data:function(){
			return{
				obj:{},
				code:'',
				market:''
			}
		},
		props:{
			symbol:'',
			hqData:undefined,
			hqStr:undefined
		},
		mounted(){
			this.market=utils.fn.getMarketViaSymbol(this.symbol);
return;
			dispather.$on(cfg.EVT.UPDATE_HQ_OBJ,_=>{
				this.obj=_[this.symbol];
				this.code=this.obj.code.toUpperCase();
			})
		},
		watch:{
			hqData(){
				this.obj=this.hqData[this.symbol];
				this.code=this.obj.code.toUpperCase();
			}
		}
	}
</script>