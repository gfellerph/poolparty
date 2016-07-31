<template lang="pug">
  ul.resources
    li(v-for="resource in filteredResources")
      span {{resource.name}}, {{resource.website}}, {{resource.location}}
</template>

<script>
  import resourceIndex from 'components/pool/resource-index';

  export default {
    computed: {
      filteredResources() {
        if (!this.filter) return this.resources;

        const res = resourceIndex.search(this.filter);

        return res.map(r => this.resources.filter(resource => resource.key === r.ref)[0]);
      },
    },
    vuex: {
      getters: {
        filter: state => state.pool.filter,
        resources: state => state.pool.resources,
      },
    },
  };
</script>
