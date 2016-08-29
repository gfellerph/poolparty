<template lang="pug">
  div
    span(v-if="!edit" @click="toggleEdit") {{resource.name}} {{resource.location}} {{resource.website}} 
      span [{{skillList}}]
    form(
      v-if="edit"
      @keydown.enter="updateResource"
      @keydown.esc="toggleEdit"
    )
      p
        label Name
        input(v-model="pResource.name" v-focus-auto)

      p
        label Location
        input(v-model="pResource.location")

      p
        label Website
        input(v-model="pResource.website")

      ul
        li(v-for="skill in skills")
          label
            input(
              type="checkbox"
              v-bind:value="skill.id"
              v-model="pResource.skills"
            )
            span {{skill.name}}

      p.error(v-for="error in errors") {{error}}
      
      p
        button(@click="toggleEdit") Cancel
        button(@click="updateResource") Save
</template>

<script>
  import Resource from 'models/resource';
  import { focusAuto } from 'vue-focus';

  export default {
    data() {
      return {
        edit: false,
        pResource: new Resource(this.resource),
        errors: [],
      };
    },

    props: {
      resource: Object,
    },

    directives: {
      focusAuto,
    },

    computed: {
      skillList() {
        const filtered = this.skills.filter(skill => this.resource.skills.indexOf(skill.id) >= 0);
        return filtered.map(skill => skill.name).join(', ');
      },
    },

    methods: {
      toggleEdit() {
        this.edit = !this.edit;
      },

      updateResource() {
        this.pResource.set()
          .then(() => {
            this.toggleEdit();
          })
          .catch(err => { throw err; });
      },
    },

    vuex: {
      getters: {
        skills: state => state.pool.skills,
      },
      actions: {
        dispatchUpdateResource({ dispatch }) {
          dispatch('UPDATE_RESOURCE', {
            resource: this.pResource,
          });
        },
      },
    },
  };
</script>
