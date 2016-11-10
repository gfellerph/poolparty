<template lang="pug">
  ul.resources
    li(v-for="resource in filteredResources")
      resource-view(v-bind:resource="resource")
</template>

<script>
  import { database } from 'config/firebase';
  import { index, booster } from 'components/resources/resource-index';
  import ResourceView from 'components/resources/resource';
  import Resource from 'models/resource';

  export default {
    computed: {
      filteredResources() {
        let resultSet;

        if (!this.filter) {
          delete this.resources['.key'];
          delete this.resources['.value'];
          resultSet = Object.keys(this.resources);
        } else {
          resultSet = index.search(this.filter, booster).map(r => r.ref);
        }

        return resultSet
          .map(r => new Resource(this.resources[r]))
          .filter((r) => {
            return (this.activePool)
              ? r.pool === this.activePool.id
              : r;
          });
      },
      filter() { return this.$store.state.resources.filter; },
      activePool() { return this.$store.state.resources.activePool; },
    },

    firebase: {
      resources: {
        source: database.ref('/resources'),
        asObject: true,
      },
    },

    mounted() {
      this.$firebaseRefs.resources.on('child_added', (snapshot) => {
        index.addDoc(snapshot.val());
      });

      this.$firebaseRefs.resources.on('child_removed', (snapshot) => {
        index.removeDoc(snapshot.val());
      });

      this.$firebaseRefs.resources.on('child_changed', (snapshot) => {
        index.updateDoc(snapshot.val());
      });
    },

    components: {
      ResourceView,
    },
  };
</script>
