import Vue from 'vue';
import Main from './Main';
import styles from './style/index.scss';

let app=new Vue({
	render:x=>x(Main)
}).$mount('#placeholder');