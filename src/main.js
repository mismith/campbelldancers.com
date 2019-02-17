import Vue from 'vue';
import VueFire from 'vuefire';
import moment from 'moment-mini';
import VueModal from 'vue-js-modal';
import App from './App';
import router from './router';

// IE 11 compat
require('array-includes').shim();
require('array.prototype.find').shim();

// config
Vue.config.productionTip = false;
Vue.use(VueFire);
Vue.use(VueModal);
Vue.prototype.moment = moment;
export const country = window.location.search.indexOf('oz') >= 0
  || window.location.hostname.indexOf('oz') >= 0
  ? 'AU'
  : 'CA';
export const countryFilter = (item) => {
  if (item.country) {
    return item.country === country;
  }
  if (item['@countries']) {
    return !!item['@countries'][country];
  }
  return country === 'CA';
};
Vue.prototype.country = country;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
