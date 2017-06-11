import Vue from 'vue';
import VueFire from 'vuefire';
import App from './App';
import router from './router';

// IE 11 compat
require('array-includes').shim();
require('array.prototype.find').shim();

// config
Vue.config.productionTip = false;
Vue.use(VueFire);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
