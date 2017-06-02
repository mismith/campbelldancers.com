import Vue from 'vue';
import VueFire from 'vuefire';
import App from './App';
import router from './router';
import { firebase } from './helpers/firebase';

Vue.config.productionTip = false;
Vue.use(VueFire);

Vue.directive('modelFirebaseSync', {
  inserted(el, binding) {
    el.addEventListener('input', () => {
      firebase.database().ref(binding.value).set(el.value);
    });
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
