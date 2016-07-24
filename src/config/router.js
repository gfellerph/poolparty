import Vue from 'vue';
import Router from 'vue-router';
import Pool from 'components/pool';

Vue.use(Router);

// Router options
const router = new Router({
  hashbang: false,
  root: '/',
  linkActiveClass: 'active',
});

// Routes
export default router.map({
  '/pool': {
    component: Pool,
  },
});
