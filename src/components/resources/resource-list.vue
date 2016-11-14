<template lang="pug">
  div.resources
    transition-group(name="resources" tag="div")
      div.resource-li(v-for="resource in filteredResources" v-bind:key="resource.id")
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

<style lang="scss">
  .resource-li {
    margin: 1rem 0;
    padding: 1.5rem;
    border: 3px solid red;
    box-shadow: 3px 3px 0 0 blue;
  }

  .resources-enter-active {
    transition: all 2s;
  }
  .resources-enter {
    opacity: 0;
    transform: translateX(-100%);
  }
  .resources-move {
    transition: transform 500ms;
  }
  .resources-leave {
    opacity: 0;
    transform: translateX(-100%);
  }
  .resources-leave-active {
    transition: all 2s;
  }
</style>