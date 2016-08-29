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

  export default {
    name: 'add-resource',

    data() {
      return {
        resource: new Resource(),
      };
    },

    methods: {
      save() {
        this.resource.user = this.user;
        this.resource.set()
          .catch(err => {
            throw err;
          });
        this.resource = new Resource();
      },
    },

    vuex: {
      getters: {
        user: state => state.auth.user,
        skills: state => state.pool.skills,
      },
    },
  };
</script>