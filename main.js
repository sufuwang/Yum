import Vue from 'vue';
import App from './App';
import langPackage from './locale/index';

Vue.config.productionTip = false;

App.mpType = 'app';

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

// modal组件
import HModal from './components/h-modal/h-modal';
Vue.component('HModal', HModal)
// 自定义返回组件
import BackHeader from './components/h-header/back-header';
Vue.component('BackHeader', BackHeader)

// vuex
import store from '@/store';

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);

// 引入uView对小程序分享的mixin封装
let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare);

// VueI18n
import VueI18n from 'vue-i18n'
// VueI18n
Vue.use(VueI18n);

let i18nConfig = {
  locale: uni.getLocale() || 'japan',
  messages:langPackage
}
const i18n = new VueI18n(i18nConfig)

const app = new Vue({
	i18n,
	store,
	...App
});

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js';
Vue.use(httpInterceptor, app);

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/common/http.api.js';
Vue.use(httpApi, app);

app.$mount();
