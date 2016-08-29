<template lang="pug">
  ul.resources
    li(v-for="resource in filteredResources")
      resource-view(v-bind:resource="resource")
</template>

<script>
  import { index, booster } from 'components/pool/resource-index';
  import ResourceView from 'components/pool/resource';
  import Resource from 'models/resource';

  export default {
    computed: {
      filteredResources() {
        if (!this.filter) return this.resources;

        const res = index.search(this.filter, booster);

        return res.map(r => {
          for (let i = 0; i < this.resources.length; i++) {
            if (this.resources[i].id === r.ref) {
              return this.resources[i];
            }
          }
          return r;
        });
      },
    },
    vuex: {
      getters: {
        filter: state => state.pool.filter,
        resources: state => state.pool.resources.map(resource => new Resource(resource)),
      },
    },
    components: {
      ResourceView,
    },
  };
</script>
