export default {
  state: {
    resources: [],
    skills: [],
    filter: '',
  },
  mutations: {
    ADD_RESOURCE: (state, action) => {
      state.resources.push(action.resource);
    },

    /* eslint-disable arrow-body-style */
    UPDATE_RESOURCE: (state, action) => {
      state.resources = state.resources.map(resource => {
        return (resource.key === action.resource.key) ? action.resource : resource;
      });
    },
    /* eslint-enable arrow-body-style */

    REMOVE_RESOURCE: (state, action) => {
      state.resources = state.resources.filter(resource => resource.key !== action.resource.key);
    },

    ADD_SKILL: (state, action) => {
      state.skills.push(action.skill);
    },

    /* eslint-disable arrow-body-style */
    UPDATE_SKILL: (state, action) => {
      state.skills = state.skills.map(skill => {
        return (skill.key === action.skill.key) ? action.skill : skill;
      });
    },
    /* eslint-enable arrow-body-style */

    REMOVE_SKILL: (state, action) => {
      state.skills = state.skills.filter(skill => skill.key !== action.skill.key);
    },

    SET_FILTER: (state, action) => {
      state.filter = action.filter;
    },

    CLEAR_RESOURCES: (state) => {
      state.resources = [];
    },
  },
};
