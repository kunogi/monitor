<template>
	<span :class="[info.status>0?'infostatus':'', info.online==1?'infoonline':'']">
		{{info.name}}<br/>{{info.timepart}}
	</span>
</template>

<script>
	/**线路状态 样式变化*/
	export default{
		data(){
			return{

			}
		},
		props:{
			info:undefined
		}
	}
</script>