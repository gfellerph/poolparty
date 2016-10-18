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

    vuex: {
      getters: {
        filter: state => state.resources.filter,
        activePool: state => state.resources.activePool,
      },
    },

    firebase: {
      resources: {
        source: database.ref('/resources'),
        asObject: true,
      },
    },

    ready() {
      this.$firebaseRefs.resources.on('child_added', snapshot => {
        index.addDoc(snapshot.val());
      });

      this.$firebaseRefs.resources.on('child_removed', snapshot => {
        index.removeDoc(snapshot.val());
      });

      this.$firebaseRefs.resources.on('child_changed', snapshot => {
        index.updateDoc(snapshot.val());
      });
    },

    computed: {
      filteredResources() {
        let resultSet;

        if (!this.filter) {
          delete this.resources['.key'];
          resultSet = Object.keys(this.resources);
        } else {
          resultSet = index.search(this.filter, booster).map(r => r.ref);
        }

        return resultSet
          .map(r => new Resource(this.resources[r]))
          .filter(r => r.pool === this.activePool.id);
      },
    },

    components: {
      ResourceView,
    },
  };
</script>
