export default {
  state: {
    filter: '',
    activePool: null,
  },
  mutations: {

    TOGGLE_SKILL: (state, action) => {
      state.resources = state.resources.map(resource => {
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
};
