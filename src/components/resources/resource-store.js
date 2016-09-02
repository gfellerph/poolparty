export default {
  state: {
    resources: [],
    filter: '',
  },
  mutations: {
    ADD_RESOURCE: (state, action) => {
      state.resources.push(action.resource);
    },

    /* eslint-disable arrow-body-style */
    UPDATE_RESOURCE: (state, action) => {
      state.resources = state.resources.map(resource => {
        return (resource.id === action.resource.id) ? action.resource : resource;
      });
    },
    /* eslint-enable arrow-body-style */

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

    REMOVE_RESOURCE: (state, action) => {
      state.resources = state.resources.filter(resource => resource.id !== action.resource.id);
    },

    SET_RESOURCE_FILTER: (state, action) => {
      state.filter = action.filter;
    },

    CLEAR_RESOURCES: (state) => {
      state.resources = [];
    },
  },
};
