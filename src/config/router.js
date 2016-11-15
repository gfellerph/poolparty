import Vue from 'vue';
import Router from 'vue-router';
import Resources from 'components/resources';
import Invitation from 'components/invite/invitation';
import Invite from 'components/invite/invite';

Vue.use(Router);

// Router options
const router = new Router({
  base: '/',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/resources',
      component: Resources,
    },
    {
      path: '/invite',
      component: Invite,
    },
    {
      path: '/invite/:id',
      component: Invitation,
    },
  ],
});

export default router;
