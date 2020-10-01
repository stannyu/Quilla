import Vue from 'vue';
import App from './app/App';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

import { storage } from './app/store';

import Vuex from 'vuex';

locale.use(lang);

Vue.use(Vuex);
Vue.use(ElementUI);

const store = new Vuex.Store(storage);

new Vue({
  el: '#app',
  store,
  render: (h) => h(App)
});
