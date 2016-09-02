import Vue from 'vue';
import Router from 'vue-router';
import Resources from 'components/resources';

Vue.use(Router);

// Router options
const router = new Router({
  hashbang: false,
  root: '/',
  linkActiveClass: 'active',
});

// Routes
export default router.map({
  '/resources': {
    component: Resources,
  },
});
