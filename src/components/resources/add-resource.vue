<template lang="pug">
  form
    h3 NEW RESOURCE
    p
      label Name
      input(
        v-model="resource.name"
      )

    p
      label Website
      input(
        v-model="resource.website"
      )

    p
      label Location
      input(
        v-model="resource.location"
      )

    ul
      li(v-for="skill in skills")
        label()
          input(
            type="checkbox"
            v-bind:value="skill.id"
            v-model="resource.skills"
          )
          span {{skill.name}}
    p
      button Cancel
      button(@click.prevent="save") Save
</template>

<script>
  import Resource from 'models/resource';
  import { database } from 'config/firebase';

  export default {
    name: 'add-resource',

    data() {
      return {
        resource: new Resource(),
      };
    },

    vuex: {
      getters: {
        user: state => state.auth.user,
        activePool: state => state.resources.activePool,
      },
    },

    firebase: {
      skills: database.ref('/skills'),
    },

    methods: {
      save() {
        this.resource.user = this.user.uid;
        this.resource.pool = this.activePool.id;
        this.resource.set()
          .catch(err => {
            throw err;
          });
        this.resource = new Resource();
      },
    },
  };
</script>