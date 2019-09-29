import Vue from 'vue';
import Main from './Main.vue';
import styles from './style/index.scss';

new Vue({
	el:'#placeholder',
	render:function(_){
		return _(Main);
	}
})//.$mount('#placeholder');