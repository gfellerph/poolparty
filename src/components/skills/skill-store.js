import Vue from 'vue';

export default {
  state: {
    skills: {},
  },
  mutations: {
    SET_SKILLS: (state, action) => {
      state.skills = Object.assign({}, action.skills);
    },

    SET_SKILL: (state, action) => {
      Vue.set(state.skills, action.skill.id, action.skill);
    },

    REMOVE_SKILL: (state, action) => {
      delete state.skills[action.skill.id];
    },

    CLEAR_SKILLS: (state) => {
      state.skills = [];
    },
  },
};
