<template lang="pug">
  form
    h3 NEW POOL
    p
      label Name
      input(
        v-model="pool.name"
      )

    ul
      li(v-for="user in users")
        label
          input(
            type="checkbox"
            v-bind:value="user.id"
            v-model="pool.users"
          )
          img(v-bind:src="user.photoURL" v-bind:alt="user.username")
          span {{user.username}}
    p
      button(
      ) Save pool

</template>

<script>
  import Pool from 'models/pool';
  import firebase from 'config/firebase';

  export default {
    data() {
      return {
        pool: new Pool(),
        users: [],
      };
    },

    created() {
      const poolsRef = firebase
        .database()
        .ref('/pools');
      poolsRef.on('child_added', this.addUser);
      poolsRef.on('child_changed', this.changeUser);
      poolsRef.on('child_removed', this.removeUser);
    },

    methods: {
      addUser(snapshot) {
        this.users.push(snapshot.val());
      },
      changeUser() {
        // update user
      },
      removeUser() {
        // slice user
      },
    },
  };
</script>