import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Enroll from '@/components/Enroll';
import Admin from '@/components/Admin';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/enroll',
      name: 'enroll',
      component: Enroll,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
    return {
      x: 0,
      y: 0,
    };
  },
});
