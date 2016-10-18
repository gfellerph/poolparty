import Vue from 'vue';
import Router from 'vue-router';
import Resources from 'components/resources';
import Invitation from 'components/invite/invitation';
import Invite from 'components/invite/invite';

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
  '/invite': {
    component: Invite,
  },
  '/invite/:id': {
    component: Invitation,
  },
});
