import User from 'models/user';

export default {
  state: {
    authenticated: false,
    user: new User(),
  },
  mutations: {
    LOGIN(state, action) {
      state.authenticated = true;
      state.user = new User(action.user);
    },

    LOGOUT(state) {
      state.authenticated = false;
      state.user = new User();
    },
  },
};
