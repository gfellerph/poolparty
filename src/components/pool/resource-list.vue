<template lang="pug">
  ul.resources
    li(v-for="resource in resources")
      span {{resource.name}}, {{resource.website}}, {{resource.location}}
</template>

<script>
  import resourceIndex from 'components/pool/resource-index';

  export default {
    vuex: {
      getters: {
        resources: state => {
          const { resources, filter } = state.pool;

          if (!filter) return resources;

          const res = resourceIndex.search(filter);

          return resources.filter(resource => {
            for (let i = 0; i < res.length; i++) {
              if (resource.key === res[i].key) return true;
            }
            return false;
          });
        },
      },
    },
  };
</script>
