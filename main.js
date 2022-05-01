import App from './App'
import store from './store'
import i18n from './lang/i18n'
import uView from '@/uni_modules/uview-ui'
import formatter from '@/utils/formatter'
import htmlUtil from '@/utils/htmlUtil.js'

// #ifndef VUE3
import Vue from 'vue'
App.mpType = 'app'
Vue.config.productionTip = false
Vue.prototype.$store = store
//格式化工具包
Vue.prototype.$formatter = formatter;
Vue.prototype.$htmlUtil = htmlUtil;

//引入全局uView
Vue.use(uView);

// 引入uView对小程序分享的mixin封装
let mpShare = require('uni_modules/uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare);

//import vConsole from 'vconsole' // 引入vconsole
//Vue.prototype.$vConsole = new vConsole() // 使用vconsole

const app = new Vue({
	i18n,
	store,
	...App
})
app.$mount()
// #endif


// #ifdef VUE3
import {createSSRApp} from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	app.use(i18n)
	app.use(store)
	return {app}
}
// #endif
