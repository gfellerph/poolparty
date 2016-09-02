import Vue from 'vue';
import Vuex from 'vuex';
import auth from 'components/auth/auth-store';
import resources from 'components/resources/resource-store';
import skills from 'components/skills/skill-store';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    resources,
    skills,
  },
});
