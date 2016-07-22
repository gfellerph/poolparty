export default {
  state: {
    loggedIn: false,
    user: null,
  },
  mutations: {
    LOGIN: (state, action) => {
      state.loggedIn = true;
      state.user = action.user;
    },

    LOGOUT: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
};
