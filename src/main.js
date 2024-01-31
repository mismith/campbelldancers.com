import Vue from 'vue';
import App from './App';
import router from './router';

// config
Vue.config.productionTip = false;
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
