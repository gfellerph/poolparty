export default {
  state: {
    filter: '',
    activePool: null,
  },
  mutations: {

    TOGGLE_SKILL: (state, action) => {
      state.resources = state.resources.map((resource) => {
        if (resource.id === action.resourceId) {
          if (resource.skills.indexOf(action.skill.id)) {
            // Remove
            resource.skills = resource.skills.filter(skill => skill.id !== action.skill.id);
          } else {
            // Add
            resource.skills = resource.skills.concat([action.skill.id]);
          }
        }

        return resource;
      });
    },

    SET_RESOURCE_FILTER: (state, action) => {
      state.filter = action.filter;
    },

    SET_ACTIVE_POOL: (state, action) => {
      state.activePool = action.activePool;
    },
  },
  actions: {
    setFilter({ commit, state }, payload) {
      // Don't dispatch if filter is the same
      if (payload === state.filter) return;

      // Dispatch with new filter object
      commit('SET_RESOURCE_FILTER', {
        filter: payload,
      });
    },
    setActivePool({ commit }, payload) {
      commit('SET_ACTIVE_POOL', { activePool: payload });
    },
  },
};
