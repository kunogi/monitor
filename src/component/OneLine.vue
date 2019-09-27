<template>
	<span :class="[info.status>0?'infostatus':'', info.online==1?'infoonline':'']">
		{{info.name}}<br/>{{info.timepart}}
	</span>
</template>

<script>
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