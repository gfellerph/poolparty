import Vuex from 'vuex';
import auth from 'components/auth/auth-store';

export default new Vuex.Store({
  strict: true,
  modules: {
    auth
  }
});