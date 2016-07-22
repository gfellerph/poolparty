<template lang="pug">
  div
    button(v-if="!user" @click="login") login
    button(v-if="user" @click="logout") logout
    p(v-if="user") Hoi {{user.displayName}}
    p.error(v-if="err") {{err}}
</template>

<script>
  import firebase from 'config/firebase';
  import store from 'config/store';
  import User from 'models/user';

  export default {
    data() {
      return {
        err: '',
      };
    },
    created() {
      firebase
        .auth()
        .onAuthStateChanged(user => {
          if (user) {
            store.dispatch('LOGIN', {
              user: new User(user),
            });
          } else {
            store.dispatch('LOGOUT');
          }
        });
    },
    methods: {
      login() {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase
          .auth()
          .signInWithPopup(provider)
          .catch(err => {
            this.err = err;
          });
      },
      logout() {
        firebase
          .auth()
          .signOut();
      },
    },
    vuex: {
      getters: {
        user: state => state.auth.user,
      },
    },
  };
</script>
