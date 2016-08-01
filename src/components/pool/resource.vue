<template lang="pug">
  div
    span(v-if="!edit" @click="toggleEdit") {{resource.name}} {{resource.location}} {{resource.website}}
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

      p.error(v-for="error in errors") {{error}}
      
      p
        button(@click="toggleEdit") Cancel
        button(@click="updateResource") Save
</template>

<script>
  import firebase from 'config/firebase';
  import { focusAuto } from 'vue-focus';

  export default {
    data() {
      return {
        edit: false,
        pResource: Object.assign({}, this.resource),
        errors: [],
      };
    },
    props: {
      resource: Object,
    },
    directives: {
      focusAuto,
    },
    methods: {
      toggleEdit: function toggleEdit() {
        this.$set('edit', !this.edit);
      },

      updateResource() {
        firebase
          .database()
          .ref(`/resources/${this.resource.key}`)
          .set(this.pResource)
          .catch(err => {
            this.errors.push(err.message);
          });
      },
    },
  };
</script>
