import resourceIndex from 'components/pool/resource-index';

export default {
  state: {
    resources: [],
    filter: '',
  },
  mutations: {
    ADD_RESOURCE: (state, action) => {
      state.resources.push(action.resource);
      resourceIndex.add(action.resource);
    },

    REMOVE_RESOURCE: (state, action) => {
      state.resources = state.resources.filter(resource => resource.key !== action.resource.key);
      resourceIndex.remove(action.resource);
    },

    SET_FILTER: (state, action) => {
      state.filter = action.filter;
    },
  },
};
