<template lang="pug">
  div
    auth-guard

      div(slot="auth")
        p Hoi {{user.displayName}}
        p
          img(v-bind:src="user.photoURL")
        button(@click="logout") logout

      div(slot="no-auth")
        p Login with google
        spinner(v-if="isLoading")
        button(@click="login") login
        p.error(v-if="err") {{err}}
</template>

<script>
  import { auth, GoogleProvider } from 'config/firebase';
  import store from 'config/store';
  import User from 'models/user';
  import Spinner from 'components/common/spinner';
  import AuthGuard from 'components/auth/auth-guard';

  export default {
    data() {
      return {
        err: '',
        isLoading: false,
      };
    },
    created() {
      this.isLoading = true;

      // Listen to auth changes at firebase
      auth
        .onAuthStateChanged(user => {
          this.isLoading = false;

          // Dispatch according to auth state
          if (user) {
            const loggedinUser = new User(user);
            store.dispatch('LOGIN', {
              user: loggedinUser,
            });
            loggedinUser.set();
          } else {
            store.dispatch('LOGOUT');
          }
        });
    },
    methods: {
      login() {
        this.isLoading = true;

        auth
          .signInWithPopup(GoogleProvider)
          .then(() => {
            this.isLoading = false;
          })
          .catch(err => {
            this.isLoading = false;
            this.err = err;
          });
      },
      logout() {
        auth.signOut();
      },
    },
    components: {
      Spinner,
      AuthGuard,
    },
    vuex: {
      getters: {
        user: state => state.auth.user,
      },
    },
  };
</script>
