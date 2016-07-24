<template lang="pug">
  form
    p
      label Name
      input(
        v-model="name"
      )

    p
      label Website
      input(
        v-model="website"
      )

    p
      label Location
      input(
        v-model="location"
      )

    ul
      li(v-for="skill in skills") {{skill}}

    p
      button Cancel
      button(@click="save") Save
</template>

<script>
  import firebase from 'config/firebase';

  const defaultResource = {
    name: '',
    website: '',
    location: '',
    skills: [''],
  };

  export default {
    name: 'add-resource',

    data() {
      return Object.assign({}, defaultResource);
    },

    methods: {
      save() {
        const newResourceRef = firebase
          .database()
          .ref('/resources')
          .push();

        // Merge with key
        const newResource = Object.assign({
          key: newResourceRef.key,
        }, this.$data);

        newResourceRef.set(newResource);

        this.$data = Object.assign({}, defaultResource);
      },
    },

    vuex: {
      getters: {
        user: state => state.auth.user,
      },
    },
  };
</script>