import Vue from 'vue';
import Vuex from 'vuex';
import auth from 'components/auth/auth-store';
import pool from 'components/pool/pool-store';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    pool,
  },
});
